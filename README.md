# BodyWorks - Workout Tracker

A modern workout tracking webapp with video/image upload, social features, and mobile-first design.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Authentication**: Better Auth with OAuth (Google)
- **Media Storage**: AWS S3 with video encoding
- **UI Components**: Lucide React icons, Framer Motion
- **Package Manager**: Yarn v4 (monorepo setup)

## 🚀 Features

- **Workout Tracking**: Complete workout programs with exercise logging
- **Media Upload**: Video and image upload with automatic compression
- **Social Feed**: Share workouts and progress with friends
- **Mobile-First**: Optimized for phone usage during workouts
- **Dock Navigation**: iOS-style bottom navigation
- **Real-time Sync**: All data synced across devices

## 📱 App Structure

```
- Home: Dashboard and quick actions
- Gallery: Your workout photos and videos
- START: Main workout tracking (featured button)
- Feed: Social feed of friends' workouts
- Profile: User stats and settings
```

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- Supabase CLI
- AWS account (for S3 storage)
- Google OAuth credentials

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repo-url>
   cd bodyworks
   npm install
   cd apps/web && npm install
   ```

2. **Set up Supabase**:
   ```bash
   supabase start
   supabase db reset
   ```

3. **Environment variables**:
   Copy `apps/web/env.example` to `apps/web/.env.local` and fill in:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   # ... other variables
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
bodyworks/
├── apps/
│   └── web/                 # Next.js frontend
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # Reusable components
│       │   ├── lib/         # Utilities and config
│       │   └── types/       # TypeScript types
│       └── public/          # Static assets
├── packages/                # Shared packages (future)
└── supabase/
    ├── config.toml          # Supabase config
    └── migrations/          # Database migrations
```

## 🗄️ Database Schema

- **profiles**: User profiles and settings
- **workout_programs**: Predefined workout programs (PPL, Upper/Lower, etc.)
- **exercises**: Exercise database with instructions and images
- **workouts**: Individual workout sessions
- **workout_exercises**: Sets and reps for each exercise in a workout
- **media**: Photos and videos linked to workout exercises

## 🔄 Workflow Example

1. User opens app → **Home** page
2. Taps **START** → chooses workout program
3. Selects day (e.g., "Push" from Push/Pull/Legs)
4. Goes through exercises one by one:
   - View exercise image/instructions
   - Input sets: reps × weight
   - Add photos/videos of form
   - Move to next exercise
5. Complete workout → data saved to Supabase
6. Media uploaded to S3 with compression
7. Workout appears in **Gallery** and can be shared to **Feed**

## 🎯 Next Steps

- [ ] Implement Better Auth with Google OAuth
- [ ] Build workout flow components
- [ ] Set up AWS S3 and video encoding
- [ ] Add social features and friend system
- [ ] Implement progressive web app (PWA) features
- [ ] Add workout analytics and progress tracking

## 📄 License

MIT License - see LICENSE file for details.
