function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  return { url: url.replace(/\/$/, ""), anonKey };
}

export async function supabaseAuthRequest(path, body) {
  const config = getConfig();
  return fetch(config.url + "/auth/v1/" + path, {
    method: "POST",
    headers: { apikey: config.anonKey, "Content-Type": "application/json" },
    body: JSON.stringify(body), cache: "no-store"
  });
}

export async function supabaseRest(path, options = {}) {
  const config = getConfig();
  const headers = {
    apikey: config.anonKey,
    Authorization: "Bearer " + (options.token || config.anonKey),
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (options.prefer) headers.Prefer = options.prefer;
  return fetch(config.url + "/rest/v1/" + path, {
    method: options.method || "GET", headers,
    ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
    cache: "no-store"
  });
}

export async function isPortfolioAdmin(token) {
  const response = await supabaseRest("rpc/is_portfolio_admin", { token, method: "POST", body: {} });
  if (!response.ok) return false;
  return response.json().catch(() => false);
}

export async function getAuthUser(token) {
  const config = getConfig();
  const response = await fetch(config.url + "/auth/v1/user", {
    headers: { apikey: config.anonKey, Authorization: "Bearer " + token }, cache: "no-store"
  });
  if (!response.ok) return null;
  return response.json().catch(() => null);
}

export function jsonError(message, status = 400) {
  return Response.json({ error: message }, { status });
}
