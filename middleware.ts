import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    // this regex checks if it's the exact root pattern with an id e.g., /123
    /^\/[a-zA-Z0-9_-]+$/.test(request.nextUrl.pathname) ||
    /^\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(request.nextUrl.pathname);

  // Exclude some typical unauthenticated routes explicitly 
  const isPublicRoute =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/api/auth");


  if (!session && isProtectedRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
