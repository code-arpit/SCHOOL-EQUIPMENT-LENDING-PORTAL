// Mock user database
export type UserRole = "student" | "staff" | "admin"

export interface User {
  id: string
  email: string
  password: string // In production, this would be hashed
  name: string
  role: UserRole
  studentId?: string
  department?: string
}

export const users: User[] = [
  {
    id: "1",
    email: "admin@school.edu",
    password: "admin123",
    name: "John Administrator",
    role: "admin",
    department: "Administration",
  },
  {
    id: "2",
    email: "staff@school.edu",
    password: "staff123",
    name: "Sarah Johnson",
    role: "staff",
    department: "Laboratory",
  },
  {
    id: "3",
    email: "student1@school.edu",
    password: "student123",
    name: "Michael Chen",
    role: "student",
    studentId: "STU2024001",
  },
  {
    id: "4",
    email: "student2@school.edu",
    password: "student123",
    name: "Emma Rodriguez",
    role: "student",
    studentId: "STU2024002",
  },
  {
    id: "5",
    email: "staff2@school.edu",
    password: "staff123",
    name: "David Thompson",
    role: "staff",
    department: "Sports Department",
  },
]

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}

export function registerUser(userData: Omit<User, "id">): User {
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
  }
  users.push(newUser)
  return newUser
}
