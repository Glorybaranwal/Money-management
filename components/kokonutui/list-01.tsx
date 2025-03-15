"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownLeft, Wallet, SendHorizontal, QrCode, Plus, ArrowRight, CreditCard } from "lucide-react"
import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface List01Props {
  className?: string
}

export default function List01({ className }: List01Props) {
  const { state, dispatch } = useFinance()
  const { accounts, totalBalance } = state

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({
    title: "",
    description: "",
    balance: 0,
    type: "savings" as const,
  })

  const handleAddAccount = () => {
    if (!newAccount.title || newAccount.balance === 0) return

    dispatch({
      type: "ADD_ACCOUNT",
      payload: {
        title: newAccount.title,
        description: newAccount.description,
        balance: newAccount.balance,
        type: newAccount.type,
      },
    })

    // Reset form and close dialog
    setNewAccount({
      title: "",
      description: "",
      balance: 0,
      type: "savings",
    })
    setIsAddAccountOpen(false)
  }

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Balance</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{formatCurrency(totalBalance)}</h1>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Your Accounts</h2>
        </div>

        <div className="space-y-1">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-emerald-100 dark:bg-emerald-900/30": account.type === "savings",
                    "bg-blue-100 dark:bg-blue-900/30": account.type === "checking",
                    "bg-purple-100 dark:bg-purple-900/30": account.type === "investment",
                    "bg-red-100 dark:bg-red-900/30": account.type === "debt",
                  })}
                >
                  {account.type === "savings" && (
                    <Wallet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {account.type === "checking" && <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {account.type === "investment" && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                  {account.type === "debt" && <CreditCard className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.title}</h3>
                  {account.description && (
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{account.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(account.balance)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with action buttons */}
      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center justify-center gap-2",
                  "py-2 px-3 rounded-lg",
                  "text-xs font-medium",
                  "bg-zinc-900 dark:bg-zinc-50",
                  "text-zinc-50 dark:text-zinc-900",
                  "hover:bg-zinc-800 dark:hover:bg-zinc-200",
                  "shadow-sm hover:shadow",
                  "transition-all duration-200",
                )}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Account Name</Label>
                  <Input
                    id="title"
                    value={newAccount.title}
                    onChange={(e) => setNewAccount({ ...newAccount, title: e.target.value })}
                    placeholder="e.g. Savings Account"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={newAccount.description}
                    onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                    placeholder="e.g. Emergency Fund"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Initial Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={newAccount.balance || ""}
                    onChange={(e) => setNewAccount({ ...newAccount, balance: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Account Type</Label>
                  <Select
                    value={newAccount.type}
                    onValueChange={(value) =>
                      setNewAccount({
                        ...newAccount,
                        type: value as "savings" | "checking" | "investment" | "debt",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="debt">Debt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddAccount} className="w-full">
                  Add Account
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <SendHorizontal className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Top-up</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  )
}

