"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { EquipmentList } from "@/components/equipment/equipment-list"
import { BorrowEquipmentDialog } from "@/components/borrowing/borrow-equipment-dialog"
import type { Equipment } from "@/lib/data/equipment"

export default function StudentBrowsePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "student") {
      router.push("/")
      return
    }
    setUser(currentUser)
  }, [router])

  const handleBorrow = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setDialogOpen(true)
  }

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1)
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Equipment</h1>
            <p className="text-muted-foreground">Find and request equipment for your needs</p>
          </div>

          <EquipmentList key={refreshKey} onBorrow={handleBorrow} showActions={true} />
        </div>
      </main>

      <BorrowEquipmentDialog
        equipment={selectedEquipment}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        userId={user.id}
        onSuccess={handleSuccess}
      />
    </div>
  )
}
