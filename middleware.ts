import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  if (accessToken) {
    try {
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
      );
    } catch {}
  } else {
    return NextResponse.redirect(new URL("/api/auth/refresh", req.url));
  }

}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)",
  ],
};
