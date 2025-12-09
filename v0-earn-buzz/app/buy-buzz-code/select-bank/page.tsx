"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"

const banks = [
  { name: "Palmpay", logo: "🟣", status: "fast" },
  { name: "Opay", logo: "🟢", status: "fast" },
  { name: "Access Bank", logo: "🔵", status: "normal" },
  { name: "Moniepoint", logo: "🟡", status: "fast" },
]

export default function SelectBank() {
  const router = useRouter()
  const [selectedBank, setSelectedBank] = useState("")

  const handleBankSelect = (bankName: string) => {
    // update local state so selection is visible immediately
    setSelectedBank(bankName)
    // persist selection for other flows to read
    try {
      localStorage.setItem("selectedBank", bankName)
    } catch (e) {
      // ignore storage errors
    }

    // Small delay so the user sees the selected state before navigating
    setTimeout(() => {
      router.push("/buy-buzz-code/payment")
    }, 180)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Select Bank</h1>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-6">Choose your preferred bank for payment</p>

          <div className="space-y-3">
            {banks.map((bank) => {
              const isSelected = bank.name === selectedBank
              return (
                <div
                  key={bank.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleBankSelect(bank.name)
                    }
                  }}
                  className={`flex items-center p-4 border rounded cursor-pointer transition-colors ${isSelected ? "bg-blue-100" : "hover:bg-gray-50"}`}
                  onClick={() => handleBankSelect(bank.name)}
                >
                  <span className="mr-4">{bank.logo}</span>
                  <span className="flex-1">{bank.name}</span>
                  <span className="text-sm text-gray-500">{bank.status}</span>
                  {isSelected && (
                    <span className="ml-4 inline-flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
