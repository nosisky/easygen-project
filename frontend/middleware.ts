import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./app/helpers";

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_ROUTES = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const userToken = request.cookies.get("userToken")?.value;

  if (!userToken) {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  const isValidToken = await validateToken(userToken);

  if (!isValidToken.success) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

async function validateToken(token: string): Promise<{ success: boolean }> {
  try {
    const response = await api.get(`/auth/validate-token?token=${token}`);
    const data = await response.data;
    return { success: data.success };
  } catch (error) {
    return { success: false };
  }
}
