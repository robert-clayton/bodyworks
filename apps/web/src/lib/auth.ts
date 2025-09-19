import { betterAuth } from "better-auth"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL!,
  }),
  
  emailAndPassword: {
    enabled: true,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  
  user: {
    additionalFields: {
      fullName: {
        type: "string",
        required: false,
      },
      avatarUrl: {
        type: "string", 
        required: false,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // 1 day
  },

  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET!,
  logger: {
    disabled: false,
    level: "debug",
  },
  onAPIError: {
    throw: false,
    onError: (e) => {
      console.error("BetterAuth API error:", e)
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV !== 'development',
    cookieAttributes: {
      path: '/',
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    },
  },
  
  callbacks: {
    async signIn({ user, account }: { user: any; account?: any }) {
      // Update user profile with Google data on each sign-in
      if (account?.providerId === "google" && account.profile) {
        const profile = account.profile as any
        
        console.log("Sign-in - Google profile data:", {
          email: user.email,
          name: profile.name,
          picture: profile.picture,
          currentImage: user.image,
          currentAvatarUrl: user.avatarUrl
        })
        
        // Better Auth automatically sets user.image from Google profile.picture
        // Copy it to avatarUrl for consistency across our app
        if (user.image && user.avatarUrl !== user.image) {
          await auth.api.updateUser({
            body: {
              avatarUrl: user.image,
              fullName: profile.name || user.name,
            },
          })
        }
      }
      return true
    },
    
    async signUp({ user, account }: { user: any; account?: any }) {
      // Set up initial profile with Google data
      if (account?.providerId === "google" && account.profile) {
        const profile = account.profile as any
        
        console.log("Sign-up - Google profile data:", {
          email: user.email,
          name: profile.name,
          picture: profile.picture,
          userImage: user.image
        })
        
        // Better Auth automatically sets user.image from Google profile.picture
        // Copy it to avatarUrl for consistency across our app
        if (user.image) {
          await auth.api.updateUser({
            body: {
              avatarUrl: user.image,
              fullName: profile.name || user.name,
            },
          })
        }
      }
      return true
    },
  },
})

export type Session = typeof auth.$Infer.Session
