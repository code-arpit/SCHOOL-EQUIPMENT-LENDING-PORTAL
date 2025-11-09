"use client"

import { useState, useEffect } from "react"
import type { BorrowingRequest } from "@/lib/data/borrowing"
import type { Equipment } from "@/lib/data/equipment"
import type { User } from "@/lib/data/users"
import { RequestCard } from "./request-card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface RequestsListProps {
  userId?: string
  showActions?: boolean
}

export function RequestsList({ userId, showActions = false }: RequestsListProps) {
  const [requests, setRequests] = useState<BorrowingRequest[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [userId])

  const fetchData = async () => {
    try {
      const [requestsRes, equipmentRes] = await Promise.all([
        fetch(`/api/requests${userId ? `?userId=${userId}` : ""}`),
        fetch("/api/equipment"),
      ])

      const requestsData = await requestsRes.json()
      const equipmentData = await equipmentRes.json()

      setRequests(requestsData)
      setEquipment(equipmentData)
    } catch (error) {
      console.error("[v0] Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (requestId: string) => {
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", approvedBy: userId }),
      })

      if (!response.ok) throw new Error("Failed to approve request")

      toast({
        title: "Success",
        description: "Request approved successfully",
      })

      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", approvedBy: userId }),
      })

      if (!response.ok) throw new Error("Failed to reject request")

      toast({
        title: "Success",
        description: "Request rejected",
      })

      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request",
        variant: "destructive",
      })
    }
  }

  const handleMarkReturned = async (requestId: string) => {
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "returned" }),
      })

      if (!response.ok) throw new Error("Failed to mark as returned")

      toast({
        title: "Success",
        description: "Equipment marked as returned",
      })

      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request",
        variant: "destructive",
      })
    }
  }

  const filteredRequests = statusFilter === "all" ? requests : requests.filter((req) => req.status === statusFilter)

  if (loading) {
    return <div className="text-center py-8">Loading requests...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Label htmlFor="status">Filter by Status:</Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Requests</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No requests found</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              equipment={equipment.find((eq) => eq.id === request.equipmentId)}
              onApprove={handleApprove}
              onReject={handleReject}
              onMarkReturned={handleMarkReturned}
              showActions={showActions}
            />
          ))}
        </div>
      )}
    </div>
  )
}
