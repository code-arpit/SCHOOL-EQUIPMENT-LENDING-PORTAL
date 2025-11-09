"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { FileText, CheckCircle, Clock, Package } from "lucide-react"
import { getAllRequests } from "@/lib/data/borrowing"
import { getAllEquipment } from "@/lib/data/equipment"

export default function StaffDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    pendingRequests: 0,
    approvedRequests: 0,
    totalEquipment: 0,
    availableEquipment: 0,
  })

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "staff") {
      router.push("/")
      return
    }

    const requests = getAllRequests()
    const equipment = getAllEquipment()

    setStats({
      pendingRequests: requests.filter((req) => req.status === "pending").length,
      approvedRequests: requests.filter((req) => req.status === "approved").length,
      totalEquipment: equipment.length,
      availableEquipment: equipment.filter((eq) => eq.availableQuantity > 0).length,
    })
  }, [router])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="staff" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
            <p className="text-muted-foreground">Manage equipment requests and inventory</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Pending Requests"
              value={stats.pendingRequests}
              description="Awaiting review"
              icon={Clock}
            />
            <StatsCard
              title="Approved Loans"
              value={stats.approvedRequests}
              description="Currently active"
              icon={CheckCircle}
            />
            <StatsCard title="Total Equipment" value={stats.totalEquipment} description="In inventory" icon={Package} />
            <StatsCard
              title="Available Items"
              value={stats.availableEquipment}
              description="Ready to lend"
              icon={FileText}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <button
              onClick={() => router.push("/staff/requests")}
              className="text-left p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Review Requests</h3>
              <p className="text-sm text-muted-foreground">Approve or reject pending borrowing requests</p>
              <div className="mt-4 text-2xl font-bold">{stats.pendingRequests} Pending</div>
            </button>

            <button
              onClick={() => router.push("/staff/equipment")}
              className="text-left p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">View Equipment</h3>
              <p className="text-sm text-muted-foreground">Browse all equipment and check availability</p>
              <div className="mt-4 text-2xl font-bold">{stats.availableEquipment} Available</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
