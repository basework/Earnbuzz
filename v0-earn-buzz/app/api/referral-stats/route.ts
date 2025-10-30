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
    
    // Get user's referral_code
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("referral_code, referral_count, referral_balance")
      .eq("id", userId)
      .single()

    if (userError) throw userError

    // New: Count real referrals live (users who used your code)
    const { count: liveCount, error: countError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("referred_by", user.referral_code || "")

    if (countError) {
      console.error("Count error:", countError)
      // Use old stored number if live count fails
    }

    const finalCount = liveCount ?? (user.referral_count || 0)
    const finalBalance = finalCount * 10000  // 10k per referral

    // New: Update stored numbers in DB if live count is different
    if (liveCount !== undefined && liveCount !== user.referral_count) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ 
          referral_count: finalCount, 
          referral_balance: finalBalance 
        })
        .eq("id", userId)
      
      if (updateError) console.error("Update error:", updateError)
    }

    return NextResponse.json({
      referral_code: user.referral_code || "",
      referral_count: finalCount,
      referral_balance: finalBalance
    })
  } catch (error) {
    console.error("Full error:", error)
    return NextResponse.json({ 
      referral_code: "",
      referral_count: 0,
      referral_balance: 0 
    })
  }
}