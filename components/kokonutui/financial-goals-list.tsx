"use client"

import { useFinance } from "@/lib/context/finance-context"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Plus, PiggyBank, TrendingUp, CreditCard, Calendar, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function FinancialGoalsList() {
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

  // Map of icon names to components
  const iconMap = {
    PiggyBank: PiggyBank,
    TrendingUp: TrendingUp,
    CreditCard: CreditCard,
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Financial Goals</h3>
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const IconComponent = iconMap[goal.icon as keyof typeof iconMap] || PiggyBank

          return (
            <div key={goal.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm relative group">
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
                  <DropdownMenuItem onClick={() => openEditDialog(goal.id)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground">{goal.subtitle}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {goal.amount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Target</span>
                    <span className="font-medium">{formatCurrency(goal.amount)}</span>
                  </div>
                )}

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{goal.date}</span>
                </div>

                {typeof goal.progress === "number" && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

