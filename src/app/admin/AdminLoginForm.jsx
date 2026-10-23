"use client";
import { useState } from "react";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      window.location.assign("/admin");
    } catch (err) { setError(err.message || "Unable to sign in."); }
    finally { setBusy(false); }
  }
  return <main className="cms-login-shell">
    <div className="cms-login-orbit cms-login-orbit-one" aria-hidden="true" /><div className="cms-login-orbit cms-login-orbit-two" aria-hidden="true" />
    <section className="cms-login-card">
      <div className="cms-brand-mark"><Sparkles size={20} /></div><p className="cms-eyebrow">PRIVATE WORKSPACE</p>
      <h1>Welcome back.</h1><p className="cms-muted">Manage your portfolio content, stories and media from one place.</p>
      <form onSubmit={submit} className="cms-form">
        <label>Email address<input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
        {error && <p className="cms-error" role="alert">{error}</p>}
        <button className="cms-primary-button" type="submit" disabled={busy}><LockKeyhole size={16} /> {busy ? "Signing in…" : "Secure sign in"} <ArrowRight size={16} /></button>
      </form>
      <p className="cms-footnote">Access is restricted to the admin account configured in Supabase.</p>
    </section>
  </main>;
}
