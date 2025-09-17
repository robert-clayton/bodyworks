'use client'

import { DockNavigation } from '@/components/DockNavigation'
import { ChevronRight, Dumbbell, Clock, Target } from 'lucide-react'

const workoutPrograms = [
  {
    id: 'ppl',
    name: 'Push/Pull/Legs',
    description: '6-day split focusing on movement patterns',
    days: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
    difficulty: 'Intermediate',
    duration: '45-60 min'
  },
  {
    id: 'upper-lower',
    name: 'Upper/Lower',
    description: '4-day split alternating upper and lower body',
    days: ['Upper', 'Lower', 'Upper', 'Lower'],
    difficulty: 'Beginner',
    duration: '40-50 min'
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: '3-day full body workout routine',
    days: ['Full Body A', 'Full Body B', 'Full Body C'],
    difficulty: 'Beginner',
    duration: '30-45 min'
  }
]

export default function StartPage() {
  return (
    <>
      <main className="px-6 py-8 animate-fade-in">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              Start <span className="text-gradient">Workout</span>
            </h1>
            <p className="text-text-secondary text-lg">
              Choose your workout program and let's get started
            </p>
          </div>

          {/* Quick Start */}
          <div className="card-elevated mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Quick Start</h2>
              <Target className="w-5 h-5 text-primary-400" />
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Continue your last workout or start a custom session
            </p>
            <button className="btn-primary w-full">
              Continue Last Workout
            </button>
          </div>

          {/* Workout Programs */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-text-primary">Workout Programs</h2>
            
            {workoutPrograms.map((program) => (
              <div
                key={program.id}
                className="card hover:scale-[1.02] cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{program.name}</h3>
                      <p className="text-text-secondary text-sm mb-3">{program.description}</p>
                      
                      {/* Program Details */}
                      <div className="flex items-center space-x-4 mb-3 text-xs text-text-muted">
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{program.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{program.duration}</span>
                        </div>
                      </div>
                      
                      {/* Days */}
                      <div className="flex flex-wrap gap-1">
                        {program.days.map((day, index) => (
                          <span
                            key={index}
                            className="text-xs bg-surface-secondary text-text-tertiary px-2 py-1 rounded-lg"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary-400 transition-colors ml-2 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <DockNavigation />
    </>
  )
}
