import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET || ""

// Simple in-memory cache for account lookups
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes
const accountCache: Map<string, { account_name: string; account_number: string; expires: number }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { account_number, bank_code } = await request.json()

    if (!account_number || !bank_code) {
      return NextResponse.json({ error: "Account number and bank code are required" }, { status: 400 })
    }

    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack secret is not configured on the server" }, { status: 500 })
    }

    const cacheKey = `${bank_code}:${account_number}`
    const now = Date.now()
    const cached = accountCache.get(cacheKey)
    if (cached && cached.expires > now) {
      return NextResponse.json({ success: true, account_name: cached.account_name, account_number: cached.account_number })
    }

    // Verify the account with Paystack
    const verifyResponse = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!verifyResponse.ok) {
      const errorData = await verifyResponse.json().catch(() => ({}))
      return NextResponse.json({ error: errorData.message || "Failed to verify account" }, { status: 400 })
    }

    const verifyData = await verifyResponse.json()

    const account_name = verifyData.data.account_name
    const account_number_res = verifyData.data.account_number

    // store in cache
    accountCache.set(cacheKey, { account_name, account_number: account_number_res, expires: Date.now() + CACHE_TTL_MS })

    return NextResponse.json({ success: true, account_name, account_number: account_number_res })
  } catch (error) {
    console.error("Account verification error:", error)
    return NextResponse.json({ error: "Failed to verify account" }, { status: 500 })
  }
}
