import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { getPublicRows } from "@/lib/cms/public-data";

async function getProject(slug) {
  const rows = await getPublicRows("projects", "select=*&slug=eq." + encodeURIComponent(slug) + "&status=eq.published&limit=1");
  return rows[0] || null;
}
export async function generateMetadata({ params }) {
  const { slug } = await params; const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.seo_title || project.title, description: project.seo_description || project.summary || "" };
}
export default async function ProjectDetailPage({ params }) {
  const { slug } = await params; const project = await getProject(slug);
  if (!project) notFound();
  const media = project.cover_media_id ? (await getPublicRows("media_assets", "select=id,title,alt_text,public_url&id=eq." + encodeURIComponent(project.cover_media_id) + "&limit=1"))[0] : null;
  return <main className="portfolio-detail-page">
    <Link href="/projects" className="portfolio-back-link"><ArrowLeft size={16} /> All projects</Link>
    <header className="portfolio-detail-hero"><p className="portfolio-eyebrow">{project.category}</p><h1>{project.title}</h1><p className="portfolio-detail-intro">{project.summary || project.description}</p><div className="portfolio-detail-actions">{project.live_url ? <a className="portfolio-button portfolio-button-primary" href={project.live_url} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={16} /></a> : null}{project.source_url ? <a className="portfolio-button portfolio-button-ghost" href={project.source_url} target="_blank" rel="noreferrer">View source <ArrowUpRight size={16} /></a> : null}</div></header>
    {media?.public_url ? <div className="portfolio-detail-cover"><img src={media.public_url} alt={media.alt_text || project.title} /></div> : null}
    {project.tech_stack?.length ? <div className="portfolio-detail-tech">{project.tech_stack.map(item => <span key={item}>{item}</span>)}</div> : null}
    {project.description ? <section className="portfolio-detail-body"><p className="portfolio-eyebrow">PROJECT OVERVIEW</p><p>{project.description}</p></section> : null}
  </main>;
}
