import { NextResponse } from "next/server"
import { getAllEquipment, addEquipment } from "@/lib/data/equipment"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const available = searchParams.get("available")

    let equipmentList = getAllEquipment()

    // Filter by category
    if (category && category !== "all") {
      equipmentList = equipmentList.filter((eq) => eq.category === category)
    }

    // Filter by availability
    if (available === "true") {
      equipmentList = equipmentList.filter((eq) => eq.availableQuantity > 0)
    }

    return NextResponse.json(equipmentList)
  } catch (error) {
    console.error("[v0] Equipment fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch equipment" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const newEquipment = addEquipment({
      name: data.name,
      category: data.category,
      condition: data.condition,
      quantity: data.quantity,
      availableQuantity: data.quantity,
      description: data.description,
      imageUrl: data.imageUrl || "/placeholder.svg?height=200&width=200",
      addedBy: data.addedBy,
      addedDate: new Date().toISOString().split("T")[0],
    })

    return NextResponse.json(newEquipment, { status: 201 })
  } catch (error) {
    console.error("[v0] Equipment creation error:", error)
    return NextResponse.json({ error: "Failed to create equipment" }, { status: 500 })
  }
}
