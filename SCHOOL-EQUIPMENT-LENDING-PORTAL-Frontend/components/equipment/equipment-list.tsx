"use client"

import { useState, useEffect } from "react"
import type { Equipment } from "@/lib/data/equipment"
import { EquipmentCard } from "./equipment-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface EquipmentListProps {
  onBorrow?: (equipment: Equipment) => void
  onEdit?: (equipment: Equipment) => void
  onDelete?: (equipmentId: string) => void
  showActions?: boolean
  showAdminActions?: boolean
}

export function EquipmentList({
  onBorrow,
  onEdit,
  onDelete,
  showActions = true,
  showAdminActions = false,
}: EquipmentListProps) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEquipment()
  }, [])

  useEffect(() => {
    filterEquipment()
  }, [equipment, searchTerm, categoryFilter, availabilityFilter])

  const fetchEquipment = async () => {
    try {
      const response = await fetch("/api/equipment")
      const data = await response.json()
      setEquipment(data)
    } catch (error) {
      console.error("[v0] Failed to fetch equipment:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterEquipment = () => {
    let filtered = [...equipment]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (eq) =>
          eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eq.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((eq) => eq.category === categoryFilter)
    }

    // Availability filter
    if (availabilityFilter === "available") {
      filtered = filtered.filter((eq) => eq.availableQuantity > 0)
    } else if (availabilityFilter === "unavailable") {
      filtered = filtered.filter((eq) => eq.availableQuantity === 0)
    }

    setFilteredEquipment(filtered)
  }

  if (loading) {
    return <div className="text-center py-8">Loading equipment...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="lab">Lab Equipment</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="music">Musical Instruments</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredEquipment.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No equipment found matching your criteria</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map((eq) => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              onBorrow={onBorrow}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
              showAdminActions={showAdminActions}
            />
          ))}
        </div>
      )}
    </div>
  )
}
