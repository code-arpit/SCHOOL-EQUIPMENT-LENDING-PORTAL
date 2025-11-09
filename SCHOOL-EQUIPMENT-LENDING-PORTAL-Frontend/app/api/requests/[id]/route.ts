import { NextResponse } from "next/server"
import { getRequestById, updateRequestStatus } from "@/lib/data/borrowing"
import { getEquipmentById, updateEquipment } from "@/lib/data/equipment"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const borrowRequest = getRequestById(params.id)

    if (!borrowRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    return NextResponse.json(borrowRequest)
  } catch (error) {
    console.error("[v0] Request fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch request" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status, approvedBy, notes } = await request.json()

    const borrowRequest = getRequestById(params.id)
    if (!borrowRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    // Update equipment availability
    const equipment = getEquipmentById(borrowRequest.equipmentId)
    if (equipment) {
      if (status === "approved" && borrowRequest.status === "pending") {
        // Decrease available quantity when approved
        updateEquipment(equipment.id, {
          availableQuantity: equipment.availableQuantity - borrowRequest.quantity,
        })
      } else if (status === "returned" && borrowRequest.status === "approved") {
        // Increase available quantity when returned
        updateEquipment(equipment.id, {
          availableQuantity: equipment.availableQuantity + borrowRequest.quantity,
        })
      } else if (status === "rejected" && borrowRequest.status === "approved") {
        // Return quantity if previously approved request is rejected
        updateEquipment(equipment.id, {
          availableQuantity: equipment.availableQuantity + borrowRequest.quantity,
        })
      }
    }

    const updatedRequest = updateRequestStatus(params.id, status, approvedBy, notes)

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error("[v0] Request update error:", error)
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }
}
