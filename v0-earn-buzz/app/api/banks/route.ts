import { NextResponse } from "next/server"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET || ""

// Simple in-memory cache for banks list
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes
let banksCache: { banks: Array<{ name: string; code: string }>; expires: number } | null = null

export async function GET() {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack secret is not configured on the server" }, { status: 500 })
    }

    const now = Date.now()
    if (banksCache && banksCache.expires > now) {
      return NextResponse.json({ success: true, banks: banksCache.banks })
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

    banksCache = { banks, expires: Date.now() + CACHE_TTL_MS }

    return NextResponse.json({ success: true, banks })
  } catch (error) {
    console.error("Error fetching banks:", error)
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 })
  }
}

