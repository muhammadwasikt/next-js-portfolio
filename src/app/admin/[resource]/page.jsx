import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { CMS_RESOURCES } from "@/lib/cms/resources";
import { getAuthUser, isPortfolioAdmin } from "@/lib/cms/supabase-rest";
import AdminResourceClient from "../AdminResourceClient";
import LogoutButton from "../LogoutButton";

export const metadata = { title: "Manage Content | Portfolio CMS", robots: { index: false, follow: false } };
export default async function AdminResourcePage({ params }) {
  const { resource } = await params; const config = CMS_RESOURCES[resource];
  if (!config) notFound();
  const jar = await cookies(); const token = jar.get("portfolio_access_token")?.value;
  if (!token) redirect("/admin/login");
  const user = await getAuthUser(token);
  if (!user?.id || !await isPortfolioAdmin(token)) redirect("/admin/login");
  return <main className="cms-shell">
    <header className="cms-topbar"><Link href="/admin" className="cms-brand"><span className="cms-brand-mark"><Sparkles size={17} /></span> Wasi <span className="cms-brand-divider">/</span> Studio</Link>
      <div className="cms-topbar-right"><Link href="/" target="_blank" className="cms-quiet-link">View website <ExternalLink size={14} /></Link><LogoutButton /></div></header>
    <div className="cms-breadcrumb"><Link href="/admin"><ArrowLeft size={15} /> Workspace</Link><span>/</span><span>{config.label}</span></div>
    <section className="cms-resource-heading"><div><p className="cms-eyebrow">CONTENT MODULE</p><h1>{config.label}</h1><p className="cms-muted">Create, edit, publish or remove records. Saved changes persist in Supabase.</p></div><span className="cms-resource-mark"><Sparkles size={23} /></span></section>
    <AdminResourceClient resource={resource} config={config} />
  </main>;
}
