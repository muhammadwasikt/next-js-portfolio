"use client";
import { useEffect, useState } from "react";

export default function useSiteContent() {
  const [content, setContent] = useState({});
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    let active = true;
    fetch(url.replace(/\/$/, "") + "/rest/v1/site_content?select=content_key,value", {
      headers: { apikey: key, Authorization: "Bearer " + key }, cache: "no-store"
    }).then(response => response.ok ? response.json() : []).then(rows => {
      if (active && Array.isArray(rows)) setContent(Object.fromEntries(rows.map(row => [row.content_key, row.value])));
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return content;
}
