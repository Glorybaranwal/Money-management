"use client"

import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Plus, Wallet, QrCode, ArrowUpRight, CreditCard, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AccountsList() {
  const { state, dispatch } = useFinance()
  const { accounts } = state

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)

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

  const handleEditAccount = () => {
    if (!selectedAccountId || !newAccount.title) return

    dispatch({
      type: "UPDATE_ACCOUNT",
      payload: {
        id: selectedAccountId,
        title: newAccount.title,
        description: newAccount.description,
        balance: newAccount.balance,
        type: newAccount.type,
      },
    })

    setIsEditAccountOpen(false)
  }

  const handleDeleteAccount = (id: string) => {
    dispatch({
      type: "DELETE_ACCOUNT",
      payload: id,
    })
  }

  const openEditDialog = (id: string) => {
    const account = accounts.find((a) => a.id === id)
    if (!account) return

    setSelectedAccountId(id)
    setNewAccount({
      title: account.title,
      description: account.description || "",
      balance: account.balance,
      type: account.type,
    })

    setIsEditAccountOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Accounts</h3>
        <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
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

        {/* Edit Account Dialog */}
        <Dialog open={isEditAccountOpen} onOpenChange={setIsEditAccountOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Account Name</Label>
                <Input
                  id="edit-title"
                  value={newAccount.title}
                  onChange={(e) => setNewAccount({ ...newAccount, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Input
                  id="edit-description"
                  value={newAccount.description}
                  onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-balance">Balance</Label>
                <Input
                  id="edit-balance"
                  type="number"
                  value={newAccount.balance || ""}
                  onChange={(e) => setNewAccount({ ...newAccount, balance: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Account Type</Label>
                <Select
                  value={newAccount.type}
                  onValueChange={(value) =>
                    setNewAccount({
                      ...newAccount,
                      type: value as "savings" | "checking" | "investment" | "debt",
                    })
                  }
                >
                  <SelectTrigger id="edit-type">
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
              <div className="flex space-x-2">
                <Button onClick={handleEditAccount} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (selectedAccountId) {
                      handleDeleteAccount(selectedAccountId)
                      setIsEditAccountOpen(false)
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <div key={account.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditDialog(account.id)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 dark:text-red-400"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  account.type === "savings"
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : account.type === "checking"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : account.type === "investment"
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {account.type === "savings" && <Wallet className="h-5 w-5" />}
                {account.type === "checking" && <QrCode className="h-5 w-5" />}
                {account.type === "investment" && <ArrowUpRight className="h-5 w-5" />}
                {account.type === "debt" && <CreditCard className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="font-medium">{account.title}</h4>
                <p className="text-sm text-muted-foreground">{account.description}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
              <p className="text-xs text-muted-foreground capitalize">{account.type} Account</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

