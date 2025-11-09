import { NextResponse } from "next/server"
import { getEquipmentById, updateEquipment, deleteEquipment } from "@/lib/data/equipment"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const equipment = getEquipmentById(params.id)

    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 })
    }

    return NextResponse.json(equipment)
  } catch (error) {
    console.error("[v0] Equipment fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch equipment" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const updatedEquipment = updateEquipment(params.id, data)

    if (!updatedEquipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 })
    }

    return NextResponse.json(updatedEquipment)
  } catch (error) {
    console.error("[v0] Equipment update error:", error)
    return NextResponse.json({ error: "Failed to update equipment" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = deleteEquipment(params.id)

    if (!success) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Equipment deleted successfully" })
  } catch (error) {
    console.error("[v0] Equipment deletion error:", error)
    return NextResponse.json({ error: "Failed to delete equipment" }, { status: 500 })
  }
}
