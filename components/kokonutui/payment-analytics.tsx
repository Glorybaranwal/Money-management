"use client"

import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ShoppingBag, Utensils, Car, Music, Receipt } from "lucide-react"

export function PaymentAnalytics() {
  const { state } = useFinance()
  const { transactions } = state

  // Group transactions by category
  const categoryData = transactions
    .filter((t) => t.type === "outgoing")
    .reduce(
      (acc, transaction) => {
        const category = transaction.category || "other"
        if (!acc[category]) {
          acc[category] = { name: category, value: 0 }
        }
        acc[category].value += transaction.amount
        return acc
      },
      {} as Record<string, { name: string; value: number }>,
    )

  // Convert to array and sort by value
  const data = Object.values(categoryData).sort((a, b) => b.value - a.value)

  // Calculate total expenses
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0)

  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return <ShoppingBag className="h-4 w-4" />
      case "food":
        return <Utensils className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      case "entertainment":
        return <Music className="h-4 w-4" />
      default:
        return <Receipt className="h-4 w-4" />
    }
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1)

      return (
        <div className="bg-background p-3 border rounded-lg shadow-md">
          <p className="capitalize font-medium">{data.name}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-xs text-muted-foreground">{percentage}% of total</p>
        </div>
      )
    }

    return null
  }

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <div className="flex items-center gap-1">
              {getCategoryIcon(entry.value)}
              <span className="text-xs capitalize">{entry.value}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-[350px]">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">No expense data available</div>
      )}
    </div>
  )
}

