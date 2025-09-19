'use client'

import { DockNavigation } from '@/components/DockNavigation'
import { useAuth } from '@/components/AuthProvider'
import { ProfileImageMD } from '@/components/ProfileImage'
import { MessageCircle, Bookmark, MoreHorizontal, Dumbbell, TrendingUp, Heart, Share } from 'lucide-react'

const stories = [
  { id: 1, username: 'Your Story', hasStory: false },
  { id: 2, username: 'alex_fit', hasStory: true },
  { id: 3, username: 'sarah_gym', hasStory: true },
  { id: 4, username: 'mike_lifts', hasStory: true },
  { id: 5, username: 'emma_runs', hasStory: true },
]

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Dumbbell size={24} className="text-white" />
          </div>
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-background-primary border-b border-surface-border px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-text-primary">BodyWorks</h1>
          <div className="flex items-center space-x-4">
            <MessageCircle size={24} className="text-text-primary" />
          </div>
        </div>
      </header>

      <main className="pb-20">
        {/* Stories */}
        <div className="p-4 border-b border-surface-border">
          <div className="flex space-x-4 overflow-x-auto">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center space-y-1 min-w-0">
                <div className={`story-circle ${!story.hasStory ? 'border-surface-border' : ''}`}>
                  {story.username === 'Your Story' ? (
                    <ProfileImageMD 
                      user={user}
                      className="w-full h-full"
                      fallbackIcon={<div className="text-text-muted text-2xl">+</div>}
                      fallbackBg="bg-gradient-to-br from-surface-secondary to-surface-tertiary"
                    />
                  ) : (
                    <ProfileImageMD 
                      user={{ fullName: story.username }}
                      className="w-full h-full"
                      fallbackBg="bg-gradient-to-br from-surface-secondary to-surface-tertiary"
                    />
                  )}
                </div>
                <span className="text-muted text-xs truncate w-16 text-center">
                  {story.username}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-0">
          {/* Empty State Post */}
          <div className="post-card">
            <div className="post-header">
              <div className="flex items-center space-x-3">
                <ProfileImageMD 
                  user={user} 
                  fallbackIcon={<Dumbbell size={16} className="text-white" />}
                />
                <div>
                  <div className="text-username">{user?.fullName || user?.name || 'BodyWorks'}</div>
                  <div className="text-muted">Welcome!</div>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-text-muted" />
            </div>

            {/* Post Image/Content */}
            <div className="aspect-square bg-gradient-to-br from-background-secondary to-surface-secondary flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={32} className="text-primary-500" />
                </div>
                <h3 className="text-text-primary font-semibold mb-2">Start Your Fitness Journey</h3>
                <p className="text-text-muted text-sm px-8">
                  Track workouts, share progress, and connect with friends
                </p>
              </div>
            </div>

            <div className="post-actions">
              <div className="flex items-center space-x-4">
                <button className="icon-btn">
                  <Heart size={24} className="text-text-muted" />
                </button>
                <button className="icon-btn">
                  <MessageCircle size={24} className="text-text-muted" />
                </button>
                <button className="icon-btn">
                  <Share size={24} className="text-text-muted" />
                </button>
              </div>
              <button className="icon-btn">
                <Bookmark size={24} className="text-text-muted" />
              </button>
            </div>

            <div className="post-content">
              <div className="text-caption mb-2">
                <span className="text-username">bodyworks</span> Ready to transform your fitness routine? 
                Start your first workout today! 💪
              </div>
              <div className="text-muted">2 hours ago</div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-background-secondary p-6">
            <div className="space-y-4">
              <button className="w-full btn-primary flex items-center justify-center">
                <Dumbbell className="w-5 h-5 mr-2" />
                Start Your First Workout
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-secondary text-sm py-2">
                  Browse Programs
                </button>
                <button className="btn-secondary text-sm py-2">
                  Find Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DockNavigation />
    </>
  )
}