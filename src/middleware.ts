import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_panel_access";

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get(COOKIE_NAME)?.value === "granted";

  if (hasAccess) {
    return NextResponse.next();
  }

  const unlockUrl = new URL("/admin-unlock", request.url);
  unlockUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
