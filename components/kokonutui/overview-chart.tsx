"use client"

import { useFinance } from "@/lib/context/finance-context"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function Overview() {
  const { state } = useFinance()
  const { transactions } = state

  // Group transactions by month and calculate income/expenses
  const monthlyData = transactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.timestamp)
      const month = date.toLocaleString("default", { month: "short" })

      if (!acc[month]) {
        acc[month] = { name: month, income: 0, expenses: 0 }
      }

      if (transaction.type === "incoming") {
        acc[month].income += transaction.amount
      } else {
        acc[month].expenses += transaction.amount
      }

      return acc
    },
    {} as Record<string, { name: string; income: number; expenses: number }>,
  )

  // Convert to array and ensure we have data for the last 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = new Date().getMonth()

  const data = months
    .slice(currentMonth - 5, currentMonth + 1)
    .map((month) => monthlyData[month] || { name: month, income: 0, expenses: 0 })

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Bar dataKey="income" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

