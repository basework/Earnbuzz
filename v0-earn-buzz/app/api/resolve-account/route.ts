import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const accountNumber = String(body.accountNumber || "").trim()
    const bankCode = String(body.bankCode || "").trim()

    if (!accountNumber) {
      return NextResponse.json({ success: false, message: "accountNumber is required" }, { status: 400 })
    }

    // If a Paystack secret is configured, use it to resolve the account name
    const secret = process.env.PAYSTACK_SECRET
    if (secret) {
      const query = new URLSearchParams({ account_number: accountNumber })
      if (bankCode) query.set("bank_code", bankCode)

      const res = await fetch(`https://api.paystack.co/bank/resolve?${query.toString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()
      if (!res.ok) {
        return NextResponse.json({ success: false, message: data.message || "Failed to resolve account" }, { status: 502 })
      }

      // Paystack returns { status: true, message: '', data: { account_name, account_number } }
      return NextResponse.json({ success: true, source: "paystack", result: data })
    }

    // No secret configured — return a safe mock response so UI still works in dev.
    const masked = accountNumber.slice(-4)
    const mockName = `User ${masked}`
    return NextResponse.json({ success: true, source: "mock", result: { account_name: mockName, account_number: accountNumber } })
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || "Unknown error" }, { status: 500 })
  }
}
