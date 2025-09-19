"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from '../lib/auth-client'

interface User {
  id: string
  email: string
  name: string
  image?: string
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
        name: session.user.name,
        image: session.user.image ?? undefined
      })
    } else {
      setUser(null)
    }
  }, [session])

  const handleSignOut = async () => {
    try {
      const { signOut } = await import('@/lib/auth-client')
      const result = await signOut()
      console.log('Sign out result:', result)
      setUser(null)
      // Redirect to login after successful sign out
      window.location.href = '/login'
    } catch (error) {
      console.error('Sign out error:', error)
      // Force redirect even if sign out fails - clear local state anyway
      setUser(null)
      window.location.href = '/login'
    }
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
