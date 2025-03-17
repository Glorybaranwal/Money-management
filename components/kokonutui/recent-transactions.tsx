"use client"

import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight, ShoppingCart, Wallet, CreditCard } from "lucide-react"

interface RecentTransactionsProps {
  limit?: number
}

// Map of icon names to components
const iconMap = {
  ShoppingCart: ShoppingCart,
  Wallet: Wallet,
  CreditCard: CreditCard,
}

export function RecentTransactions({ limit }: RecentTransactionsProps) {
  const { state } = useFinance()
  const { transactions, accounts } = state

  // Sort transactions by date (newest first) and limit if needed
  const sortedTransactions = [...transactions]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)

  // Get account name by ID
  const getAccountName = (accountId: string) => {
    const account = accounts.find((a) => a.id === accountId)
    return account ? account.title : "Unknown Account"
  }

  return (
    <div className="space-y-8">
      {sortedTransactions.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">No transactions found</div>
      ) : (
        sortedTransactions.map((transaction) => {
          const IconComponent = iconMap[transaction.icon as keyof typeof iconMap] || ShoppingCart

          return (
            <div key={transaction.id} className="flex items-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted">
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(transaction.timestamp)} • {getAccountName(transaction.accountId)}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span
                  className={`text-sm font-medium ${
                    transaction.type === "incoming" ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {transaction.type === "incoming" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
                {transaction.type === "incoming" ? (
                  <ArrowDownRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

