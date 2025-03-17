import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FinanceProvider } from "@/lib/context/finance-context"
import { ToastProvider } from "@/components/ui/toast-provider"
import AuthGuard from "@/components/auth-guard"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Money Managment Dashboard",
  description: "A modern financial dashboard with theme switching and data persistence"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FinanceProvider>
            <AuthGuard>{children}</AuthGuard>
            <ToastProvider />
          </FinanceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'