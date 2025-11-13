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
    const storedUser = localStorage.getItem("tivexx9ja-user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    try {
      setUserData(JSON.parse(storedUser))
    } catch (e) {
      setUserData(null)
    }
    setLoaded(true)
  }, [router])

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4" />
          <div>Loading Tivexx9ja...</div>
        </div>
      </div>
    )
  }

  // If userData was removed or invalid, fall back to a simple message
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-6">
        <Card className="max-w-lg w-full p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Welcome to Tivexx9ja</h2>
          <p className="text-sm text-gray-600">
            Please sign in to view the full About page.
          </p>
          <div className="mt-6">
            <Button onClick={() => router.push("/login")} className="bg-green-600 hover:bg-green-700 text-white">
              Sign in
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a0760] via-[#4c1d95] to-[#0b6b3a] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <button aria-label="Back" className="p-2 rounded-md bg-white/10 hover:bg-white/12">
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <span className="font-medium">About</span>
          </Link>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-[#9b5cff] via-[#7c3aed] to-[#10b981] flex items-center justify-center shadow-2xl transform transition-transform hover:scale-105">
                <Logo className="w-20 h-20" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight animate-glow">
                  Tivexx9ja
                </h1>
                <p className="text-sm text-green-100 mt-1">
                  A trusted Nigerian earning platform focused on authentic opportunities, transparent payouts and support for communities.
                </p>
              </div>
            </div>

            <Card className="mt-6 p-6 bg-white/6 backdrop-blur-lg border border-white/10 shadow-xl animate-fade-up">
              <h2 className="text-xl font-bold mb-2 text-emerald-200">Our Mission</h2>
              <p className="text-sm text-white/80 leading-relaxed">
                To empower Nigerians with real earning opportunities that change lives. We deliver daily micro tasks, referral rewards and fast withdrawals to help users support themselves and their families.
                We build with trust, transparency and a commitment to making payouts free for withdrawals at all times.
              </p>
            </Card>
          </div>

          <div>
            <Card className="p-5 bg-white/5 backdrop-blur-md border border-white/8 shadow-xl">
              <div className="text-center">
                <div className="text-sm text-white/80 mb-2">Community</div>
                <div className="text-3xl font-bold text-amber-300">45,000+</div>
                <div className="text-xs text-white/70 mt-1">Active users and growing</div>

                <div className="mt-4">
                  <Button
                    onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")}
                    className="w-full bg-gradient-to-r from-purple-800 via-purple-700 to-green-600 hover:from-purple-900 hover:to-green-700 text-white"
                  >
                    Join Support on Telegram
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* What you can do */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/10 shadow-xl">
            <h3 className="font-bold text-lg mb-2">Earn Everyday</h3>
            <p className="text-sm text-white/80">Complete short tasks and watch your balance grow. Tasks are simple and designed for mobile users.</p>
          </Card>

          <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/10 shadow-xl">
            <h3 className="font-bold text-lg mb-2">Refer and Grow</h3>
            <p className="text-sm text-white/80">Refer friends to increase earnings. Referral rewards help families afford school fees and grow small businesses.</p>
          </Card>

          <Card className="p-6 bg-white/6 backdrop-blur-lg border border-white/10 shadow-xl">
            <h3 className="font-bold text-lg mb-2">Withdraw with Confidence</h3>
            <p className="text-sm text-white/80">Fast withdrawal processing with transparent policies. Withdrawal is free for users on Tivexx9ja.</p>
          </Card>
        </section>

        {/* Features / Benefits */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Platform Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-white/3 to-white/6 border border-white/8 shadow-md">
              <div className="font-semibold text-emerald-200">Identity Protection</div>
              <p className="text-sm text-white/80 mt-2">Secure verification and documentation to keep your account safe from bots and fraud.</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-white/3 to-white/6 border border-white/8 shadow-md">
              <div className="font-semibold text-amber-300">Transparent Refunds</div>
              <p className="text-sm text-white/80 mt-2">Any required checks or fees for verification are handled transparently and refunded where applicable.</p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-white/3 to-white/6 border border-white/8 shadow-md">
              <div className="font-semibold text-purple-300">Customer First</div>
              <p className="text-sm text-white/80 mt-2">24/7 support available on Telegram and through our official channels for fast help.</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">How it works</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/6 border border-white/8">
              <div className="font-semibold">1. Join</div>
              <div className="text-sm text-white/80 mt-2">Register with your phone and create your account.</div>
            </div>
            <div className="p-4 rounded-xl bg-white/6 border border-white/8">
              <div className="font-semibold">2. Complete Tasks</div>
              <div className="text-sm text-white/80 mt-2">Watch short clips, complete micro tasks and collect rewards.</div>
            </div>
            <div className="p-4 rounded-xl bg-white/6 border border-white/8">
              <div className="font-semibold">3. Withdraw</div>
              <div className="text-sm text-white/80 mt-2">Meet withdrawal requirements or upgrade for alternate withdrawal options.</div>
            </div>
          </div>
        </section>

        {/* Testimonials / Impact */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Real Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/4 border border-white/8">
              <div className="font-semibold">Education Support</div>
              <p className="text-sm text-white/80 mt-1">Students have used Tivexx9ja earnings to pay school fees and continue their education.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/4 border border-white/8">
              <div className="font-semibold">Small Business Growth</div>
              <p className="text-sm text-white/80 mt-1">Traders reinvest earnings to scale inventory and reach more customers.</p>
            </div>
          </div>
        </section>

        {/* Contact and footer */}
        <section className="mb-8">
          <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-lg">Contact Us</div>
                <div className="text-sm text-white/80 mt-1">
                  Telegram support: @Tivexx9jaSupport
                  <br />
                  Email: support@tivexx9ja.com
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => window.open("https://tivexx9ja.vercel.app/register?ref=EB19K473QL", "_blank")} className="bg-amber-400 text-black hover:brightness-95">
                  Create Account
                </Button>
                <Button onClick={() => window.open("https://t.me/tivexx9jasupport", "_blank")} className="bg-transparent border border-white/20">
                  Open Support
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <div className="text-center text-xs text-white/60 mt-8">
          Tivexx9ja © {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>

      {/* Global styles and animations */}
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