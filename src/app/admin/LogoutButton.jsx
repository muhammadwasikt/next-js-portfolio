"use client";
import { useState } from "react";
export default function LogoutButton() {
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try { await fetch("/api/admin/logout", { method: "POST" }); }
    finally { window.location.assign("/admin/login"); }
  }
  return <button type="button" className="cms-quiet-button" onClick={logout} disabled={busy}>{busy ? "Signing out…" : "Sign out"}</button>;
}
