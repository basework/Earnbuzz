import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ 
        success: false,
        referral_code: "",
        referral_count: 0,
        referral_balance: 0 
      })
    }
    
    const supabase = await createClient()
    
    // Get stored values (trust signup's direct update—no buggy live sync)
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("referral_code, referral_count, referral_balance")
      .eq("id", userId)
      .single()

    if (userError) throw userError

    const referralCount = user.referral_count || 0
    const referralBalance = user.referral_balance || 0

    return NextResponse.json({
      success: true,
      referral_code: user.referral_code || "",
      referral_count: referralCount,
      referral_balance: referralBalance
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ 
      success: false,
      referral_code: "",
      referral_count: 0,
      referral_balance: 0 
    })
  }
}