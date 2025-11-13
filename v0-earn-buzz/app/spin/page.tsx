"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0760] via-[#4c1d95] to-[#0b6b3a]">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a0760] via-[#4c1d95] to-[#0b6b3a] p-6">
        <Card className="max-w-lg w-full p-6 text-center">
          <div className="mb-4">
            <Logo className="w-28 h-28 mx-auto" />
          </div>
          <h2 className="text-xl font-bold mb-2">Welcome to Tivexx9ja</h2>
          <p className="text-sm text-gray-600">
            Sign in to access the full About page and learn how Tivexx9ja helps thousands of Nigerians
            earn, grow, and withdraw without fees.
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

  // Authenticated about page
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b6b3a] via-[#153d2f] to-[#071218] text-white">
      {/* Fixed back button top left */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-md bg-white/6 hover:bg-white/10 backdrop-blur-sm flex items-center gap-2"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#7c3aed] via-[#9b5cff] to-[#10b981] flex items-center justify-center shadow-2xl">
            <Logo className="w-16 h-16" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Tivexx9ja</h1>
            <p className="text-sm text-green-100 mt-1">
              Real earning opportunities for Nigerians with transparent payouts and community support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: mission and stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h2 className="text-xl font-bold text-emerald-200 mb-2">Our Mission</h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Tivexx9ja exists to create reliable earning pathways for everyday Nigerians. We provide
                short tasks, referral rewards, and fast withdrawals so users can support their families,
                fund education, and grow small businesses.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/4 border border-white/8">
                  <div className="text-xs text-white/80">Community</div>
                  <div className="text-2xl font-bold text-amber-300">45,000+</div>
                  <div className="text-xs text-white/70 mt-1">Active users</div>
                </div>

                <div className="p-3 rounded-lg bg-white/4 border border-white/8">
                  <div className="text-xs text-white/80">Paid Out</div>
                  <div className="text-2xl font-bold text-emerald-300">Millions</div>
                  <div className="text-xs text-white/70 mt-1">Total paid to users</div>
                </div>

                <div className="p-3 rounded-lg bg-white/4 border border-white/8">
                  <div className="text-xs text-white/80">Support</div>
                  <div className="text-2xl font-bold text-purple-300">24/7</div>
                  <div className="text-xs text-white/70 mt-1">Telegram assistance</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h3 className="text-lg font-bold mb-2">Why users trust Tivexx9ja</h3>
              <ul className="text-sm text-white/80 space-y-2 list-inside list-decimal pl-4">
                <li>Clear and transparent payouts with no hidden fees</li>
                <li>Fast withdrawal process and customer support on Telegram</li>
                <li>Verification and anti fraud measures to protect users</li>
                <li>Opportunities designed for mobile users across Nigeria</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h3 className="text-lg font-bold mb-3">Impact stories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Education Support</div>
                  <div className="text-sm text-white/80 mt-1">Students used platform earnings to continue school and pay fees.</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Small Business Growth</div>
                  <div className="text-sm text-white/80 mt-1">Traders reinvested earnings to scale and reach more customers.</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg">
              <h3 className="text-lg font-bold mb-3">How the platform works</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Join</div>
                  <div className="text-sm text-white/80 mt-1">Register with phone and set up your profile.</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Earn</div>
                  <div className="text-sm text-white/80 mt-1">Complete short tasks and refer friends to earn bonuses.</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="font-semibold">Withdraw</div>
                  <div className="text-sm text-white/80 mt-1">Withdraw anytime. Withdrawals remain free for users.</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right column: contact and official note */}
          <aside className="space-y-6">
            <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/8 shadow-lg text-center">
              <div className="text-sm text-white/80">Official notice</div>
              <div className="text-xl font-bold text-amber-300 mt-2">Verified and compliant</div>
              <p className="text-xs text-white/70 mt-2">
                We follow identity verification rules and adopt measures that protect users from fraud and automated accounts.
                Any verification fees where required are handled transparently and refunded where applicable.
              </p>

              <div className="mt-4">
                <Button
                  onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")}
                  className="w-full bg-gradient-to-r from-purple-800 via-purple-700 to-green-600 text-white"
                >
                  Contact Support on Telegram
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-white/5 border border-white/8 shadow-lg">
              <div className="text-sm text-white/80 mb-2">Need help now</div>
              <div className="text-sm font-semibold text-white">Our support is ready to assist you</div>
              <div className="text-xs text-white/70 mt-2">Open support for account issues, verification help and payments</div>

              <div className="mt-3">
                <Button
                  onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")}
                  className="w-full bg-amber-400 text-black"
                >
                  Open Support
                </Button>
              </div>
            </Card>

            <Card className="p-4 bg-white/5 border border-white/8 shadow-lg text-xs">
              <div className="font-semibold text-white/80">Our promise</div>
              <p className="text-white/70 mt-2">
                Withdrawals will remain free for users. We will continue to protect your balance and payout reliably.
              </p>
            </Card>
          </aside>
        </div>

        {/* Footer contact area */}
        <div className="mt-10">
          <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-lg font-bold">Contact Us</div>
                <div className="text-sm text-white/80 mt-1">
                  Telegram support: @Tivexx9jaSupport
                  <br />
                  Email: support@tivexx9ja.com
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")}
                  className="bg-amber-400 text-black"
                >
                  Contact Support on Telegram
                </Button>
                <Button onClick={() => window.open("https://tivexx9ja.vercel.app/register?ref=EB19K473QL", "_blank")} className="bg-transparent border border-white/20">
                  Visit Website
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