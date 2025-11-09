"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { users } from "@/lib/data/users"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserIcon } from "lucide-react"

export default function AdminUsersPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "admin") {
      router.push("/")
      return
    }
    setCurrentUser(user)
  }, [router])

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      staff: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      student: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    }
    return colors[role] || colors.student
  }

  if (!currentUser) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">View all registered users in the system</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Email: </span>
                    <span>{user.email}</span>
                  </div>
                  {user.studentId && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Student ID: </span>
                      <span>{user.studentId}</span>
                    </div>
                  )}
                  {user.department && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Department: </span>
                      <span>{user.department}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
