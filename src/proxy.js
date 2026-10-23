import { NextResponse } from "next/server";

function expiresSoon(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const parsed = JSON.parse(atob(payload));
    return !parsed.exp || parsed.exp * 1000 < Date.now() + 60000;
  } catch { return true; }
}

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") return NextResponse.next();
  const access = request.cookies.get("portfolio_access_token")?.value;
  const refresh = request.cookies.get("portfolio_refresh_token")?.value;
  if (!access) return NextResponse.redirect(new URL("/admin/login", request.url));
  if (!expiresSoon(access)) return NextResponse.next();
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!refresh || !baseUrl || !anonKey) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    redirect.cookies.delete("portfolio_access_token");
    redirect.cookies.delete("portfolio_refresh_token");
    return redirect;
  }
  try {
    const refreshed = await fetch(baseUrl.replace(/\/$/, "") + "/auth/v1/token?grant_type=refresh_token", {
      method: "POST", headers: { apikey: anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }), cache: "no-store"
    });
    if (!refreshed.ok) throw new Error("Refresh failed");
    const session = await refreshed.json();
    const response = NextResponse.next();
    const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" };
    response.cookies.set("portfolio_access_token", session.access_token, { ...cookieOptions, maxAge: session.expires_in || 3600 });
    response.cookies.set("portfolio_refresh_token", session.refresh_token || refresh, { ...cookieOptions, maxAge: 2592000 });
    return response;
  } catch {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    redirect.cookies.delete("portfolio_access_token");
    redirect.cookies.delete("portfolio_refresh_token");
    return redirect;
  }
}
export const config = { matcher: ["/admin/:path*"] };
