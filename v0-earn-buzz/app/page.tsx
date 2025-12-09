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
      
      <div className="animate-pulse">Loading...</div>
    </div>
  )
}
