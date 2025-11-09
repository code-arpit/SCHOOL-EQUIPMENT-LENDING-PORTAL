"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { EquipmentList } from "@/components/equipment/equipment-list"

export default function StaffEquipmentPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || user.role !== "staff") {
      router.push("/")
      return
    }
  }, [router])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="staff" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Equipment Inventory</h1>
            <p className="text-muted-foreground">View all equipment and availability</p>
          </div>

          <EquipmentList showActions={false} />
        </div>
      </main>
    </div>
  )
}
