import { type NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
    const { nextUrl, cookies } = request

    const session = cookies.get('session')?.value
    const isValidSession = !!session && session.length > 0
    const { pathname } = nextUrl

    const isAuthPage = pathname.startsWith('/auth')

    if (pathname === '/' && isValidSession) {
        return NextResponse.redirect(new URL('/memorials', request.url))
    }

    if (isAuthPage) {
        if (isValidSession) {
            return NextResponse.redirect(new URL('/memorials', request.url))
        }
        return NextResponse.next()
    }

    if (!isValidSession) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/memorials', '/auth/:path*', '/dashboard/:path*']
}