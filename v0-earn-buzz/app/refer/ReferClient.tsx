// app/refer/ReferClient.tsx
"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Copy, Share2, Gift, Users, Wallet, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils/referral"

interface UserData {
  id: string
  referral_code: string
  referral_count: number
  referral_balance: number
  balance?: number
}

export default function ReferClient() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [origin, setOrigin] = useState("")

  const referralMessages = [
    "Join Tivexx 9ja now and start earning instantly! Complete simple tasks and get paid today!",
    "Ready to earn from home? Tivexx 9ja pays you for simple tasks! Join now and watch your wallet grow!",
    "Don't miss out! Tivexx 9ja gives you instant bonuses and daily earnings — sign up and start winning!",
    "Tivexx 9ja lets you earn money daily — invite friends and claim free rewards!",
    "Turn your phone into an ATM! Join Tivexx 9ja and get paid every day!",
    "Earn ₦10,000 per referral and get instant signup bonuses — Tivexx 9ja is the real deal!",
    "Get rewarded for every invite! Join Tivexx 9ja and earn without stress!",
    "Tivexx 9ja pays you for completing simple tasks — join today and start earning!",
    "Make money online easily! Tivexx 9ja gives you instant bonuses and daily claims!",
    "Earn fast, withdraw easily! Tivexx 9ja is your ticket to daily income!",
    "Invite friends, earn ₦10,000 each! Start your earning journey with Tivexx 9ja today!",
    "Need cash fast? Tivexx 9ja gives you loans in just 5 minutes — no BVN required!",
    "Get instant loans without BVN! Tivexx 9ja makes borrowing stress-free!",
    "Need urgent money? Tivexx 9ja offers quick loans in minutes — sign up now!",
    "Take loans easily and start earning too! Tivexx 9ja is your one-stop money app!",
  ]

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem("tivexx-user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    const user = JSON.parse(storedUser)
    fetchUserData(user.id || user.userId)
  }, [router])

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`/api/referral-stats?userId=${userId}&t=${Date.now()}`)
      const data = await response.json()

      const storedUser = localStorage.getItem("tivexx-user")
      let updatedUserBalance = 50000

      if (storedUser) {
        const user = JSON.parse(storedUser)
        const localBalance = user.balance || 50000
        const referralEarnings = data.referral_balance || 0
        const lastSyncedReferrals = localStorage.getItem("tivexx-last-synced-referrals") || "0"
        const newReferralEarnings = Math.max(0, referralEarnings - parseInt(lastSyncedReferrals))
        updatedUserBalance = localBalance + newReferralEarnings

        const updatedUser = { ...user, balance: updatedUserBalance }
        localStorage.setItem("tivexx-user", JSON.stringify(updatedUser))

        if (newReferralEarnings > 0) {
          localStorage.setItem("tivexx-last-synced-referrals", referralEarnings.toString())
        }
      }

      setUserData({
        id: userId,
        referral_code: data.referral_code,
        referral_count: data.referral_count,
        referral_balance: data.referral_balance,
        balance: updatedUserBalance
      })
    } catch (error) {
      console.error("[Refer] Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const referralLink = userData?.referral_code
    ? `/register?ref=${userData.referral_code}`
    : `/register`

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * referralMessages.length)
    return referralMessages[randomIndex]
  }

  const handleCopy = () => {
    if (!origin) return
    const message = `${getRandomMessage()}\n\nSign up here: ${origin}${referralLink}`
    navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    if (!origin) return
    const message = `${getRandomMessage()}\n\nSign up here: ${origin}${referralLink}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleTelegramShare = () => {
    if (!origin) return
    const fullLink = `${origin}${referralLink}`
    const message = `${getRandomMessage()}\n\nSign up here: ${fullLink}`
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(fullLink)}&text=${encodeURIComponent(message)}`
    window.open(telegramUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black pb-20">
      {/* Your full JSX here — same as before */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-500/50 mr-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Refer & Earn</h1>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <Gift className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-2">Earn ₦10,000</h2>
          <p className="text-green-100">For every friend you refer!</p>
        </div>
      </div>

      {/* ... rest of your JSX ... */}
      {/* Keep everything exactly as before */}
      <div className="px-6 mt-8">
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-green-700/30">
          <p className="text-sm text-gray-300 mb-2">Your Referral Link</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={origin ? `${origin}${referralLink}` : "Loading..."}
              readOnly
              className="flex-1 text-sm text-white bg-gray-800/50 rounded-lg px-3 py-2 border border-green-700/30"
            />
            <Button onClick={handleCopy} disabled={!origin} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 flex flex-col gap-4">
        <Button onClick={handleWhatsAppShare} disabled={!origin} className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-xl text-lg font-semibold shadow-lg flex items-center justify-center gap-3">
          <Share2 className="h-5 w-5" /> Share on WhatsApp
        </Button>
        <Button onClick={handleTelegramShare} disabled={!origin} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl text-lg font-semibold shadow-lg flex items-center justify-center gap-3">
          <Send className="h-5 w-5" /> Share on Telegram
        </Button>
      </div>

      <div className="px-6 mt-8 mb-6">
        <div className="bg-gradient-to-br from-green-800/50 to-green-900/50 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30">
          <h3 className="text-lg font-bold text-white mb-4 text-center">Your Referral Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-green-700/30">
              <p className="text-3xl font-bold text-green-400">{userData?.referral_count || 0}</p>
              <p className="text-sm text-gray-300 mt-1">Total Referrals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-green-700/30">
              <p className="text-3xl font-bold text-green-400">
                {userData ? formatCurrency(userData.referral_balance) : "₦0"}
              </p>
              <p className="text-sm text-gray-300 mt-1">Total Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}