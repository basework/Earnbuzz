import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateReferralCode } from "@/lib/utils/referral"
import { supabaseAdmin as supabase } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, referralCode } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // 1. Create user in Supabase Auth
    const supabaseClient = await createClient()
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const userId = authData.user?.id
    if (!userId) return NextResponse.json({ error: "Failed to create user" }, { status: 500 })

    // 2. Generate unique referral code
    let newReferralCode = generateReferralCode()
    while (true) {
      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", newReferralCode)
        .maybeSingle()
      if (!data) break
      newReferralCode = generateReferralCode()
    }

    // 3. Find referrer
    let referrerId = null
    if (referralCode) {
      const { data } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", referralCode)
        .maybeSingle()
      if (data) referrerId = data.id
    }

    // 4. Insert into users table
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        id: userId,
        name,
        email,
        referral_code: newReferralCode,
        referred_by: referrerId,
      })
      .select("id, name, email, referral_code")
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // 5. Record referral
    if (referrerId) {
      await supabase.from("referrals").insert({
        referrer_id: referrerId,
        referred_id: userId,
        amount: 500,
      })
    }

    return NextResponse.json({ success: true, user: newUser })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}