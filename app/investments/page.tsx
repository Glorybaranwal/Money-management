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
import { useState } from "react"
import { Plus, TrendingUp, BarChart2, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export default function InvestmentsPage() {
  const { state, dispatch } = useFinance()
  const { accounts, transactions } = state

  // Filter investment accounts
  const investmentAccounts = accounts.filter((account) => account.type === "investment")

  // Calculate total investment value
  const totalInvestmentValue = investmentAccounts.reduce((sum, account) => sum + account.balance, 0)

  // Get investment transactions
  const investmentTransactions = transactions
    .filter((t) => {
      const account = accounts.find((a) => a.id === t.accountId)
      return account && account.type === "investment"
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Calculate investment performance (simplified)
  const investmentInflow = investmentTransactions
    .filter((t) => t.type === "incoming")
    .reduce((sum, t) => sum + t.amount, 0)

  const investmentOutflow = investmentTransactions
    .filter((t) => t.type === "outgoing")
    .reduce((sum, t) => sum + t.amount, 0)

  const investmentReturn = totalInvestmentValue - (investmentInflow - investmentOutflow)
  const returnPercentage = investmentInflow > 0 ? (investmentReturn / investmentInflow) * 100 : 0

  // Prepare data for pie chart
  const investmentAllocation = investmentAccounts.map((account) => ({
    name: account.title,
    value: account.balance,
  }))

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const percentage = ((data.value / totalInvestmentValue) * 100).toFixed(1)

      return (
        <div className="bg-background p-3 border rounded-lg shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-xs text-muted-foreground">{percentage}% of portfolio</p>
        </div>
      )
    }

    return null
  }

  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: 0,
    type: "outgoing" as const,
    category: "investment",
    icon: "TrendingUp",
    accountId: "",
    status: "completed" as const,
  })

  const handleAddTransaction = () => {
    if (!newTransaction.title || newTransaction.amount === 0 || !newTransaction.accountId) return

    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        title: newTransaction.title,
        amount: newTransaction.amount,
        type: newTransaction.type,
        category: newTransaction.category,
        icon: newTransaction.icon,
        timestamp: new Date().toISOString(),
        status: newTransaction.status,
        accountId: newTransaction.accountId,
      },
    })

    // Reset form and close dialog
    setNewTransaction({
      title: "",
      amount: 0,
      type: "outgoing",
      category: "investment",
      icon: "TrendingUp",
      accountId: "",
      status: "completed",
    })
    setIsAddTransactionOpen(false)
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Investments</h1>
            <p className="text-muted-foreground">Track and manage your investment portfolio</p>
          </div>
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Investment Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Investment Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Transaction Name</Label>
                  <Input
                    id="title"
                    value={newTransaction.title}
                    onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                    placeholder="e.g. Stock Purchase"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount || ""}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, amount: Number.parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Transaction Type</Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value) =>
                      setNewTransaction({
                        ...newTransaction,
                        type: value as "incoming" | "outgoing",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incoming">Deposit / Gain</SelectItem>
                      <SelectItem value="outgoing">Withdrawal / Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="stocks">Stocks</SelectItem>
                      <SelectItem value="bonds">Bonds</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="realestate">Real Estate</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Investment Account</Label>
                  <Select
                    value={newTransaction.accountId}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, accountId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddTransaction} className="w-full">
                  Add Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalInvestmentValue)}</div>
              <p className="text-xs text-muted-foreground">Across {investmentAccounts.length} investment accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${investmentReturn >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                {formatCurrency(Math.abs(investmentReturn))}
              </div>
              <p className="text-xs text-muted-foreground">
                {returnPercentage.toFixed(2)}% {investmentReturn >= 0 ? "gain" : "loss"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deposits</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(investmentInflow)}</div>
              <p className="text-xs text-muted-foreground">
                {investmentTransactions.filter((t) => t.type === "incoming").length} transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(investmentOutflow)}</div>
              <p className="text-xs text-muted-foreground">
                {investmentTransactions.filter((t) => t.type === "outgoing").length} transactions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Distribution of your investment accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {investmentAccounts.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={investmentAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {investmentAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No investment accounts found
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Accounts</CardTitle>
              <CardDescription>Your investment portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              {investmentAccounts.length > 0 ? (
                <div className="space-y-4">
                  {investmentAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{account.title}</h3>
                          <p className="text-sm text-muted-foreground">{account.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(account.balance)}</p>
                        <p className="text-xs text-muted-foreground">
                          {((account.balance / totalInvestmentValue) * 100).toFixed(1)}% of portfolio
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No investment accounts found. Add an investment account to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Investment Transactions</CardTitle>
            <CardDescription>Your investment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentTransactions.length > 0 ? (
                  investmentTransactions.map((transaction) => {
                    const account = accounts.find((a) => a.id === transaction.accountId)

                    return (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.title}</TableCell>
                        <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                        <TableCell>{account?.title || "Unknown Account"}</TableCell>
                        <TableCell className="capitalize">{transaction.category}</TableCell>
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
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No investment transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

