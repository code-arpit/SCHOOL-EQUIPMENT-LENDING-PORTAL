"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"
import { EquipmentList } from "@/components/equipment/equipment-list"
import { AddEquipmentDialog } from "@/components/equipment/add-equipment-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AdminEquipmentPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/")
      return
    }
    setUser(currentUser)
  }, [router])

  const handleDelete = async (equipmentId: string) => {
    if (!confirm("Are you sure you want to delete this equipment?")) return

    try {
      const response = await fetch(`/api/equipment/${equipmentId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete equipment")

      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      })

      setRefreshKey((prev) => prev + 1)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete equipment",
        variant: "destructive",
      })
    }
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Equipment Management</h1>
              <p className="text-muted-foreground">Manage all equipment in the system</p>
            </div>
            <AddEquipmentDialog userId={user.id} onSuccess={() => setRefreshKey((prev) => prev + 1)} />
          </div>

          <EquipmentList key={refreshKey} showActions={false} showAdminActions={true} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  )
}
