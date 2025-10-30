import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ 
        referral_code: "",
        referral_count: 0,
        referral_balance: 0 
      })
    }
    
    const supabase = await createClient()
    
    // Get stored values (your original safe way)
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("referral_code, referral_count, referral_balance")
      .eq("id", userId)
      .single()

    if (userError) throw userError

    let referralCount = user.referral_count || 0
    let referralBalance = user.referral_balance || 0

    // Optional: Check live count only if you want (comment out if breaking)
    // const { count: liveCount, error: countError } = await supabase
    //   .from("users")
    //   .select("*", { count: "exact", head: true })
    //   .eq("referred_by", user.referral_code || "")

    // if (!countError && liveCount !== undefined && liveCount !== referralCount) {
    //   referralCount = liveCount
    //   referralBalance = liveCount * 10000
    //   // Sync back to DB
    //   const { error: updateError } = await supabase
    //     .from("users")
    //     .update({ 
    //       referral_count: referralCount, 
    //       referral_balance: referralBalance 
    //     })
    //     .eq("id", userId)
    //   if (updateError) console.error("Sync error:", updateError)
    // }

    return NextResponse.json({
      referral_code: user.referral_code || "",
      referral_count: referralCount,
      referral_balance: referralBalance
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ 
      referral_code: "",
      referral_count: 0,
      referral_balance: 0 
    })
  }
}