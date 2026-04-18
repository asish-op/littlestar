import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const hasAccess = request.cookies.get('admin_panel_access')?.value === 'granted';

    if (!hasAccess) {
      const unlockUrl = new URL('/admin-unlock', request.url);
      unlockUrl.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(unlockUrl);
    }

    return NextResponse.next();
  } catch {
    // Never break request flow due to middleware runtime issues.
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
