import { auth } from "@/lib/auth"
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

    // Get users data from Better Auth
    // Note: Better Auth might not have a bulk get method, so we'll need to fetch individually
    const users = await Promise.all(
      userIds.map(async (userId: string) => {
        try {
          const user = await auth.api.getUser({ userId })
          if (user) {
            // Return public user information only
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              fullName: user.fullName,
              avatarUrl: user.avatarUrl,
              emailVerified: user.emailVerified,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            }
          }
          return null
        } catch (err) {
          console.warn(`Failed to fetch user ${userId}:`, err)
          return null
        }
      })
    )

    // Filter out null results
    const validUsers = users.filter(user => user !== null)

    return NextResponse.json(validUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
