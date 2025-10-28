import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)

  // Only fix API routes
  if (url.pathname.startsWith('/api/')) {
    const headers = new Headers(request.headers)
    const token = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return NextResponse.next({
      request: { headers }
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
