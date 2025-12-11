import { type NextRequest, NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET || ""

export async function POST(request: NextRequest) {
  try {
    const { account_number, bank_code } = await request.json()

    if (!account_number || !bank_code) {
      return NextResponse.json({ error: "Account number and bank code are required" }, { status: 400 })
    }

    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack secret is not configured on the server" }, { status: 500 })
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

    return NextResponse.json({
      success: true,
      account_name: verifyData.data.account_name,
      account_number: verifyData.data.account_number,
    })
  } catch (error) {
    console.error("Account verification error:", error)
    return NextResponse.json({ error: "Failed to verify account" }, { status: 500 })
  }
}
