'use client'

import { DockNavigation } from '@/components/DockNavigation'
import { useAuth } from '@/components/AuthProvider'
import { ProfileImage3XL } from '@/components/ProfileImage'
import { Settings, Trophy, Calendar, TrendingUp, LogOut, ChevronRight } from 'lucide-react'

export default function ProfilePage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <main className="px-6 py-8 animate-fade-in">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              Profile
            </h1>
            <p className="text-text-secondary text-lg">
              Your fitness journey
            </p>
          </div>

          {/* Profile Card */}
          <div className="card-bordered mb-8">
            <div className="flex items-center space-x-6 mb-6">
              <ProfileImage3XL 
                user={user} 
                className="shadow-lg" 
              />
              <div>
                <h2 className="text-xl font-bold text-text-primary">{user?.name || 'User'}</h2>
                <p className="text-text-secondary text-sm">{user?.email}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-accent-success rounded-full mr-2"></div>
                  <span className="text-accent-success text-sm font-medium">Active</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-surface-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-1">0</div>
                <div className="text-sm text-text-muted">Workouts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-success mb-1">0</div>
                <div className="text-sm text-text-muted">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-info mb-1">0</div>
                <div className="text-sm text-text-muted">Friends</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            <button className="w-full card-bordered hover:scale-[1.02] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-success/20 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-accent-success" />
                  </div>
                  <span className="font-semibold text-text-primary">Progress</span>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-400 transition-colors" />
              </div>
            </button>
            
            <button className="w-full card-bordered hover:scale-[1.02] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-warning/20 p-2 rounded-lg">
                    <Trophy className="w-5 h-5 text-accent-warning" />
                  </div>
                  <span className="font-semibold text-text-primary">Achievements</span>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-400 transition-colors" />
              </div>
            </button>
            
            <button className="w-full card-bordered hover:scale-[1.02] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-info/20 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent-info" />
                  </div>
                  <span className="font-semibold text-text-primary">Workout History</span>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-400 transition-colors" />
              </div>
            </button>
            
            <button className="w-full card-bordered hover:scale-[1.02] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-surface-tertiary/50 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-text-muted" />
                  </div>
                  <span className="font-semibold text-text-primary">Settings</span>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-400 transition-colors" />
              </div>
            </button>
            
            <button 
              onClick={handleSignOut}
              className="w-full card-bordered hover:scale-[1.02] group border-accent-error/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-error/20 p-2 rounded-lg">
                    <LogOut className="w-5 h-5 text-accent-error" />
                  </div>
                  <span className="font-semibold text-accent-error">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5 text-accent-error/60 group-hover:text-accent-error transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </main>

      <DockNavigation />
    </>
  )
}
