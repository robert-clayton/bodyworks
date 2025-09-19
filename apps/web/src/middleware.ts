import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/forgot-password', '/terms', '/privacy', '/cookies']
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))
  
  // Get the session token from cookies
  const token = request.cookies.get('better-auth.session_token')?.value
  
  // Debug logging for redirects and token presence (visible in Vercel logs)
  console.log('[middleware]', JSON.stringify({
    path: pathname,
    isPublicPath,
    hasToken: Boolean(token),
  }))
  
  // If user is on a public path and has a token, redirect to home
  if (isPublicPath && token) {
    console.log('[middleware] redirecting to / from public path with token')
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // If user is not on a public path and doesn't have a token, redirect to login
  if (!isPublicPath && !token) {
    console.log('[middleware] redirecting to /login (no token on non-public path)')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
