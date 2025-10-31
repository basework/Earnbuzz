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
    // Import client logic only in browser
    import('./client-logic').then(({ getOrigin, getLocalStorageItem, setLocalStorageItem }) => {
      const origin = getOrigin()
      setOrigin(origin)

      const storedUser = getLocalStorageItem("tivexx-user")
      if (!storedUser) {
        router.push("/login")
        return
      }

      const user = JSON.parse(storedUser)
      const userId = user.id || user.userId

      fetch(`/api/referral-stats?userId=${userId}&t=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
          const storedUser = getLocalStorageItem("tivexx-user")
          let updatedUserBalance = 50000

          if (storedUser) {
            const user = JSON.parse(storedUser)
            const localBalance = user.balance || 50000
            const referralEarnings = data.referral_balance || 0
            const lastSynced = getLocalStorageItem("tivexx-last-synced-referrals") || "0"
            const newReferralEarnings = Math.max(0, referralEarnings - parseInt(lastSynced))
            updatedUserBalance = localBalance + newReferralEarnings

            const updatedUser = { ...user, balance: updatedUserBalance }
            setLocalStorageItem("tivexx-user", JSON.stringify(updatedUser))
            if (newReferralEarnings > 0) {
              setLocalStorageItem("tivexx-last-synced-referrals", referralEarnings.toString())
            }
          }

          setUserData({
            id: userId,
            referral_code: data.referral_code,
            referral_count: data.referral_count,
            referral_balance: data.referral_balance,
            balance: updatedUserBalance
          })
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    })
  }, [router])

  const referralLink = userData?.referral_code
    ? `/register?ref=${userData.referral_code}`
    : `/register`

  const getRandomMessage = () => {
    return referralMessages[Math.floor(Math.random() * referralMessages.length)]
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
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleTelegramShare = () => {
    if (!origin) return
    const fullLink = `${origin}${referralLink}`
    const message = `${getRandomMessage()}\n\nSign up here: ${fullLink}`
    window.open(`https://t.me/share/url?url=${encodeURIComponent(fullLink)}&text=${encodeURIComponent(message)}`, "_blank")
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
      {/* YOUR FULL JSX HERE */}
      {/* ... */}
    </div>
  )
}