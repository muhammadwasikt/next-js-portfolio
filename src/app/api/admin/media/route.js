import { cookies } from "next/headers";
import { getAuthUser, isPortfolioAdmin, jsonError, supabaseRest } from "@/lib/cms/supabase-rest";

export async function POST(request) {
  try {
    const jar = await cookies();
    const token = jar.get("portfolio_access_token")?.value;
    if (!token) return jsonError("Authentication required.", 401);
    const user = await getAuthUser(token);
    if (!user?.id || !await isPortfolioAdmin(token)) return jsonError("Admin access required.", 403);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.size) return jsonError("Choose an image to upload.");
    const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
    if (!allowed.has(file.type)) return jsonError("Supported formats: JPG, PNG, WebP, AVIF, GIF and SVG.");
    if (file.size > 10 * 1024 * 1024) return jsonError("Images must be 10 MB or smaller.");
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) return jsonError("Supabase is not configured.", 500);
    const baseUrl = url.replace(/\/$/, "");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-90) || "image";
    const path = user.id + "/" + Date.now() + "-" + safeName;
    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const upload = await fetch(baseUrl + "/storage/v1/object/portfolio-media/" + encodedPath, {
      method: "POST",
      headers: { apikey: anonKey, Authorization: "Bearer " + token, "Content-Type": file.type, "x-upsert": "false" },
      body: await file.arrayBuffer(), cache: "no-store"
    });
    const uploadData = await upload.json().catch(() => ({}));
    if (!upload.ok) return jsonError(uploadData.message || "Upload failed. Check Storage bucket and policies.", upload.status);
    const metadata = {
      title: String(form.get("title") || file.name).slice(0, 180), storage_path: path,
      public_url: baseUrl + "/storage/v1/object/public/portfolio-media/" + encodedPath,
      alt_text: String(form.get("alt_text") || "").slice(0, 500),
      caption: String(form.get("caption") || "").slice(0, 1000),
      tags: String(form.get("tags") || "").split(",").map(tag => tag.trim()).filter(Boolean),
      mime_type: file.type, file_size: file.size, created_by: user.id
    };
    const inserted = await supabaseRest("media_assets", { token, method: "POST", body: metadata, prefer: "return=representation" });
    const insertedData = await inserted.json().catch(() => ({}));
    if (!inserted.ok) return jsonError(insertedData.message || "File uploaded but media metadata could not be saved.", inserted.status);
    return Response.json({ data: Array.isArray(insertedData) ? insertedData[0] : insertedData }, { status: 201 });
  } catch (error) {
    return jsonError(error.message || "Upload failed.", 500);
  }
}
