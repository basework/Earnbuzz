"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { X } from "lucide-react"

function PayKeyPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const fullName = searchParams.get("fullName") || ""
  const amount = searchParams.get("amount") || "5000"
  const bankName = searchParams.get("bankName") || "Moniepoint"
  const accountNumber = searchParams.get("accountNumber") || "6832468961"
  const accountName = searchParams.get("accountName") || "Deborah Vincent"

  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(true)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleChangeBankClick = () => {
    const params = new URLSearchParams({
      fullName,
      amount,
    })
    router.push(`/paykeys/bank-selection?${params.toString()}`)
  }

  const handleConfirmPayment = () => {
    const params = new URLSearchParams({
      fullName,
      amount,
    })
    router.push(`/paykeys/confirmation?${params.toString()}`)
  }

  const openTelegramSupport = () => {
    window.open("https://t.me/Tivexx9jacommunity", "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Purple-themed Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-purple-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">⚠️ Important Payment Notice</h3>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto hover:bg-purple-50"
                onClick={() => setShowPopup(false)}
              >
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>

            {/* Checklist Instructions */}
            <div className="space-y-3 text-sm text-gray-800">
              <ul className="list-disc pl-5 space-y-2">
                <li>Transfer the <b>exact amount</b> shown on this page.</li>
                <li><b>Send payment screenshot to Telegram support</b> after transfer.</li>
                <li>
                  ⚠️ <span className="font-semibold text-red-600">Avoid using Opay bank</span>.  
                  Due to temporary network issues from Opay servers, payments made with Opay may not be confirmed.  
                  Please use <b>any other Nigerian bank</b> for instant confirmation.
                </li>
                <li>✅ Payments made with other banks are confirmed within minutes.</li>
                <li>❌ Do not dispute your payment under any circumstances — disputes delay confirmation.</li>
              </ul>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                onClick={() => setShowPopup(false)}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Info */}
      <div className="p-6 space-y-6 transition-all duration-300">
        {/* Header Info */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">NGN {amount}</div>
            <div className="text-sm text-muted-foreground">{fullName}</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Complete this bank transfer to proceed</h2>
        </div>

        {/* Bank Details Card */}
        <Card className="p-6 space-y-4 bg-gray-50">
          {/* Selected Bank */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Selected Bank:</p>
              <p className="font-semibold text-blue-600">{bankName}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            {/* Amount */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-bold text-lg">NGN {amount}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                onClick={() => copyToClipboard(amount, "amount")}
              >
                {copiedField === "amount" ? "Copied!" : "Copy"}
              </Button>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">12</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-bold">{accountNumber}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                onClick={() => copyToClipboard(accountNumber, "account")}
              >
                {copiedField === "account" ? "Copied!" : "Copy"}
              </Button>
            </div>

            {/* Bank Name */}
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                  <span className="text-xs">🏦</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bank Name</p>
                  <p className="font-bold">{bankName}</p>
                </div>
              </div>
            </div>

            {/* Account Name */}
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Name</p>
                  <p className="font-bold">{accountName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground leading-relaxed">
            Transfer the exact amount to the account above with your ( Reference ID - 500222) for instant verification.
          </div>

          {/* Telegram Support Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-800 mb-3">📸 Send Payment Proof</p>
            <p className="text-xs text-gray-700 mb-3">
              After making the transfer, please send a screenshot of your payment receipt to our Telegram support team for verification.
            </p>
            <Button
              onClick={openTelegramSupport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              📱 Open Telegram Support
            </Button>
          </div>

          {/* Confirm Button */}
          <Button
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-4"
            onClick={handleConfirmPayment}
          >
            I have made this bank Transfer
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default function PayKeyPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-medium">Loading Payment Details...</p>
        </div>
      }
    >
      <PayKeyPaymentContent />
    </Suspense>
  )
}

  return (
    <div className="min-h-screen bg-background">
      {/* Purple-themed Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-purple-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">⚠️ Important Payment Notice</h3>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto hover:bg-purple-50"
                onClick={() => setShowPopup(false)}
              >
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>

            {/* Checklist Instructions */}
            <div className="space-y-3 text-sm text-gray-800">
              <ul className="list-disc pl-5 space-y-2">
                <li>Transfer the <b>exact amount</b> shown on this page.</li>
                <li>Upload a clear <b>payment screenshot</b> immediately after transfer.</li>
                <li>
                  ⚠️ <span className="font-semibold text-red-600">Avoid using Opay bank</span>.  
                  Due to temporary network issues from Opay servers, payments made with Opay may not be confirmed.  
                  Please use <b>any other Nigerian bank</b> for instant confirmation.
                </li>
                <li>✅ Payments made with other banks are confirmed within minutes.</li>
                <li>❌ Do not dispute your payment under any circumstances — disputes delay confirmation.</li>
              </ul>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                onClick={() => setShowPopup(false)}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Info */}
      <div className="p-6 space-y-6 transition-all duration-300">
        {/* Header Info */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">NGN {amount}</div>
            <div className="text-sm text-muted-foreground">{fullName}</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Complete this bank transfer to proceed</h2>
        </div>

        {/* Bank Details Card */}
        <Card className="p-6 space-y-4 bg-gray-50">
          {/* Selected Bank */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Selected Bank:</p>
              <p className="font-semibold text-blue-600">{bankName}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            {/* Amount */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-bold text-lg">NGN {amount}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                onClick={() => copyToClipboard(amount, "amount")}
              >
                {copiedField === "amount" ? "Copied!" : "Copy"}
              </Button>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">12</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  <p className="font-bold">{accountNumber}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                onClick={() => copyToClipboard(accountNumber, "account")}
              >
                {copiedField === "account" ? "Copied!" : "Copy"}
              </Button>
            </div>

            {/* Bank Name */}
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                  <span className="text-xs">🏦</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bank Name</p>
                  <p className="font-bold">{bankName}</p>
                </div>
              </div>
            </div>

            {/* Account Name */}
            <div className="p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Name</p>
                  <p className="font-bold">{accountName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground leading-relaxed">
            Transfer the exact amount to the account above with your ( Reference ID - 500222) for instant verification..
          </div>

          {/* Upload proof */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Upload Payment Screenshot *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProof(e.target.files?.[0] || null)}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Confirm Button */}
          <Button
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-4"
            onClick={handleConfirmPayment}
          >
            I have made this bank Transfer
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default function PayKeyPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
        </div>
      }
    >
      <PayKeyPaymentContent />
    </Suspense>
  )
}