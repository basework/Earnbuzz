import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tivexx 9Ja",
  description:
    "Tivexx 9ja is a financial & earning app that offers weekly cash rewards to new users",
  manifest: "/manifest.json",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ea580c" />
        <style>{`
          /* Constrain ad sizes to reduce visual footprint */
          #social-bar, .social-bar, [data-ad-slot], [data-ad] {
            max-width: 100%;
            max-height: 60px !important;
            overflow: hidden !important;
          }
          
          /* Reduce ad container padding/margins */
          ins, iframe[src*="ads"], iframe[src*="ad-"], .adsbygoogle {
            max-height: 60px !important;
          }
          
          /* Prevent ad expansion */
          [id^="ad"], [class*="ad-"], [class*="advertisement"] {
            max-width: 100% !important;
            max-height: 60px !important;
          }
        `}</style>
        {/* <script
          type="text/javascript"
          src="//pl28211371.effectivegatecpm.com/fe/21/ea/fe21ea915e2cf9ee46c6c8203ad8dda8.js"
        ></script> */}
        <script
          src="https://3nbf4.com/act/files/tag.min.js?z=10297783"
          data-cfasync="false"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="min-h-screen max-w-md mx-auto bg-[#fff5f0]">{children}</main>
        </ThemeProvider>
        <a href="https://www.effectivegatecpm.com/h4imq50bhm?key=65343fceb6fb8fcf829db72d0dfeab90" target="_blank" rel="noopener noreferrer" style={{ display: 'none' }}>Smartlink for tivexx9jaa.vercel.app</a>
        {/* <script
          type="text/javascript"
          src="//pl28211371.effectivegatecpm.com/fe/21/ea/fe21ea915e2cf9ee46c6c8203ad8dda8.js"
        ></script>
      </body> */}
    </html>
  )
}