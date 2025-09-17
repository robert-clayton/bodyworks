"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'

interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.fullName,
        avatarUrl: session.user.avatarUrl,
      })
    } else {
      setUser(null)
    }
  }, [session])

  const handleSignOut = async () => {
    const { signOut } = await import('@/lib/auth-client')
    await signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading: isPending,
        signOut: handleSignOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
