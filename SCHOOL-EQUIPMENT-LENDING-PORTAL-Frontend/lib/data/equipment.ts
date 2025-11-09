// Mock equipment database
export type EquipmentCategory = "sports" | "lab" | "electronics" | "music" | "other"
export type EquipmentCondition = "excellent" | "good" | "fair" | "needs-repair"

export interface Equipment {
  id: string
  name: string
  category: EquipmentCategory
  condition: EquipmentCondition
  quantity: number
  availableQuantity: number
  description: string
  imageUrl?: string
  addedBy: string
  addedDate: string
}

export const equipment: Equipment[] = [
  {
    id: "eq1",
    name: "Football",
    category: "sports",
    condition: "good",
    quantity: 10,
    availableQuantity: 7,
    description: "Standard size 5 footballs for outdoor games",
    imageUrl: "/football-action.png",
    addedBy: "1",
    addedDate: "2024-01-15",
  },
  {
    id: "eq2",
    name: "Microscope",
    category: "lab",
    condition: "excellent",
    quantity: 5,
    availableQuantity: 3,
    description: "Digital microscope with 1000x magnification",
    imageUrl: "/classic-microscope.png",
    addedBy: "1",
    addedDate: "2024-01-20",
  },
  {
    id: "eq3",
    name: "DSLR Camera",
    category: "electronics",
    condition: "excellent",
    quantity: 3,
    availableQuantity: 2,
    description: "Canon EOS 90D with 18-135mm lens",
    imageUrl: "/dslr-camera.png",
    addedBy: "1",
    addedDate: "2024-02-01",
  },
  {
    id: "eq4",
    name: "Acoustic Guitar",
    category: "music",
    condition: "good",
    quantity: 4,
    availableQuantity: 4,
    description: "Yamaha F310 acoustic guitar for beginners",
    imageUrl: "/acoustic-guitar.png",
    addedBy: "1",
    addedDate: "2024-02-10",
  },
  {
    id: "eq5",
    name: "Basketball",
    category: "sports",
    condition: "excellent",
    quantity: 15,
    availableQuantity: 12,
    description: "Spalding NBA official size basketball",
    imageUrl: "/basketball-action.png",
    addedBy: "1",
    addedDate: "2024-01-18",
  },
  {
    id: "eq6",
    name: "Chemistry Kit",
    category: "lab",
    condition: "good",
    quantity: 8,
    availableQuantity: 5,
    description: "Complete chemistry lab kit with safety equipment",
    imageUrl: "/chemistry-kit.jpg",
    addedBy: "1",
    addedDate: "2024-01-25",
  },
  {
    id: "eq7",
    name: "Projector",
    category: "electronics",
    condition: "excellent",
    quantity: 2,
    availableQuantity: 1,
    description: "Epson PowerLite 1080p HD projector",
    imageUrl: "/home-theater-projector.png",
    addedBy: "1",
    addedDate: "2024-02-05",
  },
  {
    id: "eq8",
    name: "Violin",
    category: "music",
    condition: "good",
    quantity: 3,
    availableQuantity: 2,
    description: "Student violin with bow and case",
    imageUrl: "/solo-violin.png",
    addedBy: "1",
    addedDate: "2024-02-12",
  },
]

export function getAllEquipment(): Equipment[] {
  return equipment
}

export function getEquipmentById(id: string): Equipment | undefined {
  return equipment.find((eq) => eq.id === id)
}

export function addEquipment(data: Omit<Equipment, "id">): Equipment {
  const newEquipment: Equipment = {
    ...data,
    id: `eq${equipment.length + 1}`,
  }
  equipment.push(newEquipment)
  return newEquipment
}

export function updateEquipment(id: string, data: Partial<Equipment>): Equipment | null {
  const index = equipment.findIndex((eq) => eq.id === id)
  if (index !== -1) {
    equipment[index] = { ...equipment[index], ...data }
    return equipment[index]
  }
  return null
}

export function deleteEquipment(id: string): boolean {
  const index = equipment.findIndex((eq) => eq.id === id)
  if (index !== -1) {
    equipment.splice(index, 1)
    return true
  }
  return false
}

export function searchEquipment(query: string): Equipment[] {
  const lowerQuery = query.toLowerCase()
  return equipment.filter(
    (eq) =>
      eq.name.toLowerCase().includes(lowerQuery) ||
      eq.description.toLowerCase().includes(lowerQuery) ||
      eq.category.toLowerCase().includes(lowerQuery),
  )
}

export function filterEquipmentByCategory(category: EquipmentCategory | "all"): Equipment[] {
  if (category === "all") return equipment
  return equipment.filter((eq) => eq.category === category)
}

export function filterByAvailability(availableOnly: boolean): Equipment[] {
  if (!availableOnly) return equipment
  return equipment.filter((eq) => eq.availableQuantity > 0)
}
