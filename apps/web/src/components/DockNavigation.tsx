'use client'

import { Home, Search, PlusSquare, Heart, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { ProfileImageSM } from './ProfileImage'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/gallery', icon: Search, label: 'Search' },
  { href: '/start', icon: PlusSquare, label: 'Create', isMain: true },
  { href: '/feed', icon: Heart, label: 'Activity' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function DockNavigation() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <nav className="dock-nav">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map(({ href, icon: Icon, label, isMain }) => {
          const isActive = pathname === href
          const isProfileTab = href === '/profile'
          
          return (
            <Link
              key={href}
              href={href}
              className={`
                nav-item flex-1 max-w-[4rem]
                ${isActive && !isMain ? 'nav-item-active' : 'text-text-muted'}
              `}
            >
              {isMain ? (
                <div className="nav-item-main">
                  <Icon size={24} strokeWidth={2} />
                </div>
              ) : isProfileTab ? (
                <ProfileImageSM 
                  user={user} 
                  showActiveRing={isActive}
                  fallbackIcon={<User size={12} className="text-white" />}
                />
              ) : (
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 1.5}
                  fill={isActive ? 'currentColor' : 'none'}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
