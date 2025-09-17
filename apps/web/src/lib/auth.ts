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

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,
  
  callbacks: {
    async signIn({ user, account }) {
      // Custom sign-in logic if needed
      return true
    },
    
    async signUp({ user }) {
      // Custom sign-up logic - create profile in Supabase
      console.log("User signed up:", user.email)
      return true
    },
  },
})

export type Session = typeof auth.$Infer.Session
