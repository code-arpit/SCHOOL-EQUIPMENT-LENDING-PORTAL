"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Package, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllEquipment } from "@/lib/data/equipment"
import { getAllRequests } from "@/lib/data/borrowing"

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalEquipment: 0,
    availableEquipment: 0,
    pendingRequests: 0,
    activeLoans: 0,
    completedReturns: 0,
  })

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "admin") {
      router.push("/")
      return
    }

    // Calculate stats
    const equipment = getAllEquipment()
    const requests = getAllRequests()

    setStats({
      totalEquipment: equipment.length,
      availableEquipment: equipment.filter((eq) => eq.availableQuantity > 0).length,
      pendingRequests: requests.filter((req) => req.status === "pending").length,
      activeLoans: requests.filter((req) => req.status === "approved").length,
      completedReturns: requests.filter((req) => req.status === "returned").length,
    })
  }, [router])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of equipment lending system</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Equipment"
              value={stats.totalEquipment}
              description="Items in inventory"
              icon={Package}
            />
            <StatsCard
              title="Available"
              value={stats.availableEquipment}
              description="Ready to lend"
              icon={CheckCircle}
            />
            <StatsCard
              title="Pending Requests"
              value={stats.pendingRequests}
              description="Awaiting approval"
              icon={Clock}
            />
            <StatsCard
              title="Active Loans"
              value={stats.activeLoans}
              description="Currently borrowed"
              icon={TrendingUp}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => router.push("/admin/equipment")}
                  className="w-full text-left px-4 py-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                >
                  <p className="font-medium">Manage Equipment</p>
                  <p className="text-sm text-muted-foreground">Add, edit, or remove items</p>
                </button>
                <button
                  onClick={() => router.push("/admin/requests")}
                  className="w-full text-left px-4 py-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                >
                  <p className="font-medium">Review Requests</p>
                  <p className="text-sm text-muted-foreground">Approve or reject borrowing requests</p>
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Statistics</CardTitle>
                <CardDescription>Overall performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed Returns</span>
                  <span className="text-2xl font-bold">{stats.completedReturns}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Utilization Rate</span>
                  <span className="text-2xl font-bold">
                    {stats.totalEquipment > 0
                      ? Math.round(((stats.totalEquipment - stats.availableEquipment) / stats.totalEquipment) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
