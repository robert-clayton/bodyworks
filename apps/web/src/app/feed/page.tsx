'use client'

import { DockNavigation } from '../../components/DockNavigation'
import { Users, Heart, MessageCircle, Share, UserPlus } from 'lucide-react'

export default function FeedPage() {
  return (
    <>
      <main className="px-6 py-8 animate-fade-in">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              <span className="text-gradient">Feed</span>
            </h1>
            <p className="text-text-secondary text-lg">
              See what your friends are up to
            </p>
          </div>

          {/* Empty State */}
          <div className="card-elevated text-center">
            <div className="bg-gradient-to-br from-accent-info/20 to-primary-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-accent-info" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">No posts yet</h3>
            <p className="text-text-secondary mb-6">
              Connect with friends to see their workout progress and achievements
            </p>
            <div className="space-y-3">
              <button className="btn-primary w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Find Friends
              </button>
              <button className="btn-secondary w-full">
                <Share className="w-4 h-4 mr-2" />
                Share Your First Workout
              </button>
            </div>
          </div>

          {/* Future: Feed Posts */}
          {/* This will show friend's workout posts with likes, comments, etc. */}
        </div>
      </main>

      <DockNavigation />
    </>
  )
}
