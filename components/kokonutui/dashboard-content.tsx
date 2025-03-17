"use client"

import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet, PieChart, BarChartIcon } from "lucide-react"
import { Overview } from "@/components/kokonutui/overview-chart"
import { PaymentAnalytics } from "@/components/kokonutui/payment-analytics"
import { RecentTransactions } from "@/components/kokonutui/recent-transactions"
import { AccountsList } from "@/components/kokonutui/accounts-list"
import { FinancialGoalsList } from "@/components/kokonutui/financial-goals-list"

export default function DashboardContent() {
  const { state } = useFinance()
  const { accounts, transactions, totalBalance } = state

  // Calculate total income and expenses
  const totalIncome = transactions.filter((t) => t.type === "incoming").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "outgoing").reduce((sum, t) => sum + t.amount, 0)

  // Calculate month-over-month change (simplified for demo)
  const monthlyChange = totalIncome - totalExpenses
  const monthlyChangePercentage = totalIncome > 0 ? (monthlyChange / totalIncome) * 100 : 0

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Payment Analytics</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
                <p className="text-xs text-muted-foreground">
                  {monthlyChange >= 0 ? "+" : "-"}
                  {formatCurrency(Math.abs(monthlyChange))} from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Income</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                <p className="text-xs text-muted-foreground">
                  {transactions.filter((t) => t.type === "incoming").length} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                <p className="text-xs text-muted-foreground">
                  {transactions.filter((t) => t.type === "outgoing").length} transactions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accounts</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accounts.length}</div>
                <p className="text-xs text-muted-foreground">
                  {accounts.filter((a) => a.type === "savings" || a.type === "investment").length} savings/investment
                  accounts
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Income vs Expenses</CardTitle>
                <BarChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your most recent financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions limit={5} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Spending by Category</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <PaymentAnalytics />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Payment Breakdown</CardTitle>
                <CardDescription>How your money is being spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length > 0 ? (
                    <>
                      {/* Calculate and display top spending categories */}
                      {Object.entries(
                        transactions
                          .filter((t) => t.type === "outgoing")
                          .reduce(
                            (acc, t) => {
                              acc[t.category] = (acc[t.category] || 0) + t.amount
                              return acc
                            },
                            {} as Record<string, number>,
                          ),
                      )
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([category, amount], index) => {
                          const percentage = (amount / totalExpenses) * 100
                          return (
                            <div key={category} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="capitalize font-medium">{category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{formatCurrency(amount)}</span>
                                  <span className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</span>
                                </div>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    index === 0
                                      ? "bg-primary"
                                      : index === 1
                                        ? "bg-blue-500"
                                        : index === 2
                                          ? "bg-yellow-500"
                                          : index === 3
                                            ? "bg-purple-500"
                                            : "bg-green-500"
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                    </>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">No transaction data available</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Accounts</CardTitle>
              <CardDescription>Manage your financial accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <AccountsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track your progress towards financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialGoalsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

