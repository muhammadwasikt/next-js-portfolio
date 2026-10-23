import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPublicRows } from "@/lib/cms/public-data";

export const metadata = { title: "Projects", description: "Published portfolio projects." };
export default async function ProjectsIndexPage() {
  const [projects, media] = await Promise.all([
    getPublicRows("projects", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("media_assets", "select=id,title,alt_text,public_url")
  ]);
  const byId = Object.fromEntries(media.map(item => [item.id, item]));
  return <main className="portfolio-index-page"><Link href="/" className="portfolio-back-link"><ArrowLeft size={16} /> Home</Link><header className="portfolio-detail-hero"><p className="portfolio-eyebrow">SELECTED WORK</p><h1>Projects</h1><p className="portfolio-detail-intro">A collection of work published from the portfolio CMS.</p></header>
    {projects.length ? <div className="portfolio-project-grid">{projects.map((project,index) => <article className={"portfolio-project-card project-card-" + (index%3)} key={project.id}><Link href={"/projects/"+project.slug} className="portfolio-project-art">{byId[project.cover_media_id]?.public_url ? <img src={byId[project.cover_media_id].public_url} alt={byId[project.cover_media_id].alt_text || project.title} loading="lazy" /> : <div className="portfolio-image-placeholder" />}<span className="portfolio-project-open"><ArrowUpRight size={18}/></span></Link><div className="portfolio-project-info"><p className="portfolio-project-category">{project.category}</p><h3><Link href={"/projects/"+project.slug}>{project.title}</Link></h3><p>{project.summary || project.description}</p><div className="portfolio-tech-list">{(project.tech_stack || []).map(tech => <span key={tech}>{tech}</span>)}</div></div></article>)}</div> : <p className="portfolio-empty-note">No projects have been published yet.</p>}
  </main>;
}
