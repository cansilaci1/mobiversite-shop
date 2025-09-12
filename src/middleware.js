import { NextResponse } from "next/server";

export function middleware(req) {
  const raw = req.cookies.get("session")?.value;
  const { pathname, search } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");
  const isOptions = req.method === "OPTIONS";

  // CORS preflight vs.
  if (isApi && isOptions) return NextResponse.next();

  // session doğrulama
  let valid = false;
  try {
    const s = JSON.parse(raw || "{}");
    valid = !!s?.id; // id varsa oturum geçerli say
  } catch { valid = false; }

  if (!valid) {
    if (isApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname + (search || ""));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/wishlist/:path*", "/api/orders/:path*"],
};
