import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ 
        balance: 50000,
        referral_code: "",
        referral_count: 0,
        referral_balance: 0 
      })
    }
    
    const supabase = await createClient()
    
    const { data: user, error } = await supabase
      .from("users")
      .select("balance, referral_code, referral_count, referral_balance")
      .eq("id", userId)
      .single()

    if (error) throw error

    return NextResponse.json({
      balance: user.balance || 50000,
      referral_code: user.referral_code || "",
      referral_count: user.referral_count || 0,
      referral_balance: user.referral_balance || 0
    })
  } catch (error) {
    return NextResponse.json({ 
      balance: 50000,
      referral_code: "",
      referral_count: 0,
      referral_balance: 0 
    })
  }
}