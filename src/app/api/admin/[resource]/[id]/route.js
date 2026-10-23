import { cookies } from "next/headers";
import { CMS_RESOURCES } from "@/lib/cms/resources";
import { getAuthUser, isPortfolioAdmin, jsonError, supabaseRest } from "@/lib/cms/supabase-rest";

async function authorize() {
  const jar = await cookies(); const token = jar.get("portfolio_access_token")?.value;
  if (!token) return { error: jsonError("Authentication required.", 401) };
  const user = await getAuthUser(token);
  if (!user?.id) return { error: jsonError("Session expired. Sign in again.", 401) };
  if (!await isPortfolioAdmin(token)) return { error: jsonError("Admin access required.", 403) };
  return { token, user };
}
async function resourceFor(context) {
  const params = await context.params; const resource = CMS_RESOURCES[params.resource];
  if (!resource) return { error: jsonError("Unknown CMS resource.", 404) };
  return { ...resource, key: params.resource, id: params.id };
}
function normalize(body, fields, userId, table) {
  const payload = {};
  for (const field of fields) {
    if (!(field.name in body)) continue;
    let value = body[field.name];
    if (field.type === "boolean") value = value === true || value === "true" || value === "on";
    if (field.type === "number") value = value === "" || value === null ? null : Number(value);
    if (field.type === "tags") value = Array.isArray(value) ? value : String(value || "").split(",").map(item => item.trim()).filter(Boolean);
    if (field.type === "json" && typeof value === "string") {
      try { value = JSON.parse(value || (field.name === "value" ? "{}" : "[]")); }
      catch { throw new Error('"' + field.label + '" must contain valid JSON.'); }
    }
    if (field.type === "url" && value && !/^https?:\/\//i.test(value)) throw new Error('"' + field.label + '" must start with http:// or https://.');
    payload[field.name] = value === "" ? null : value;
  }
  if (table === "site_content") payload.updated_by = userId;
  if (payload.status === "published" && !payload.published_at) payload.published_at = new Date().toISOString();
  if (payload.status === "draft") payload.published_at = null;
  return payload;
}
export async function PATCH(request, context) {
  try {
    const auth = await authorize(); if (auth.error) return auth.error;
    const resource = await resourceFor(context); if (resource.error) return resource.error;
    const payload = normalize(await request.json(), resource.fields, auth.user.id, resource.table);
    const result = await supabaseRest(resource.table + "?id=eq." + encodeURIComponent(resource.id), {
      token: auth.token, method: "PATCH", body: payload, prefer: "return=representation"
    });
    const data = await result.json().catch(() => ({}));
    if (!result.ok) return jsonError(data.message || "Unable to update record.", result.status);
    if (!Array.isArray(data) || !data.length) return jsonError("Record not found.", 404);
    return Response.json({ data: data[0] });
  } catch (error) { return jsonError(error.message || "Unable to update record.", 400); }
}
export async function DELETE(_request, context) {
  try {
    const auth = await authorize(); if (auth.error) return auth.error;
    const resource = await resourceFor(context); if (resource.error) return resource.error;
    if (resource.key === "media") {
      const lookup = await supabaseRest("media_assets?select=storage_path&id=eq." + encodeURIComponent(resource.id), { token: auth.token });
      const rows = await lookup.json().catch(() => []);
      const storagePath = Array.isArray(rows) ? rows[0]?.storage_path : null;
      if (storagePath) {
        const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!baseUrl || !anonKey) return jsonError("Supabase is not configured.", 500);
        const encodedPath = storagePath.split("/").map(encodeURIComponent).join("/");
        const storageDelete = await fetch(baseUrl.replace(/\/$/, "") + "/storage/v1/object/portfolio-media/" + encodedPath, {
          method: "DELETE", headers: { apikey: anonKey, Authorization: "Bearer " + auth.token }, cache: "no-store"
        });
        if (!storageDelete.ok) return jsonError("Could not remove the image file from storage. The record was kept.", storageDelete.status);
      }
    }
    const result = await supabaseRest(resource.table + "?id=eq." + encodeURIComponent(resource.id), {
      token: auth.token, method: "DELETE", prefer: "return=representation"
    });
    const data = await result.json().catch(() => ({}));
    if (!result.ok) return jsonError(data.message || "Unable to delete record.", result.status);
    return Response.json({ success: true, data });
  } catch { return jsonError("Unable to delete record.", 500); }
}
