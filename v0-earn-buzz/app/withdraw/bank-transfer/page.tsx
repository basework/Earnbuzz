"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense, useEffect } from "react"
import { X } from "lucide-react"

function PayKeyPaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const fullName = searchParams.get("fullName") || ""
  const amount = searchParams.get("amount") || "5,000"
  const bankName = searchParams.get("bankName") || "Moniepoint"
  const accountNumber = searchParams.get("accountNumber") || "6420606119"
  const accountName = searchParams.get("accountName") || "Moses Barika"

  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(true)
  const [proof, setProof] = useState<File | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleChangeBankClick = () => {
    const params = new URLSearchParams({ fullName, amount })
    router.push(`/paykeys/bank-selection?${params.toString()}`)
  }

  const handleConfirmPayment = () => {
    if (!proof) {
      alert("⚠️ Please upload your payment screenshot before continuing.")
      return
    }
    const params = new URLSearchParams({ fullName, amount })
    router.push(`/paykeys/confirmation?${params.toString()}`)
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-br from-green-500 to-green-700 overflow-y-auto py-10 px-4 text-white">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-green-800/30 animate-gradientMove -z-10"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full opacity-60 animate-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Tivexx Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-green-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">⚠️ Important Payment Notice</h3>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto hover:bg-green-50"
                onClick={() => setShowPopup(false)}
              >
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
            <div className="space-y-3 text-sm text-gray-800">
              <ul className="list-disc pl-5 space-y-2">
                <li>Transfer the <b>exact amount</b> displayed below.</li>
                <li>Upload a clear <b>payment screenshot</b> immediately after transfer.</li>
                <li>⚠️ <span className="font-semibold text-red-600">Avoid using Opay bank</span>. Use any other Nigerian bank for instant confirmation.</li>
                <li>✅ Payments via other banks are confirmed within minutes.</li>
                <li>❌ Do not dispute your payment — disputes delay verification.</li>
              </ul>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                onClick={() => setShowPopup(false)}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-6 text-center animate-glow">Tivexx9ja</h1>

      <Card className="relative z-10 max-w-md w-full p-6 space-y-6 backdrop-blur-lg bg-white/10 border border-green-300 shadow-2xl rounded-2xl animate-slide-up">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Complete this bank transfer to proceed</h2>
          <p className="text-2xl font-extrabold text-yellow-300">₦ {amount}</p>
        </div>

        {/* Bank Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
            <div>
              <p className="text-sm">Selected Bank:</p>
              <p className="font-bold">{bankName}</p>
            </div>
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

          {/* Reference ID */}
          <div className="text-center mt-2">
            <p className="text-xs text-gray-200 tracking-widest">REFERENCE ID - 500222</p>
          </div>
        </div>

        {/* Upload Proof */}
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
          className="w-full h-12 bg-gradient-to-r from-purple-800 via-purple-700 to-green-600 hover:from-purple-900 hover:to-green-700 text-white font-semibold mt-4 transition-all animate-buttonGlow"
          onClick={handleConfirmPayment}
        >
          I have made this bank Transfer
        </Button>
      </Card>

      <style jsx global>{`
        @keyframes glow { 0%, 100% { text-shadow:0 0 5px #34d399,0 0 10px #10b981,0 0 20px #10b981; } 50% { text-shadow:0 0 10px #34d399,0 0 20px #10b981,0 0 40px #059669; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes particle { 0% { transform: translateY(0) translateX(0); opacity: 0.6; } 50% { transform: translateY(-20px) translateX(15px); opacity: 0.3; } 100% { transform: translateY(0) translateX(0); opacity: 0.6; } }
        @keyframes gradientMove { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
        @keyframes buttonGlow { 0%,100% { box-shadow: 0 0 5px #10b981,0 0 10px #34d399,0 0 20px #059669; } 50% { box-shadow: 0 0 10px #34d399,0 0 20px #10b981,0 0 40px #059669; } }

        .animate-glow { animation: glow 2s infinite alternate; }
        .animate-slide-up { animation: slideUp 1s ease-in-out; }
        .animate-particle { animation: particle 8s linear infinite; }
        .animate-gradientMove { background-size: 200% 200%; animation: gradientMove 6s ease infinite; }
        .animate-buttonGlow { animation: buttonGlow 2s infinite alternate; }
      `}</style>
    </div>
  )
}

export default function PayKeyPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-green-700 text-white relative overflow-hidden">
          <div className="animate-glow text-center z-20">
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-4xl font-extrabold tracking-wider mb-2">Tivexx9ja</h1>
            <p className="text-lg font-medium opacity-90">Loading Payment Details...</p>
          </div>
        </div>
      }
    >
      <PayKeyPaymentContent />
    </Suspense>
  )
}