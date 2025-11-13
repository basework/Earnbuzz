"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("tivexx9ja-user") ||
        localStorage.getItem("tivexx-user") ||
        localStorage.getItem("momo-credit-user") ||
        localStorage.getItem("tivexx-user-old")

      if (stored) {
        setUserData(JSON.parse(stored))
      } else {
        setUserData(null)
      }
    } catch (e) {
      setUserData(null)
    } finally {
      setLoaded(true)
    }
  }, [])

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b6b3a] via-[#153d2f] to-[#071218] p-6">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4" />
          <div className="text-lg font-medium">Loading Tivexx9ja</div>
        </div>
      </div>
    )
  }

  // If user not found show friendly prompt instead of redirect
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b6b3a] via-[#153d2f] to-[#071218] p-6">
        <Card className="max-w-lg w-full p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Welcome to Tivexx9ja</h2>
          <p className="text-sm text-gray-600">
            Sign in to access the full About page and learn how Tivexx9ja helps thousands of Nigerians earn, grow, and withdraw without fees.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={() => router.push("/login")} className="bg-amber-400 text-black">
              Sign in
            </Button>
            <Button onClick={() => router.push("/dashboard")} variant="ghost" className="border border-white/10">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] via-[#153d2f] to-[#071218] text-white">
      {/* Fixed Back to Dashboard button top left */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.push("/dashboard")}
          className="p-2 rounded-md bg-white/6 hover:bg-white/10 backdrop-blur-sm flex items-center gap-2"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
          <span className="text-sm">Dashboard</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Tivexx9ja</h1>
          <p className="text-sm text-green-100 mt-2">
            Real earning opportunities for Nigerians with transparent payouts and reliable support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h2 className="text-xl font-bold text-emerald-200 mb-2">Our Mission</h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Tivexx9ja exists to provide dependable earning pathways for Nigerians. We offer short tasks, referral rewards, and fast withdrawals to help users support their families, fund education, and grow small businesses.
                We operate with transparency and commitment to keeping withdrawals free.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/4 border border-white/8 text-center">
                  <div className="text-xs text-white/80">Community</div>
                  <div className="text-2xl font-bold text-amber-300">100,000+</div>
                  <div className="text-xs text-white/70 mt-1">Active users</div>
                </div>

                <div className="p-3 rounded-lg bg-white/4 border border-white/8 text-center">
                  <div className="text-xs text-white/80">Paid Out</div>
                  <div className="text-2xl font-bold text-emerald-300">Millions</div>
                  <div className="text-xs text-white/70 mt-1">Total paid</div>
                </div>

                <div className="p-3 rounded-lg bg-white/4 border border-white/8 text-center">
                  <div className="text-xs text-white/80">Support</div>
                  <div className="text-2xl font-bold text-purple-300">24/7</div>
                  <div className="text-xs text-white/70 mt-1">Telegram</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h3 className="text-lg font-bold mb-2">Why users trust Tivexx9ja</h3>
              <ul className="text-sm text-white/80 space-y-2 list-inside pl-4">
                <li>Clear and transparent payouts with no hidden fees</li>
                <li>Fast withdrawals and responsive Telegram support</li>
                <li>Identity checks and anti-fraud measures to protect accounts</li>
                <li>Designed for mobile users across Nigeria</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h3 className="text-lg font-bold mb-3">Impact stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Education Support</div>
                  <div className="text-sm text-white/80 mt-1">Students used earnings to continue school and pay fees.</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Small Business Growth</div>
                  <div className="text-sm text-white/80 mt-1">Traders reinvested earnings to scale their businesses.</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column: contact and official note - only two buttons here */}
          <aside className="space-y-6">
            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg text-center">
              <div className="text-sm text-white/80 mb-2">Official notice</div>
              <div className="text-xl font-bold text-amber-300 mt-2">Verified and compliant</div>
              <p className="text-xs text-white/70 mt-2">
                We follow identity verification rules and adopt measures that protect users from fraud and automated accounts. Verification steps are transparent and refunds are applied where applicable.
              </p>

              <div className="mt-4 space-y-3">
                <Button
                  onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")}
                  className="w-full bg-gradient-to-r from-purple-800 via-purple-700 to-green-600 text-white"
                >
                  Contact Support
                </Button>

                <Button
                  onClick={() => window.open("https://t.me/Tivexx9jacommunity", "_blank")}
                  className="w-full bg-amber-400 text-black"
                >
                  Join Community Channel
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-white/5 border border-white/8 shadow-lg text-xs">
              <div className="font-semibold text-white/80">Our promise</div>
              <p className="text-white/70 mt-2">
                Withdrawals will remain free for users. We will continue to protect your balance and pay reliably.
              </p>
            </Card>
          </aside>
        </div>

        {/* Footer contact area with only one link to channel and support repeated is avoided */}
        <div className="mt-10">
          <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-lg font-bold">Contact Us</div>
                <div className="text-sm text-white/80 mt-1">
                  Telegram support: @Tivexx9jaSupport
                  <br />
                  Email: tivexx9ja@gmail.com
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")}
                  className="bg-amber-400 text-black"
                >
                  Contact Support
                </Button>

                <Button onClick={() => window.open("https://t.me/Tivexx9jacommunity", "_blank")} className="bg-transparent border border-white/20">
                  Open Channel
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center text-xs text-white/60 mt-8">
          Tivexx9ja © {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>

      <style jsx global>{`
        @keyframes glow {
          0% { text-shadow: 0 0 6px rgba(16,185,129,0.06); }
          50% { text-shadow: 0 0 12px rgba(139,92,246,0.10); }
          100% { text-shadow: 0 0 6px rgba(16,185,129,0.06); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-fade-up { animation: fadeUp 0.6s ease forwards; }
      `}</style>
    </div>
  )
}