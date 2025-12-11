"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

function PayKeyPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const fullName = searchParams.get("fullName") || ""
  const amount = searchParams.get("amount") || "10,000"
  // Reference ID: dynamic from ?ref= or fallback
  const referenceId = searchParams.get("ref") || "500222"
  
  const bankName = "Moniepoint"
  const accountNumber = "6919261359"
  const accountName = "David Odum"

  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleConfirmPayment = () => {
    const params = new URLSearchParams({ fullName, amount })
    router.push(`/paykeys/confirmation?${params.toString()}`)
  }

  const openTelegramSupport = () => {
    window.open("https://t.me/Tivexx9jacommunity", "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-500 to-green-700 overflow-y-auto py-10 px-4 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center">Tivexx9ja</h1>

      <Card className="max-w-md w-full p-6 space-y-6 bg-white/10 border border-green-300 shadow-2xl rounded-2xl">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Complete this bank transfer to proceed</h2>
          <p className="text-2xl font-extrabold text-yellow-300">₦ {amount}</p>
        </div>

        <div className="space-y-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <p className="text-sm">Bank Name</p>
            <p className="font-bold">{bankName}</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
            <div>
              <p className="text-sm">Account Number</p>
              <p className="font-bold">{accountNumber}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-green-500 text-white border-green-500 hover:bg-green-600"
              onClick={() => copyToClipboard(accountNumber, "account")}
            >
              {copiedField === "account" ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="p-3 bg-white/10 rounded-lg">
            <p className="text-sm">Account Name</p>
            <p className="font-bold">{accountName}</p>
          </div>
        </div>

        {/* Reference ID - placed below upload, as shown in the photo */}
        <div className="text-center mt-3">
          <p className="text-xs text-gray-200 tracking-widest">REFERENCE ID - {referenceId}</p>
        </div>

        {/* Telegram Support Section */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg border border-green-300">
          <p className="text-sm font-semibold mb-3">📸 Send Payment Proof</p>
          <p className="text-xs mb-3">
            After making the transfer, please send a screenshot of your payment receipt to our Telegram support team for verification.
          </p>
          <Button
            onClick={openTelegramSupport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            📱 Open Telegram Support
          </Button>
        </div>

        <Button
          className="w-full h-12 bg-gradient-to-r from-purple-800 to-green-600 hover:from-purple-900 hover:to-green-700 text-white font-semibold mt-2"
          onClick={handleConfirmPayment}
        >
          I have made this bank Transfer
        </Button>
      </Card>
    </div>
  )
}

export default function PayKeyPaymentPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-green-700 text-white">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-4xl font-extrabold tracking-wider mb-2">Tivexx9ja</h1>
          <p className="text-lg font-medium">Loading Payment Details...</p>
        </div>
      </div>
    }>
      <PayKeyPaymentContent />
    </Suspense>
  )
}