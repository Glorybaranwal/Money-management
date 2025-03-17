"use client"

import Layout from "@/components/kokonutui/layout"
import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  Plus,
  Wallet,
  QrCode,
  ArrowUpRight,
  CreditCard,
  Pencil,
  Trash2,
  MoreHorizontal,
  ArrowDownLeft,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AccountsPage() {
  const { state, dispatch } = useFinance()
  const { accounts, transactions } = state

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

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

  // Get account transactions
  const getAccountTransactions = (accountId: string) => {
    return transactions
      .filter((t) => t.accountId === accountId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Accounts</h1>
            <p className="text-muted-foreground">Manage your financial accounts</p>
          </div>
          <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
            <DialogTrigger asChild>
              <Button>
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

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Accounts</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="checking">Checking</TabsTrigger>
            <TabsTrigger value="investment">Investments</TabsTrigger>
            <TabsTrigger value="debt">Debt</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <Card
                  key={account.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${selectedAccount === account.id ? "border-primary" : ""}`}
                  onClick={() => setSelectedAccount(account.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
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
                          <h3 className="font-medium">{account.title}</h3>
                          <p className="text-sm text-muted-foreground">{account.description}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openEditDialog(account.id)
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteAccount(account.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2">
                      <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
                      <p className="text-xs text-muted-foreground capitalize">{account.type} Account</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedAccount && (
              <Card>
                <CardHeader>
                  <CardTitle>{accounts.find((a) => a.id === selectedAccount)?.title} Transactions</CardTitle>
                  <CardDescription>Recent activity for this account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getAccountTransactions(selectedAccount).length > 0 ? (
                        getAccountTransactions(selectedAccount).map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.title}</TableCell>
                            <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                            <TableCell className="capitalize">{transaction.category}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  transaction.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : transaction.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                              >
                                {transaction.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <span
                                  className={`font-medium ${
                                    transaction.type === "incoming" ? "text-emerald-500" : "text-red-500"
                                  }`}
                                >
                                  {transaction.type === "incoming" ? "+" : "-"}
                                  {formatCurrency(transaction.amount)}
                                </span>
                                {transaction.type === "incoming" ? (
                                  <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
                                ) : (
                                  <ArrowUpRight className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No transactions found for this account
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {["savings", "checking", "investment", "debt"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accounts
                  .filter((account) => account.type === type)
                  .map((account) => (
                    <Card
                      key={account.id}
                      className={`cursor-pointer hover:border-primary transition-colors ${selectedAccount === account.id ? "border-primary" : ""}`}
                      onClick={() => setSelectedAccount(account.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
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
                              <h3 className="font-medium">{account.title}</h3>
                              <p className="text-sm text-muted-foreground">{account.description}</p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openEditDialog(account.id)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteAccount(account.id)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-2">
                          <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
                          <p className="text-xs text-muted-foreground capitalize">{account.type} Account</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {selectedAccount && accounts.find((a) => a.id === selectedAccount)?.type === type && (
                <Card>
                  <CardHeader>
                    <CardTitle>{accounts.find((a) => a.id === selectedAccount)?.title} Transactions</CardTitle>
                    <CardDescription>Recent activity for this account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getAccountTransactions(selectedAccount).length > 0 ? (
                          getAccountTransactions(selectedAccount).map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.title}</TableCell>
                              <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                              <TableCell className="capitalize">{transaction.category}</TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    transaction.status === "completed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : transaction.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  }`}
                                >
                                  {transaction.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <span
                                    className={`font-medium ${
                                      transaction.type === "incoming" ? "text-emerald-500" : "text-red-500"
                                    }`}
                                  >
                                    {transaction.type === "incoming" ? "+" : "-"}
                                    {formatCurrency(transaction.amount)}
                                  </span>
                                  {transaction.type === "incoming" ? (
                                    <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
                                  ) : (
                                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                              No transactions found for this account
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  )
}

