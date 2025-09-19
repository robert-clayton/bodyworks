'use client'

import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import appIcon from 'public/icon.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await signIn.email({
        email,
        password,
      })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signIn.social({
        provider: 'google',
      })
    } catch (error) {
      console.error('Google sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-sm mx-auto w-full">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
              <Image
                src={appIcon}
                alt="BodyWorks app icon"
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
                unoptimized
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">BodyWorks</h1>
            <p className="text-text-muted text-sm">Sign up to see photos and videos from your friends.</p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full btn-primary mb-4 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-surface-border"></div>
            <span className="px-4 text-text-muted text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-surface-border"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Phone number, username, or email"
                className="input-field pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full btn-primary"
            >
              {loading ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-6">
            <Link href="/forgot-password" className="text-accent-blue text-sm">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="border-t border-surface-border p-6">
        <div className="text-center">
          <span className="text-text-muted text-sm">Don't have an account? </span>
          <Link href="/signup" className="text-accent-blue text-sm font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
