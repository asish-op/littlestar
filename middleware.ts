import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "admin_panel_access";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get(ACCESS_COOKIE)?.value === "granted";
  if (hasAccess) {
    return NextResponse.next();
  }

  const unlockUrl = new URL("/admin-unlock", request.url);
  unlockUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
