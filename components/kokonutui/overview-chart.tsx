"use client"

import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function Overview() {
  const { state } = useFinance()
  const { transactions } = state

  // Calculate total income and expenses
  const totalIncome = transactions.filter((t) => t.type === "incoming").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "outgoing").reduce((sum, t) => sum + t.amount, 0)

  // Prepare data for the donut chart
  const data = [
    { name: "Income", value: totalIncome, color: "#4ade80" },
    { name: "Expenses", value: totalExpenses, color: "#f87171" },
  ]

  // Calculate net balance
  const netBalance = totalIncome - totalExpenses
  const isPositive = netBalance >= 0

  // Calculate savings rate
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : "0.0"

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload

      return (
        <div className="bg-background p-3 border rounded-lg shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="w-full h-[350px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center bg-background/80 backdrop-blur-sm p-3 rounded-lg">
          <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
          <div className="flex items-center justify-center gap-1">
            <span className={`text-xl font-bold ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
              {formatCurrency(Math.abs(netBalance))}
            </span>
            {isPositive ? (
              <ArrowDownRight className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Savings Rate: {savingsRate}%</p>
        </div>
      </div>
    </div>
  )
}

