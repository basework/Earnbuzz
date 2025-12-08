"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("tivexx-user")

    if (storedUser) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <a href="https://www.effectivegatecpm.com/h4imq50bhm?key=65343fceb6fb8fcf829db72d0dfeab90" target="_blank" rel="noopener noreferrer" style={{ display: 'none' }}>Smartlink for tivexx9jaa.vercel.app</a>
      <div className="animate-pulse">Loading...</div>
    </div>
  )
}
