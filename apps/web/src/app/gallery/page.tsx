'use client'

import { DockNavigation } from '../../components/DockNavigation'
import { Search, Camera, Grid3X3, Play } from 'lucide-react'

const exploreContent = [
  { id: 1, type: 'photo', likes: 145 },
  { id: 2, type: 'video', likes: 89 },
  { id: 3, type: 'photo', likes: 234 },
  { id: 4, type: 'photo', likes: 67 },
  { id: 5, type: 'video', likes: 178 },
  { id: 6, type: 'photo', likes: 92 },
  { id: 7, type: 'photo', likes: 156 },
  { id: 8, type: 'video', likes: 203 },
  { id: 9, type: 'photo', likes: 78 },
]

export default function GalleryPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-background-primary border-b border-surface-border px-4 py-3 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search workouts..."
              className="w-full pl-10 pr-4 py-2 bg-background-secondary rounded-lg text-text-primary placeholder-text-muted text-sm focus:outline-none"
            />
          </div>
        </div>
      </header>

      <main className="pb-20">
        {/* Category Tabs */}
        <div className="flex px-4 py-3 space-x-6 border-b border-surface-border">
          <button className="flex items-center space-x-2 text-text-primary border-b-2 border-text-primary pb-3">
            <Grid3X3 size={16} />
            <span className="text-sm font-medium">Posts</span>
          </button>
          <button className="flex items-center space-x-2 text-text-muted pb-3">
            <Play size={16} />
            <span className="text-sm font-medium">Reels</span>
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-3 gap-1 p-1">
          {exploreContent.length > 0 ? (
            exploreContent.map((item) => (
              <div key={item.id} className="aspect-square bg-surface-secondary relative">
                <div className="absolute inset-0 bg-gradient-to-br from-background-secondary to-surface-secondary flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play size={20} className="text-text-muted" />
                  ) : (
                    <Camera size={20} className="text-text-muted" />
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  {item.type === 'video' && (
                    <Play size={12} className="text-white" fill="white" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 px-4 py-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera size={32} className="text-text-muted" />
                </div>
                <h3 className="text-text-primary font-semibold mb-3">Share Your Progress</h3>
                <p className="text-text-muted text-sm mb-6 px-8">
                  When you share workout photos and videos, they'll appear here.
                </p>
                <button className="btn-primary">
                  Start Your First Workout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Suggested for You */}
        {exploreContent.length > 0 && (
          <div className="px-4 py-6">
            <h2 className="text-text-primary font-semibold mb-4">Suggested for You</h2>
            <div className="space-y-3">
              {['fitness_motivation', 'gym_tips', 'healthy_recipes'].map((username) => (
                <div key={username} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="profile-pic bg-surface-secondary"></div>
                    <div>
                      <div className="text-username">{username}</div>
                      <div className="text-muted">Suggested for you</div>
                    </div>
                  </div>
                  <button className="btn-primary text-sm py-1 px-4">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <DockNavigation />
    </>
  )
}
