import { supabaseAuthRequest, isPortfolioAdmin } from "@/lib/cms/supabase-rest";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) return Response.json({ error: "Email and password are required." }, { status: 400 });
    const authResponse = await supabaseAuthRequest("token?grant_type=password", { email, password });
    const session = await authResponse.json().catch(() => ({}));
    if (!authResponse.ok || !session.access_token) return Response.json({ error: "Invalid email or password." }, { status: 401 });
    if (!await isPortfolioAdmin(session.access_token)) return Response.json({ error: "This account is not authorized to access the portfolio admin." }, { status: 403 });
    const secure = process.env.NODE_ENV === "production";
    const cookieBase = "Path=/; HttpOnly; SameSite=Lax" + (secure ? "; Secure" : "");
    const response = Response.json({ success: true });
    response.headers.append("Set-Cookie", "portfolio_access_token=" + session.access_token + "; " + cookieBase + "; Max-Age=" + Math.max(60, Number(session.expires_in) || 3600));
    response.headers.append("Set-Cookie", "portfolio_refresh_token=" + session.refresh_token + "; " + cookieBase + "; Max-Age=2592000");
    return response;
  } catch {
    return Response.json({ error: "Unable to sign in. Check the server's Supabase configuration." }, { status: 500 });
  }
}
