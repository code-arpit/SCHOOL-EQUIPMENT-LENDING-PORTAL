"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { RequestsList } from "@/components/borrowing/requests-list"

export default function StudentRequestsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "student") {
      router.push("/")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
            <p className="text-muted-foreground">Track your borrowing requests and returns</p>
          </div>

          <RequestsList userId={user.id} showActions={false} />
        </div>
      </main>
    </div>
  )
}
