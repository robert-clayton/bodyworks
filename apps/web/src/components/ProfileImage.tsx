'use client'

import Image from 'next/image'
import { useState } from 'react'
import { User } from 'lucide-react'
import { useUser } from '../hooks/useUser'

interface ProfileImageProps {
  /** User object containing image, name, and email */
  user?: {
    image?: string | null
    name?: string | null
    email?: string | null
  } | null
  /** User ID to fetch user data automatically (alternative to user prop) */
  userId?: string | null
  /** Size of the profile image in pixels */
  size?: number
  /** Additional CSS classes */
  className?: string
  /** Whether to show a ring when active/selected */
  showActiveRing?: boolean
  /** Custom fallback icon */
  fallbackIcon?: React.ReactNode
  /** Custom fallback background */
  fallbackBg?: string
}

export function ProfileImage({ 
  user, 
  userId,
  size = 32, 
  className = "",
  showActiveRing = false,
  fallbackIcon,
  fallbackBg = "bg-gradient-to-br from-primary-500 to-primary-600"
}: ProfileImageProps) {
  const [imageError, setImageError] = useState(false)
  
  // Fetch user data if userId is provided but user is not
  const { user: fetchedUser, loading } = useUser(userId && !user ? userId : null)
  
  // Use provided user or fetched user
  const displayUser = user || fetchedUser

  // Generate initials from name or email
  const getInitials = () => {
    if (displayUser?.name) {
      return displayUser.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (displayUser?.email) {
      return displayUser.email[0].toUpperCase()
    }
    return loading ? '...' : 'U'
  }

  const initials = getInitials()
  
  // Determine if we should show the image
  const imageUrl = displayUser?.image
  const shouldShowImage = imageUrl && !imageError
  
  return (
    <div 
      className={`
        relative rounded-full overflow-hidden flex-shrink-0
        ${showActiveRing ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-background-primary' : ''}
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      {shouldShowImage ? (
        <Image
          src={imageUrl}
          alt={displayUser.name || displayUser.email || 'Profile'}
          width={size}
          height={size}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          priority={size > 40} // Prioritize larger images
        />
      ) : (
        <div className={`w-full h-full ${fallbackBg} flex items-center justify-center`}>
          {fallbackIcon ? (
            fallbackIcon
          ) : size >= 24 ? (
            <span 
              className="font-bold text-white drop-shadow-sm"
              style={{ fontSize: Math.max(size / 3, 8) }}
            >
              {initials}
            </span>
          ) : (
            <User size={Math.max(size / 2, 8)} className="text-white" />
          )}
        </div>
      )}
    </div>
  )
}

// Preset size variants for common use cases
export const ProfileImageSizes = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
  '2xl': 64,
  '3xl': 80,
  '4xl': 96,
} as const

// Common preset components
export function ProfileImageXS(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes.xs} />
}

export function ProfileImageSM(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes.sm} />
}

export function ProfileImageMD(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes.md} />
}

export function ProfileImageLG(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes.lg} />
}

export function ProfileImageXL(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes.xl} />
}

export function ProfileImage2XL(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes['2xl']} />
}

export function ProfileImage3XL(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes['3xl']} />
}

export function ProfileImage4XL(props: Omit<ProfileImageProps, 'size'>) {
  return <ProfileImage {...props} size={ProfileImageSizes['4xl']} />
}
