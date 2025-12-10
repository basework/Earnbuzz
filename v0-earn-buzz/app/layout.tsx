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
        <script
          type="text/javascript"
          src="//pl28211371.effectivegatecpm.com/fe/21/ea/fe21ea915e2cf9ee46c6c8203ad8dda8.js"
        ></script>
        <script
          src="https://3nbf4.com/act/files/tag.min.js?z=10297783"
          data-cfasync="false"
          async
        ></script>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='10297781',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        /> */}
        {/* <script type="text/javascript" src="//pl28218006.effectivegatecpm.com/e9/5d/9f/e95d9f79fe872eba5d870aca023aa8b3.js"></script> */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="min-h-screen max-w-md mx-auto bg-[#fff5f0]">{children}</main>
        </ThemeProvider>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('Service Worker registered with scope:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('Service Worker registration failed:', error);
                    });
                });
              }
            `
          }}
        /> */}
        <a href="https://www.effectivegatecpm.com/h4imq50bhm?key=65343fceb6fb8fcf829db72d0dfeab90" target="_blank" rel="noopener noreferrer" style={{ display: 'none' }}>Smartlink for tivexx9jaa.vercel.app</a>
        <script
          type="text/javascript"
          src="//pl28211371.effectivegatecpm.com/fe/21/ea/fe21ea915e2cf9ee46c6c8203ad8dda8.js"
        ></script>
      </body>
    </html>
  )
}