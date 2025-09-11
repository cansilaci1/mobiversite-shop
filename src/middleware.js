import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("session")?.value;
  const { pathname, search } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");

  // korunan rotalarda cookie yoksa:
  if (!session) {
    if (isApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname + (search || ""));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// /profile, /wishlist ve orders API’yı koruyoruz
export const config = {
  matcher: ["/profile/:path*", "/wishlist/:path*", "/api/orders/:path*"],
};
