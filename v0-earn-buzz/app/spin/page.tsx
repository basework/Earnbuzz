"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutTivexxPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("tivexx-user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUserData(JSON.parse(storedUser))
  }, [router])

  if (!userData) {
    return <div className="p-6 text-center text-green-700 font-semibold">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white">

      {/* Header */}
      <div className="flex items-center p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-4 text-2xl font-bold tracking-wide">About Tivexx9ja</h1>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 max-w-2xl mx-auto animate-fadein">

        <h2 className="text-center text-3xl font-extrabold text-yellow-300 animate-glow">
          Empowering Nigerians Every Day
        </h2>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4">

          <p className="leading-relaxed text-base">
            Tivexx9ja is a fast-growing Nigerian digital earnings platform created to help individuals rise above today’s harsh economic realities. Our mission is simple: 
            to give Nigerians real earnings, real opportunities, and real financial support that truly makes life easier.
          </p>

          <p className="leading-relaxed text-base">
            Every feature on Tivexx9ja was built for transparency, speed, and ease of use. Students, workers, families, and business owners all rely on Tivexx9ja to earn daily and unlock financial stability.
          </p>

          <h3 className="text-xl font-bold text-yellow-300 mt-4">What You Can Do on Tivexx9ja</h3>

          <ul className="list-disc pl-6 space-y-2 text-white/90">

            <li>
              Earn <span className="font-bold text-yellow-300">₦1,000 every 1 minute</span> by claiming through the daily earnings button.
            </li>

            <li>
              Earn <span className="font-bold text-yellow-300">₦10,000 per verified referral</span>. No limit — many users earn from 50 to 300 referrals.
            </li>

            <li>
              Access Quick Loans instantly with no collateral or BVN.
            </li>

            <li>
              Apply for Business Loans ranging from ₦500,000 to ₦5,000,000 with just a 3 percent processing fee and 12 months repayment.
            </li>

            <li>
              Earn through tasks, bonuses, referrals, and daily performance rewards.
            </li>

            <li>
              Withdrawals are <span className="font-bold text-yellow-300">100 percent free</span> forever.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-yellow-300 mt-4">Changing Lives Nationwide</h3>

          <p className="leading-relaxed text-base">
            Tivexx9ja has already transformed thousands of lives. Students are paying school fees. Traders are expanding their businesses. Families are receiving support. 
            We have helped Nigerians stay stable, survive tough times, and build something better for themselves.
          </p>

          <p className="leading-relaxed text-base">
            We are committed to staying active for many years — bringing more features, more upgrades, and more ways to earn safely and easily.
          </p>

        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push("https://t.me/tivexx9jasupport")}
            className="w-full py-4 text-lg bg-gradient-to-r from-purple-700 to-green-500 font-bold hover:scale-[1.02] transition-all"
          >
            Contact Support on Telegram
          </Button>

          <Button
            onClick={() => router.push("https://t.me/tivexx9ja")}
            className="w-full py-4 text-lg bg-gradient-to-r from-green-600 to-purple-700 font-bold hover:scale-[1.02] transition-all"
          >
            Join Official Channel
          </Button>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Tivexx9ja © 2025 All Rights Reserved
        </p>

      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          animation: fadein 0.6s ease-out;
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 8px #fcd34d, 0 0 18px #fbbf24; }
          50% { text-shadow: 0 0 14px #fff3b0, 0 0 30px #fcd34d; }
        }
        .animate-glow {
          animation: glow 2.5s infinite alternate;
        }
      `}</style>
    </div>
  )
}