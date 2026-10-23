import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowUpRight, BriefcaseBusiness, FileText, Image as ImageIcon, Layers3, MessageSquareQuote, Settings2, Sparkles, Wrench } from "lucide-react";
import { CMS_NAV } from "@/lib/cms/resources";
import { getAuthUser, isPortfolioAdmin, supabaseRest } from "@/lib/cms/supabase-rest";
import LogoutButton from "./LogoutButton";

const icons = { projects: BriefcaseBusiness, "case-studies": FileText, skills: Wrench, experience: Layers3, testimonials: MessageSquareQuote, media: ImageIcon, "site-content": Settings2 };
export const metadata = { title: "Portfolio CMS", robots: { index: false, follow: false } };

export default async function AdminDashboard() {
  const jar = await cookies();
  const token = jar.get("portfolio_access_token")?.value;
  if (!token) redirect("/admin/login");
  const user = await getAuthUser(token);
  if (!user?.id || !await isPortfolioAdmin(token)) redirect("/admin/login");
  const counts = await Promise.all(CMS_NAV.map(async item => {
    const table = item.key === "case-studies" ? "case_studies" : item.key === "site-content" ? "site_content" : item.key === "experience" ? "experiences" : item.key === "media" ? "media_assets" : item.key;
    const response = await supabaseRest(table + "?select=id", { token, headers: { Prefer: "count=exact", Range: "0-0" } });
    const total = response.headers.get("content-range")?.split("/")[1];
    return { key: item.key, count: total && total !== "*" ? Number(total) : null };
  }));
  return <main className="cms-shell">
    <header className="cms-topbar"><Link href="/admin" className="cms-brand"><span className="cms-brand-mark"><Sparkles size={17} /></span> Wasi <span className="cms-brand-divider">/</span> Studio</Link>
      <div className="cms-topbar-right"><span className="cms-online-dot" /> Admin workspace <LogoutButton /></div></header>
    <section className="cms-welcome"><div><p className="cms-eyebrow">CONTENT CONTROL CENTER</p><h1>Good work deserves<br /><span>a great stage.</span></h1><p className="cms-muted">Manage every public-facing detail of your portfolio from one place.</p></div><div className="cms-welcome-orb" aria-hidden="true"><div /></div></section>
    <div className="cms-section-heading"><div><p className="cms-eyebrow">YOUR CONTENT</p><h2>Workspace modules</h2></div><span className="cms-muted">All edits are stored in Supabase</span></div>
    <section className="cms-module-grid">{CMS_NAV.map((item, index) => {
      const Icon = icons[item.key] || Settings2; const count = counts.find(value => value.key === item.key)?.count;
      return <Link key={item.key} href={"/admin/" + item.key} className="cms-module-card" style={{ "--card-index": index }}>
        <div className="cms-module-icon"><Icon size={21} /></div><div className="cms-module-count">{count === null || count === undefined ? "—" : String(count).padStart(2, "0")}</div>
        <h3>{item.label}</h3><p>Manage, edit and publish content</p><span className="cms-card-arrow"><ArrowUpRight size={18} /></span>
      </Link>;
    })}</section>
    <footer className="cms-dashboard-footer"><span>Portfolio Studio CMS</span><span>Protected workspace · Changes persist in the database</span></footer>
  </main>;
}
