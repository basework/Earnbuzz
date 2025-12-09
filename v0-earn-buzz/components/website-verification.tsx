"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function WebsiteVerification() {
  const [domain, setDomain] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("website-verification-domain") || "tivexx9jaa.online"
    setDomain(saved)
  }, [])

  const saveDomain = () => {
    try {
      localStorage.setItem("website-verification-domain", domain)
      setMessage("Saved (only stored locally). You can now download the verification file.")
      setTimeout(() => setMessage(""), 4000)
    } catch (e) {
      setMessage("Could not save domain locally.")
      setTimeout(() => setMessage(""), 4000)
    }
  }

  const safeFileContent = `{
  "verification": "multitag",
  "domain": "${domain}",
  "issued": "${new Date().toISOString()}"
}
\n# NOTE: Do NOT include third-party service workers or remote importScripts in this file unless you fully trust the provider and understand the security implications.`

  const rawSnippet = `self.options = {
    "domain": "5gvci.com",
    "zoneId": 10297046
}
self.lary = ""
importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw')`

  const downloadFile = (content: string, filename = "multitag-verification.txt") => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h3 className="font-semibold mb-2">Website Verification</h3>

      <p className="text-sm text-gray-600 mb-3">Add your website URL and download the verification file to place in your site root.</p>

      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          aria-label="Website domain"
        />
        <Button onClick={saveDomain}>Save</Button>
      </div>

      <div className="mb-3">
        <Button onClick={() => downloadFile(safeFileContent, `multitag-${domain || "site"}.txt`)} className="mr-2">
          Download Safe Verification File
        </Button>
        <Button onClick={() => downloadFile(rawSnippet, `raw-snippet-${domain || "site"}.js`)} variant="outline">
          Download Raw Snippet (Not Recommended)
        </Button>
      </div>

      {message && <div className="text-sm text-green-600 mb-2">{message}</div>}

      <div className="text-xs text-gray-500">
        <p className="font-medium">Instructions</p>
        <ol className="list-decimal pl-5">
          <li>Download the verification file and place it in the root folder of your site (e.g., <code>/public</code> or site root).</li>
          <li>Do not delete the file — it's required for Multitag functioning.</li>
          <li>If the provider asks you to add remote scripts (e.g., <code>importScripts(...)</code>), only do so if you trust the domain.</li>
        </ol>
      </div>
    </div>
  )
}
