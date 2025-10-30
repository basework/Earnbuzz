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
    
    // Get stored values
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("referral_code, referral_count, referral_balance")
      .eq("id", userId)
      .single()

    if (userError) throw userError

    let referralCount = user.referral_count || 0
    let referralBalance = user.referral_balance || 0

    // Live sync: Recount from actual referrals in users table
    const { count: liveCount, error: countError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("referred_by", user.referral_code || "")

    if (!countError && liveCount != null && liveCount !== referralCount) {  // FIXED: != null covers undefined/null; TS happy
      referralCount = liveCount
      referralBalance = liveCount * 10000  // Adjust multiplier as needed (e.g., 10k per referral)
      // Sync back to user's row
      const { error: updateError } = await supabase
        .from("users")
        .update({ 
          referral_count: referralCount, 
          referral_balance: referralBalance 
        })
        .eq("id", userId)
      if (updateError) console.error("Sync error:", updateError)
    }

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