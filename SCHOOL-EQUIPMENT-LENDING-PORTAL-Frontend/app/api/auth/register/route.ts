import { NextResponse } from "next/server"
import { findUserByEmail, registerUser } from "@/lib/data/users"
import { generateToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password, name, role, studentId, department } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const newUser = registerUser({
      email,
      password,
      name,
      role,
      ...(studentId && { studentId }),
      ...(department && { department }),
    })

    const token = generateToken(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
