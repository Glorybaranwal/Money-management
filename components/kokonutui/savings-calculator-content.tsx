"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"
import { PiggyBank, Trash2, Plus, Calculator, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Expense {
  id: string
  name: string
  amount: number
  savingPercentage: number
}

export default function SavingsCalculatorContent() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "Groceries", amount: 500, savingPercentage: 10 },
    { id: "2", name: "Entertainment", amount: 200, savingPercentage: 20 },
    { id: "3", name: "Dining Out", amount: 300, savingPercentage: 15 },
  ])

  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: 0,
  })

  const addExpense = () => {
    if (!newExpense.name || newExpense.amount <= 0) return

    setExpenses([
      ...expenses,
      {
        id: Date.now().toString(),
        name: newExpense.name,
        amount: newExpense.amount,
        savingPercentage: 10, // Default saving percentage
      },
    ])

    setNewExpense({ name: "", amount: 0 })
  }

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const updateSavingPercentage = (id: string, percentage: number) => {
    setExpenses(expenses.map((expense) => (expense.id === id ? { ...expense, savingPercentage: percentage } : expense)))
  }

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalSavings = expenses.reduce((sum, expense) => sum + (expense.amount * expense.savingPercentage) / 100, 0)
  const averageSavingPercentage =
    expenses.length > 0 ? expenses.reduce((sum, expense) => sum + expense.savingPercentage, 0) / expenses.length : 0

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Savings Calculator</h1>
        <p className="text-muted-foreground">Calculate potential savings across your expenses</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Expenses</CardTitle>
              <CardDescription>Add your monthly expenses and adjust the saving percentage for each</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="expense-name">Expense Name</Label>
                    <Input
                      id="expense-name"
                      placeholder="e.g. Groceries"
                      value={newExpense.name}
                      onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    />
                  </div>
                  <div className="w-32">
                    <Label htmlFor="expense-amount">Amount</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount || ""}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          amount: Number.parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addExpense}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                {expenses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No expenses added yet. Add your first expense above.
                  </div>
                ) : (
                  <div className="space-y-4 mt-6">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{expense.name}</h3>
                            <p className="text-sm text-muted-foreground">Monthly: {formatCurrency(expense.amount)}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeExpense(expense.id)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Saving Percentage: {expense.savingPercentage}%</Label>
                            <span className="text-sm font-medium">
                              Save: {formatCurrency((expense.amount * expense.savingPercentage) / 100)}
                            </span>
                          </div>
                          <Slider
                            value={[expense.savingPercentage]}
                            min={0}
                            max={50}
                            step={1}
                            onValueChange={(value) => updateSavingPercentage(expense.id, value[0])}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Savings Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Expenses</span>
                  <span className="font-medium">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Saving %</span>
                  <span className="font-medium">{averageSavingPercentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Potential Savings</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(totalSavings)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reduced Expenses</span>
                  <span className="font-medium">{formatCurrency(totalExpenses - totalSavings)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Savings Rate</span>
                  <span>{((totalSavings / totalExpenses) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(totalSavings / totalExpenses) * 100} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <PiggyBank className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Annual Savings</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalSavings * 12)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p className="text-sm">Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings.</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p className="text-sm">Consider meal planning to reduce food expenses by up to 25%.</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p className="text-sm">Review subscriptions monthly and cancel unused services.</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p className="text-sm">Use the 24-hour rule before making non-essential purchases.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

