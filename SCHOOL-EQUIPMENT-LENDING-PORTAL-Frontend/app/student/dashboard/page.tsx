"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { FileText, Clock, CheckCircle, Package } from "lucide-react"
import { getRequestsByUser } from "@/lib/data/borrowing"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    completedReturns: 0,
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "student") {
      router.push("/")
      return
    }
    setUser(currentUser)

    const requests = getRequestsByUser(currentUser.id)

    setStats({
      totalRequests: requests.length,
      pendingRequests: requests.filter((req) => req.status === "pending").length,
      approvedRequests: requests.filter((req) => req.status === "approved").length,
      completedReturns: requests.filter((req) => req.status === "returned").length,
    })
  }, [router])

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Manage your equipment borrowing requests</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Requests" value={stats.totalRequests} description="All time" icon={FileText} />
            <StatsCard title="Pending" value={stats.pendingRequests} description="Awaiting approval" icon={Clock} />
            <StatsCard
              title="Active Loans"
              value={stats.approvedRequests}
              description="Currently borrowed"
              icon={CheckCircle}
            />
            <StatsCard title="Completed" value={stats.completedReturns} description="Returned items" icon={Package} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push("/student/browse")}
            >
              <CardHeader>
                <CardTitle>Browse Equipment</CardTitle>
                <CardDescription>View available equipment and make new requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">→</span>
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push("/student/requests")}
            >
              <CardHeader>
                <CardTitle>My Requests</CardTitle>
                <CardDescription>Track your borrowing requests and returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">→</span>
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {stats.pendingRequests > 0 && (
            <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
              <CardHeader>
                <CardTitle className="text-yellow-800 dark:text-yellow-200">Pending Approval</CardTitle>
                <CardDescription>
                  You have {stats.pendingRequests} request{stats.pendingRequests > 1 ? "s" : ""} waiting for staff
                  approval
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
