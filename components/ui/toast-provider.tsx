"use client"

import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react"
import { useFinance } from "@/lib/context/finance-context"

export function ToastProvider() {
  const { toast } = useToast()
  const { state } = useFinance()

  // Track changes in state to show notifications
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "finance_dashboard_state") {
        const oldState = e.oldValue ? JSON.parse(e.oldValue) : null
        const newState = e.newValue ? JSON.parse(e.newValue) : null

        if (!oldState || !newState) return

        // Check for account changes
        if (oldState.accounts.length < newState.accounts.length) {
          toast({
            title: "Account Added",
            description: "A new account has been added successfully.",
          })
        } else if (oldState.accounts.length > newState.accounts.length) {
          toast({
            title: "Account Deleted",
            description: "An account has been deleted successfully.",
            variant: "destructive",
          })
        }

        // Check for transaction changes
        if (oldState.transactions.length < newState.transactions.length) {
          toast({
            title: "Transaction Added",
            description: "A new transaction has been recorded successfully.",
          })
        } else if (oldState.transactions.length > newState.transactions.length) {
          toast({
            title: "Transaction Deleted",
            description: "A transaction has been deleted successfully.",
            variant: "destructive",
          })
        }

        // Check for goal changes
        if (oldState.goals.length < newState.goals.length) {
          toast({
            title: "Goal Added",
            description: "A new financial goal has been added successfully.",
          })
        } else if (oldState.goals.length > newState.goals.length) {
          toast({
            title: "Goal Deleted",
            description: "A financial goal has been deleted successfully.",
            variant: "destructive",
          })
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [toast])

  return <Toaster />
}

