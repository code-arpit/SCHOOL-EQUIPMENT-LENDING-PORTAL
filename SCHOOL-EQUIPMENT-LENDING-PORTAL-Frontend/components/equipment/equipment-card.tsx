"use client"

import type { Equipment } from "@/lib/data/equipment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface EquipmentCardProps {
  equipment: Equipment
  onBorrow?: (equipment: Equipment) => void
  onEdit?: (equipment: Equipment) => void
  onDelete?: (equipmentId: string) => void
  showActions?: boolean
  showAdminActions?: boolean
}

export function EquipmentCard({
  equipment,
  onBorrow,
  onEdit,
  onDelete,
  showActions = true,
  showAdminActions = false,
}: EquipmentCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      sports: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      lab: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      electronics: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      music: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }
    return colors[category] || colors.other
  }

  const getConditionColor = (condition: string) => {
    const colors: Record<string, string> = {
      excellent: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      good: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      fair: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "needs-repair": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }
    return colors[condition] || colors.good
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative bg-muted">
        <Image
          src={equipment.imageUrl || "/placeholder.svg?height=200&width=300"}
          alt={equipment.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{equipment.name}</CardTitle>
          <Badge className={getCategoryColor(equipment.category)}>{equipment.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{equipment.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Condition:</span>
          <Badge className={getConditionColor(equipment.condition)}>{equipment.condition}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Available:</span>
          <span className="font-medium">
            {equipment.availableQuantity} / {equipment.quantity}
          </span>
        </div>

        {showActions && equipment.availableQuantity > 0 && (
          <Button onClick={() => onBorrow?.(equipment)} className="w-full">
            Request to Borrow
          </Button>
        )}

        {showActions && equipment.availableQuantity === 0 && (
          <Button disabled className="w-full">
            Currently Unavailable
          </Button>
        )}

        {showAdminActions && (
          <div className="flex gap-2">
            <Button onClick={() => onEdit?.(equipment)} variant="outline" className="flex-1">
              Edit
            </Button>
            <Button onClick={() => onDelete?.(equipment.id)} variant="destructive" className="flex-1">
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
