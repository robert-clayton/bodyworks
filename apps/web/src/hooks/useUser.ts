'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  image?: string | null
  fullName?: string | null
  avatarUrl?: string | null
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface UseUserResult {
  user: User | null
  loading: boolean
  error: string | null
}

/**
 * Hook to fetch user data by user ID
 * Useful for displaying other users' profile information
 */
export function useUser(userId: string | null): UseUserResult {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setUser(null)
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/auth/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.statusText}`)
        }

        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  return { user, loading, error }
}

/**
 * Hook to fetch multiple users by their IDs
 * Useful for displaying multiple users' profiles efficiently
 */
export function useUsers(userIds: string[]): { users: Record<string, User>; loading: boolean; error: string | null } {
  const [users, setUsers] = useState<Record<string, User>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userIds.length === 0) {
      setUsers({})
      setLoading(false)
      return
    }

    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/auth/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIds }),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`)
        }

        const usersData = await response.json()
        
        // Convert array to record with userId as key
        const usersRecord = usersData.reduce((acc: Record<string, User>, user: User) => {
          acc[user.id] = user
          return acc
        }, {})
        
        setUsers(usersRecord)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
        setUsers({})
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [userIds.join(',')])

  return { users, loading, error }
}
