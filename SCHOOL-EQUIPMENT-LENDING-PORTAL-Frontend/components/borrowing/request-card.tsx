"use client"

import type { BorrowingRequest } from "@/lib/data/borrowing"
import type { Equipment } from "@/lib/data/equipment"
import type { User } from "@/lib/data/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, UserIcon, Package } from "lucide-react"

interface RequestCardProps {
  request: BorrowingRequest
  equipment?: Equipment
  user?: User
  onApprove?: (requestId: string) => void
  onReject?: (requestId: string) => void
  onMarkReturned?: (requestId: string) => void
  showActions?: boolean
}

export function RequestCard({
  request,
  equipment,
  user,
  onApprove,
  onReject,
  onMarkReturned,
  showActions = false,
}: RequestCardProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      returned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    }
    return colors[status] || colors.pending
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{equipment?.name || "Equipment"}</CardTitle>
          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && (
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span>{user.name}</span>
            {user.studentId && <span className="text-muted-foreground">({user.studentId})</span>}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span>Quantity: {request.quantity}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
          </span>
        </div>

        <div className="text-sm">
          <p className="text-muted-foreground mb-1">Purpose:</p>
          <p className="text-foreground">{request.purpose}</p>
        </div>

        {request.notes && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Notes:</p>
            <p className="text-foreground">{request.notes}</p>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-2">
            {request.status === "pending" && (
              <>
                <Button onClick={() => onApprove?.(request.id)} size="sm" className="flex-1">
                  Approve
                </Button>
                <Button onClick={() => onReject?.(request.id)} variant="destructive" size="sm" className="flex-1">
                  Reject
                </Button>
              </>
            )}
            {request.status === "approved" && (
              <Button onClick={() => onMarkReturned?.(request.id)} size="sm" className="w-full">
                Mark as Returned
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
