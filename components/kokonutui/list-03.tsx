"use client"

import { cn } from "@/lib/utils"
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Timer,
  AlertCircle,
  PiggyBank,
  TrendingUp,
  CreditCard,
  Plus,
  Pencil,
} from "lucide-react"
import React, { useState } from "react"
import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface List03Props {
  className?: string
}

const iconStyles = {
  savings: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  investment: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  debt: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
}

const statusConfig = {
  pending: {
    icon: Timer,
    class: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  "in-progress": {
    icon: AlertCircle,
    class: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  completed: {
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
}

// Map of icon names to components
const iconMap = {
  PiggyBank: PiggyBank,
  TrendingUp: TrendingUp,
  CreditCard: CreditCard,
}

export default function List03({ className }: List03Props) {
  const { state, dispatch } = useFinance()
  const { goals } = state

  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false)
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)

  const [newGoal, setNewGoal] = useState({
    title: "",
    subtitle: "",
    icon: "PiggyBank",
    iconStyle: "savings",
    date: "",
    amount: 0,
    status: "pending" as const,
    progress: 0,
  })

  const selectedGoal = selectedGoalId ? goals.find((g) => g.id === selectedGoalId) : null

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.date) return

    dispatch({
      type: "ADD_GOAL",
      payload: newGoal,
    })

    // Reset form and close dialog
    setNewGoal({
      title: "",
      subtitle: "",
      icon: "PiggyBank",
      iconStyle: "savings",
      date: "",
      amount: 0,
      status: "pending",
      progress: 0,
    })
    setIsAddGoalOpen(false)
  }

  const handleEditGoal = () => {
    if (!selectedGoalId || !selectedGoal) return

    dispatch({
      type: "UPDATE_GOAL",
      payload: {
        ...selectedGoal,
        ...newGoal,
        id: selectedGoalId,
      },
    })

    setIsEditGoalOpen(false)
  }

  const handleDeleteGoal = (id: string) => {
    dispatch({
      type: "DELETE_GOAL",
      payload: id,
    })
  }

  const openEditDialog = (id: string) => {
    const goal = goals.find((g) => g.id === id)
    if (!goal) return

    setSelectedGoalId(id)
    setNewGoal({
      title: goal.title,
      subtitle: goal.subtitle,
      icon: goal.icon,
      iconStyle: goal.iconStyle,
      date: goal.date,
      amount: goal.amount || 0,
      status: goal.status,
      progress: goal.progress || 0,
    })

    setIsEditGoalOpen(true)
  }

  return (
    <div className={cn("w-full overflow-x-auto scrollbar-none", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
          Financial Goals
        </h2>

        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Financial Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g. Emergency Fund"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Description</Label>
                <Input
                  id="subtitle"
                  value={newGoal.subtitle}
                  onChange={(e) => setNewGoal({ ...newGoal, subtitle: e.target.value })}
                  placeholder="e.g. 3 months of expenses"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={newGoal.icon} onValueChange={(value) => setNewGoal({ ...newGoal, icon: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PiggyBank">Savings</SelectItem>
                    <SelectItem value="TrendingUp">Investment</SelectItem>
                    <SelectItem value="CreditCard">Debt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Target Date</Label>
                <Input
                  id="date"
                  value={newGoal.date}
                  onChange={(e) => setNewGoal({ ...newGoal, date: e.target.value })}
                  placeholder="e.g. Target: Dec 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Target Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newGoal.amount || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, amount: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newGoal.status}
                  onValueChange={(value) =>
                    setNewGoal({
                      ...newGoal,
                      status: value as "pending" | "in-progress" | "completed",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="progress">Progress ({newGoal.progress}%)</Label>
                </div>
                <Slider
                  id="progress"
                  min={0}
                  max={100}
                  step={1}
                  value={[newGoal.progress || 0]}
                  onValueChange={(value) => setNewGoal({ ...newGoal, progress: value[0] })}
                />
              </div>
              <Button onClick={handleAddGoal} className="w-full">
                Add Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Goal Dialog */}
        <Dialog open={isEditGoalOpen} onOpenChange={setIsEditGoalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Financial Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Goal Title</Label>
                <Input
                  id="edit-title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subtitle">Description</Label>
                <Input
                  id="edit-subtitle"
                  value={newGoal.subtitle}
                  onChange={(e) => setNewGoal({ ...newGoal, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Target Date</Label>
                <Input
                  id="edit-date"
                  value={newGoal.date}
                  onChange={(e) => setNewGoal({ ...newGoal, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-amount">Target Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={newGoal.amount || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, amount: Number.parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={newGoal.status}
                  onValueChange={(value) =>
                    setNewGoal({
                      ...newGoal,
                      status: value as "pending" | "in-progress" | "completed",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="edit-progress">Progress ({newGoal.progress}%)</Label>
                </div>
                <Slider
                  id="edit-progress"
                  min={0}
                  max={100}
                  step={1}
                  value={[newGoal.progress || 0]}
                  onValueChange={(value) => setNewGoal({ ...newGoal, progress: value[0] })}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleEditGoal} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (selectedGoalId) {
                      handleDeleteGoal(selectedGoalId)
                      setIsEditGoalOpen(false)
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

      <div className="flex gap-3 min-w-full p-1">
        {goals.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || PiggyBank

          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col",
                "w-[280px] shrink-0",
                "bg-white dark:bg-zinc-900/70",
                "rounded-xl",
                "border border-zinc-100 dark:border-zinc-800",
                "hover:border-zinc-200 dark:hover:border-zinc-700",
                "transition-all duration-200",
                "shadow-sm backdrop-blur-xl",
                "relative", // For absolute positioning of edit button
              )}
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditDialog(item.id)}>
                  <Pencil className="h-3.5 w-3.5 text-zinc-500" />
                </Button>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className={cn("p-2 rounded-lg", iconStyles[item.iconStyle as keyof typeof iconStyles])}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                      statusConfig[item.status].bg,
                      statusConfig[item.status].class,
                    )}
                  >
                    {React.createElement(statusConfig[item.status].icon, { className: "w-3.5 h-3.5" })}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{item.subtitle}</p>
                </div>

                {typeof item.progress === "number" && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
                      <span className="text-zinc-900 dark:text-zinc-100">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {item.amount && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">target</span>
                  </div>
                )}

                <div className="flex items-center text-xs text-zinc-600 dark:text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => openEditDialog(item.id)}
                  className={cn(
                    "w-full flex items-center justify-center gap-2",
                    "py-2.5 px-3",
                    "text-xs font-medium",
                    "text-zinc-600 dark:text-zinc-400",
                    "hover:text-zinc-900 dark:hover:text-zinc-100",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                    "transition-colors duration-200",
                  )}
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

