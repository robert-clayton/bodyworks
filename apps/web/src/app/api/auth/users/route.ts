import { auth } from "../../../../lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userIds } = await request.json()

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "User IDs array is required" }, { status: 400 })
    }

    // Limit to prevent abuse
    if (userIds.length > 100) {
      return NextResponse.json({ error: "Too many user IDs requested" }, { status: 400 })
    }

    // Better Auth API doesn't expose a generic getUser endpoint server-side.
    // For now, only return the current session user if requested.
    const filtered = userIds.includes(session.user.id) ? [session.user] : []

    const publicUsers = filtered.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))

    return NextResponse.json(publicUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
