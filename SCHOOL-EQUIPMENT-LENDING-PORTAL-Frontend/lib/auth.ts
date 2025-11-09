// Simple token-based authentication utility
import type { User } from "./data/users"

const TOKEN_KEY = "auth_token"
const USER_KEY = "current_user"

export function generateToken(user: User): string {
  // In production, use JWT or similar
  return btoa(JSON.stringify({ id: user.id, email: user.email, timestamp: Date.now() }))
}

export function saveAuthData(user: User, token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem(USER_KEY)
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
  }
  return null
}

export function clearAuthData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}
