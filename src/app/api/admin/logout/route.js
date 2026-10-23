export async function POST() {
  const response = Response.json({ success: true });
  response.headers.append("Set-Cookie", "portfolio_access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  response.headers.append("Set-Cookie", "portfolio_refresh_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  return response;
}
