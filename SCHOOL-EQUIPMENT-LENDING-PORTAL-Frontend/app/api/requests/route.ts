import { NextResponse } from "next/server"
import { getAllRequests, createRequest, getRequestsByUser } from "@/lib/data/borrowing"
import { getEquipmentById } from "@/lib/data/equipment"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let requests = userId ? getRequestsByUser(userId) : getAllRequests()

    // Filter by status
    if (status && status !== "all") {
      requests = requests.filter((req) => req.status === status)
    }

    return NextResponse.json(requests)
  } catch (error) {
    console.error("[v0] Requests fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate equipment availability
    const equipment = getEquipmentById(data.equipmentId)
    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 })
    }

    if (equipment.availableQuantity < data.quantity) {
      return NextResponse.json({ error: "Requested quantity not available" }, { status: 400 })
    }

    // Check for overlapping requests
    const existingRequests = getAllRequests()
    const hasOverlap = existingRequests.some((req) => {
      if (req.equipmentId !== data.equipmentId) return false
      if (req.status === "rejected" || req.status === "returned") return false

      const reqStart = new Date(req.startDate)
      const reqEnd = new Date(req.endDate)
      const newStart = new Date(data.startDate)
      const newEnd = new Date(data.endDate)

      return newStart <= reqEnd && newEnd >= reqStart
    })

    if (hasOverlap) {
      return NextResponse.json({ error: "Equipment already booked for the selected dates" }, { status: 409 })
    }

    const newRequest = createRequest({
      equipmentId: data.equipmentId,
      userId: data.userId,
      quantity: data.quantity,
      requestDate: new Date().toISOString().split("T")[0],
      startDate: data.startDate,
      endDate: data.endDate,
      purpose: data.purpose,
      status: "pending",
    })

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error("[v0] Request creation error:", error)
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}
