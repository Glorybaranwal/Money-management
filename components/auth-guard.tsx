"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/register"]

    const checkAuth = () => {
      const user = getCurrentUser()

      if (!user && !publicRoutes.includes(pathname)) {
        router.push("/login")
      } else if (user && publicRoutes.includes(pathname)) {
        router.push("/dashboard")
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage events (logout from another tab)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return isAuthenticated ? children : null
}

