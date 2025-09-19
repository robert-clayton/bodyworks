/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['supabase.com', 'amazonaws.com', 'lh3.googleusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

module.exports = nextConfig
