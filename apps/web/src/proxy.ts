import { type NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
    const { nextUrl, cookies } = request

    const session = cookies.get('session')?.value
    const isValidSession = !!session && session.length > 0
    const { pathname } = nextUrl

    const isAuthPage = pathname.startsWith('/auth')

    if (isAuthPage) {
        if (isValidSession) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    }

    if (!isValidSession) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
}

export const config = {
    matcher: ['/auth/:path*', '/dashboard/:path*']
}