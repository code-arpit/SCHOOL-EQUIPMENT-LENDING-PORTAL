// Mock borrowing requests database
export type RequestStatus = "pending" | "approved" | "rejected" | "returned"

export interface BorrowingRequest {
  id: string
  equipmentId: string
  userId: string
  quantity: number
  requestDate: string
  startDate: string
  endDate: string
  purpose: string
  status: RequestStatus
  approvedBy?: string
  approvedDate?: string
  returnedDate?: string
  notes?: string
}

export const borrowingRequests: BorrowingRequest[] = [
  {
    id: "req1",
    equipmentId: "eq1",
    userId: "3",
    quantity: 2,
    requestDate: "2024-03-01",
    startDate: "2024-03-05",
    endDate: "2024-03-10",
    purpose: "Inter-school football tournament practice",
    status: "approved",
    approvedBy: "2",
    approvedDate: "2024-03-02",
  },
  {
    id: "req2",
    equipmentId: "eq2",
    userId: "4",
    quantity: 1,
    requestDate: "2024-03-03",
    startDate: "2024-03-07",
    endDate: "2024-03-14",
    purpose: "Biology project on cell structures",
    status: "approved",
    approvedBy: "2",
    approvedDate: "2024-03-04",
  },
  {
    id: "req3",
    equipmentId: "eq3",
    userId: "3",
    quantity: 1,
    requestDate: "2024-03-05",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    purpose: "School event photography",
    status: "pending",
  },
  {
    id: "req4",
    equipmentId: "eq6",
    userId: "4",
    quantity: 2,
    requestDate: "2024-03-06",
    startDate: "2024-03-12",
    endDate: "2024-03-19",
    purpose: "Chemistry experiment for science fair",
    status: "pending",
  },
  {
    id: "req5",
    equipmentId: "eq1",
    userId: "3",
    quantity: 1,
    requestDate: "2024-02-20",
    startDate: "2024-02-22",
    endDate: "2024-02-28",
    purpose: "PE class demonstration",
    status: "returned",
    approvedBy: "2",
    approvedDate: "2024-02-21",
    returnedDate: "2024-02-28",
  },
]

export function getAllRequests(): BorrowingRequest[] {
  return borrowingRequests
}

export function getRequestsByUser(userId: string): BorrowingRequest[] {
  return borrowingRequests.filter((req) => req.userId === userId)
}

export function getRequestById(id: string): BorrowingRequest | undefined {
  return borrowingRequests.find((req) => req.id === id)
}

export function createRequest(data: Omit<BorrowingRequest, "id">): BorrowingRequest {
  const newRequest: BorrowingRequest = {
    ...data,
    id: `req${borrowingRequests.length + 1}`,
  }
  borrowingRequests.push(newRequest)
  return newRequest
}

export function updateRequestStatus(
  id: string,
  status: RequestStatus,
  approvedBy?: string,
  notes?: string,
): BorrowingRequest | null {
  const index = borrowingRequests.findIndex((req) => req.id === id)
  if (index !== -1) {
    borrowingRequests[index] = {
      ...borrowingRequests[index],
      status,
      ...(approvedBy && { approvedBy, approvedDate: new Date().toISOString().split("T")[0] }),
      ...(status === "returned" && { returnedDate: new Date().toISOString().split("T")[0] }),
      ...(notes && { notes }),
    }
    return borrowingRequests[index]
  }
  return null
}
