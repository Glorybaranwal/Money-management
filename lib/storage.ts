import type { FinancialState } from "./types"

const STORAGE_KEY = "finance_dashboard_state"

// Load state from localStorage
export function loadState(): FinancialState | undefined {
  if (typeof window === "undefined") {
    return undefined
  }

  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}

// Save state to localStorage
export function saveState(state: FinancialState): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (err) {
    console.error("Error saving state to localStorage:", err)
  }
}

// Clear state from localStorage
export function clearState(): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error("Error clearing state from localStorage:", err)
  }
}

