export interface Account {
  id: string
  title: string
  description?: string
  balance: number
  type: "savings" | "checking" | "investment" | "debt"
}

export interface Transaction {
  id: string
  title: string
  amount: number
  type: "incoming" | "outgoing"
  category: string
  icon: string
  timestamp: string
  status: "completed" | "pending" | "failed"
  accountId: string
}

export interface FinancialGoal {
  id: string
  title: string
  subtitle: string
  icon: string
  iconStyle: string
  date: string
  amount?: number
  status: "pending" | "in-progress" | "completed"
  progress?: number
}

export interface UserProfile {
  name: string
  role: string
  avatar: string
  subscription: string
}

export interface FinancialState {
  accounts: Account[]
  transactions: Transaction[]
  goals: FinancialGoal[]
  profile: UserProfile
  totalBalance: number
}

