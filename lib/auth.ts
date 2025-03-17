// Simple front-end authentication system
export interface User {
  id: string
  email: string
  name: string
  password: string // In a real app, never store plain passwords
}

const AUTH_KEY = "finance_dashboard_auth"
const USERS_KEY = "finance_dashboard_users"

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const authData = localStorage.getItem(AUTH_KEY)
    if (!authData) return null

    return JSON.parse(authData)
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Get all users
export function getUsers(): User[] {
  if (typeof window === "undefined") return []

  try {
    const usersData = localStorage.getItem(USERS_KEY)
    if (!usersData) return []

    return JSON.parse(usersData)
  } catch (error) {
    console.error("Error getting users:", error)
    return []
  }
}

// Register a new user
export function registerUser(user: Omit<User, "id">): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: false, message: "Cannot register user on server" }

  try {
    const users = getUsers()

    // Check if email already exists
    if (users.some((u) => u.email === user.email)) {
      return { success: false, message: "Email already in use" }
    }

    // Create new user with ID
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
    }

    // Save to users list
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))

    // Auto login
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser))

    return { success: true, message: "Registration successful" }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, message: "Registration failed" }
  }
}

// Login user
export function loginUser(email: string, password: string): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: false, message: "Cannot login on server" }

  try {
    const users = getUsers()
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    // Save to auth
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, message: "Login failed" }
  }
}

// Logout user
export function logoutUser(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(AUTH_KEY)
  } catch (error) {
    console.error("Error logging out:", error)
  }
}

// Update user profile
export function updateUserProfile(
  userId: string,
  updates: Partial<Omit<User, "id" | "password">>,
): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: false, message: "Cannot update profile on server" }

  try {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, message: "User not found" }
    }

    // Update user
    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser

    // Save updated users list
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Update current user if it's the same
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser))
    }

    return { success: true, message: "Profile updated successfully" }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, message: "Profile update failed" }
  }
}

// Update user password
export function updateUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: false, message: "Cannot update password on server" }

  try {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return { success: false, message: "User not found" }
    }

    // Verify current password
    if (users[userIndex].password !== currentPassword) {
      return { success: false, message: "Current password is incorrect" }
    }

    // Update password
    users[userIndex].password = newPassword

    // Save updated users list
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Update current user if it's the same
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(users[userIndex]))
    }

    return { success: true, message: "Password updated successfully" }
  } catch (error) {
    console.error("Error updating password:", error)
    return { success: false, message: "Password update failed" }
  }
}

