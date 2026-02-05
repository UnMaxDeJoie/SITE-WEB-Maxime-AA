import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // 1. Check if route is protected
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const session = request.cookies.get('session')?.value;

        // 2. Refresh session if exists
        // await updateSession(request); // Optional: keep simple for now

        // 3. Verify session
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await decrypt(session);
        } catch (e) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};
