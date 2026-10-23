function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}
export async function getPublicRows(table, query = "select=*") {
  const settings = config();
  if (!settings) return [];
  try {
    const response = await fetch(settings.url + "/rest/v1/" + table + "?" + query, {
      headers: { apikey: settings.key, Authorization: "Bearer " + settings.key },
      cache: "no-store"
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}
export async function getSiteContent() {
  const rows = await getPublicRows("site_content", "select=content_key,value");
  return Object.fromEntries(rows.map(row => [row.content_key, row.value]));
}
export function safeText(value) { return typeof value === "string" ? value : ""; }
