import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { DemoSessionProvider } from "@/lib/hooks/use-demo-session"
import { Toaster } from "@/components/ui/toaster"
import { GlobalChatWidget } from "@/components/orchestrate/GlobalChatWidget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InternPath AI - Your AI Internship Copilot",
  description: "AI-powered platform to help students tailor resumes and cover letters for internship applications",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        <DemoSessionProvider>
          {children}
          <GlobalChatWidget />
          <Analytics />
          <Toaster />
        </DemoSessionProvider>
      </body>
    </html>
  )
}
