"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import type { FinancialState, Account, Transaction, FinancialGoal } from "@/lib/types"
import { loadState, saveState } from "@/lib/storage"

// Initial state with default values
const initialState: FinancialState = {
  accounts: [],
  transactions: [],
  goals: [],
  profile: {
    name: "Eugene An",
    role: "Prompt Engineer",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
    subscription: "Free Trial",
  },
  totalBalance: 0,
}

// Action types
type Action =
  | { type: "ADD_ACCOUNT"; payload: Omit<Account, "id"> }
  | { type: "UPDATE_ACCOUNT"; payload: Account }
  | { type: "DELETE_ACCOUNT"; payload: string }
  | { type: "ADD_TRANSACTION"; payload: Omit<Transaction, "id"> }
  | { type: "UPDATE_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "ADD_GOAL"; payload: Omit<FinancialGoal, "id"> }
  | { type: "UPDATE_GOAL"; payload: FinancialGoal }
  | { type: "DELETE_GOAL"; payload: string }
  | { type: "UPDATE_PROFILE"; payload: Partial<FinancialState["profile"]> }
  | { type: "LOAD_STATE"; payload: FinancialState }

// Reducer function
function financeReducer(state: FinancialState, action: Action): FinancialState {
  switch (action.type) {
    case "ADD_ACCOUNT": {
      const newAccount = { ...action.payload, id: uuidv4() }
      const accounts = [...state.accounts, newAccount]
      const totalBalance = calculateTotalBalance(accounts)
      return { ...state, accounts, totalBalance }
    }
    case "UPDATE_ACCOUNT": {
      const accounts = state.accounts.map((account) => (account.id === action.payload.id ? action.payload : account))
      const totalBalance = calculateTotalBalance(accounts)
      return { ...state, accounts, totalBalance }
    }
    case "DELETE_ACCOUNT": {
      const accounts = state.accounts.filter((account) => account.id !== action.payload)
      const transactions = state.transactions.filter((transaction) => transaction.accountId !== action.payload)
      const totalBalance = calculateTotalBalance(accounts)
      return { ...state, accounts, transactions, totalBalance }
    }
    case "ADD_TRANSACTION": {
      const newTransaction = { ...action.payload, id: uuidv4() }

      // Update account balance
      const accounts = state.accounts.map((account) => {
        if (account.id === newTransaction.accountId) {
          const balanceChange = newTransaction.type === "incoming" ? newTransaction.amount : -newTransaction.amount
          return { ...account, balance: account.balance + balanceChange }
        }
        return account
      })

      const totalBalance = calculateTotalBalance(accounts)

      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
        accounts,
        totalBalance,
      }
    }
    case "UPDATE_TRANSACTION": {
      // Find old transaction to calculate balance difference
      const oldTransaction = state.transactions.find((t) => t.id === action.payload.id)
      const transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.id ? action.payload : transaction,
      )

      // Update account balance if transaction changed
      let accounts = [...state.accounts]
      if (oldTransaction) {
        const oldImpact = oldTransaction.type === "incoming" ? oldTransaction.amount : -oldTransaction.amount
        const newImpact = action.payload.type === "incoming" ? action.payload.amount : -action.payload.amount
        const balanceDifference = newImpact - oldImpact

        accounts = accounts.map((account) => {
          if (account.id === action.payload.accountId) {
            return { ...account, balance: account.balance + balanceDifference }
          }
          return account
        })
      }

      const totalBalance = calculateTotalBalance(accounts)

      return { ...state, transactions, accounts, totalBalance }
    }
    case "DELETE_TRANSACTION": {
      const transactionToDelete = state.transactions.find((t) => t.id === action.payload)
      const transactions = state.transactions.filter((transaction) => transaction.id !== action.payload)

      // Update account balance
      let accounts = [...state.accounts]
      if (transactionToDelete) {
        const balanceChange =
          transactionToDelete.type === "incoming" ? -transactionToDelete.amount : transactionToDelete.amount

        accounts = accounts.map((account) => {
          if (account.id === transactionToDelete.accountId) {
            return { ...account, balance: account.balance + balanceChange }
          }
          return account
        })
      }

      const totalBalance = calculateTotalBalance(accounts)

      return { ...state, transactions, accounts, totalBalance }
    }
    case "ADD_GOAL": {
      const newGoal = { ...action.payload, id: uuidv4() }
      return { ...state, goals: [...state.goals, newGoal] }
    }
    case "UPDATE_GOAL": {
      const goals = state.goals.map((goal) => (goal.id === action.payload.id ? action.payload : goal))
      return { ...state, goals }
    }
    case "DELETE_GOAL": {
      const goals = state.goals.filter((goal) => goal.id !== action.payload)
      return { ...state, goals }
    }
    case "UPDATE_PROFILE": {
      return { ...state, profile: { ...state.profile, ...action.payload } }
    }
    case "LOAD_STATE": {
      return action.payload
    }
    default:
      return state
  }
}

// Helper function to calculate total balance
function calculateTotalBalance(accounts: Account[]): number {
  return accounts.reduce((total, account) => {
    // For debt accounts, subtract from total
    if (account.type === "debt") {
      return total - account.balance
    }
    return total + account.balance
  }, 0)
}

// Create context
type FinanceContextType = {
  state: FinancialState
  dispatch: React.Dispatch<Action>
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

// Provider component
export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState)

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = loadState()
    if (savedState) {
      dispatch({ type: "LOAD_STATE", payload: savedState })
    } else {
      // If no saved state, initialize with sample data
      initializeSampleData()
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveState(state)
  }, [state])

  // Initialize with sample data
  const initializeSampleData = () => {
    // Sample accounts
    const sampleAccounts = [
      {
        title: "Main Savings",
        description: "Personal savings",
        balance: 8459.45,
        type: "savings" as const,
      },
      {
        title: "Checking Account",
        description: "Daily expenses",
        balance: 2850.0,
        type: "checking" as const,
      },
      {
        title: "Investment Portfolio",
        description: "Stock & ETFs",
        balance: 15230.8,
        type: "investment" as const,
      },
      {
        title: "Credit Card",
        description: "Pending charges",
        balance: 1200.0,
        type: "debt" as const,
      },
    ]

    // Add sample accounts
    sampleAccounts.forEach((account) => {
      dispatch({ type: "ADD_ACCOUNT", payload: account })
    })

    // Sample transactions
    const sampleTransactions = [
      {
        title: "Apple Store Purchase",
        amount: 999.0,
        type: "outgoing" as const,
        category: "shopping",
        icon: "ShoppingCart",
        timestamp: new Date().toISOString(),
        status: "completed" as const,
        accountId: "", // Will be set after accounts are created
      },
      {
        title: "Salary Deposit",
        amount: 4500.0,
        type: "incoming" as const,
        category: "income",
        icon: "Wallet",
        timestamp: new Date().toISOString(),
        status: "completed" as const,
        accountId: "", // Will be set after accounts are created
      },
      {
        title: "Netflix Subscription",
        amount: 15.99,
        type: "outgoing" as const,
        category: "entertainment",
        icon: "CreditCard",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        status: "pending" as const,
        accountId: "", // Will be set after accounts are created
      },
    ]

    // Add sample transactions (after a small delay to ensure accounts are created)
    setTimeout(() => {
      const state = loadState()
      if (state && state.accounts.length > 0) {
        sampleTransactions.forEach((transaction, index) => {
          // Assign each transaction to a different account
          const accountIndex = index % state.accounts.length
          dispatch({
            type: "ADD_TRANSACTION",
            payload: {
              ...transaction,
              accountId: state.accounts[accountIndex].id,
            },
          })
        })
      }
    }, 100)

    // Sample goals
    const sampleGoals = [
      {
        title: "Emergency Fund",
        subtitle: "3 months of expenses saved",
        icon: "PiggyBank",
        iconStyle: "savings",
        date: "Target: Dec 2024",
        amount: 15000,
        status: "in-progress" as const,
        progress: 65,
      },
      {
        title: "Stock Portfolio",
        subtitle: "Tech sector investment plan",
        icon: "TrendingUp",
        iconStyle: "investment",
        date: "Target: Jun 2024",
        amount: 50000,
        status: "pending" as const,
        progress: 30,
      },
      {
        title: "Debt Repayment",
        subtitle: "Student loan payoff plan",
        icon: "CreditCard",
        iconStyle: "debt",
        date: "Target: Mar 2025",
        amount: 25000,
        status: "in-progress" as const,
        progress: 45,
      },
    ]

    // Add sample goals
    sampleGoals.forEach((goal) => {
      dispatch({ type: "ADD_GOAL", payload: goal })
    })
  }

  return <FinanceContext.Provider value={{ state, dispatch }}>{children}</FinanceContext.Provider>
}

// Custom hook to use the finance context
export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}

