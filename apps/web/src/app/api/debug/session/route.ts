import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import { auth } from '../../../../lib/auth'

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('better-auth.session_token')?.value
    const h = headers()
    const origin = h.get('origin')
    const host = h.get('host')
    const userAgent = h.get('user-agent')

    const session = await auth.api.getSession({
      headers: h as any,
    })

    return NextResponse.json({
      ok: true,
      hasSessionCookie: Boolean(sessionCookie),
      sessionCookiePreview: sessionCookie?.slice(0, 8),
      origin,
      host,
      userAgent,
      session,
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}


