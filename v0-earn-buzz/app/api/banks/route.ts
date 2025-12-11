import { NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET || ""

export async function GET() {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack secret is not configured on the server" }, { status: 500 })
    }

    const res = await fetch("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const err = await res.text().catch(() => "")
      console.error("Failed to fetch banks from Paystack:", err)
      return NextResponse.json({ error: "Failed to fetch banks from Paystack" }, { status: 502 })
    }

    const data = await res.json()
    // return array of {name, code}
    const banks = (data.data || []).map((b: any) => ({ name: b.name, code: b.code }))
    return NextResponse.json({ success: true, banks })
  } catch (error) {
    console.error("Error fetching banks:", error)
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 })
  }
}
import { NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = "sk_test_8a0b1f199362d7acc9c390bff72c4e81f74e2ac3"

export async function GET() {
  try {
    const response = await fetch("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch banks")
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      banks: data.data,
    })
  } catch (error) {
    console.error("Banks fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 })
  }
}
