// Generated types for Supabase database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_programs: {
        Row: {
          id: string
          name: string
          description: string | null
          days: string[]
          created_by: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          days: string[]
          created_by: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          days?: string[]
          created_by?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      exercises: {
        Row: {
          id: string
          name: string
          description: string | null
          muscle_groups: string[]
          equipment: string | null
          instructions: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          muscle_groups: string[]
          equipment?: string | null
          instructions?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          muscle_groups?: string[]
          equipment?: string | null
          instructions?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string
          program_id: string | null
          day_name: string | null
          started_at: string
          completed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          program_id?: string | null
          day_name?: string | null
          started_at?: string
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string | null
          day_name?: string | null
          started_at?: string
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workout_exercises: {
        Row: {
          id: string
          workout_id: string
          exercise_id: string
          order_index: number
          sets: Json[]
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          exercise_id: string
          order_index: number
          sets?: Json[]
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          exercise_id?: string
          order_index?: number
          sets?: Json[]
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          user_id: string
          workout_exercise_id: string | null
          type: 'image' | 'video'
          url: string
          thumbnail_url: string | null
          file_size: number | null
          duration: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workout_exercise_id?: string | null
          type: 'image' | 'video'
          url: string
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workout_exercise_id?: string | null
          type?: 'image' | 'video'
          url?: string
          thumbnail_url?: string | null
          file_size?: number | null
          duration?: number | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type WorkoutProgram = Database['public']['Tables']['workout_programs']['Row']
export type Exercise = Database['public']['Tables']['exercises']['Row']
export type Workout = Database['public']['Tables']['workouts']['Row']
export type WorkoutExercise = Database['public']['Tables']['workout_exercises']['Row']
export type Media = Database['public']['Tables']['media']['Row']

export type WorkoutSet = {
  reps: number
  weight: number
  completed: boolean
  rest_time?: number
}
