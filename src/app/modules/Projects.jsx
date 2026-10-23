import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublicRows, getSiteContent } from "@/lib/cms/public-data";

export default async function Projects() {
  const [site, projects, media] = await Promise.all([
    getSiteContent(),
    getPublicRows("projects", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("media_assets", "select=id,title,alt_text,public_url")
  ]);
  const byId = Object.fromEntries(media.map(item => [item.id, item]));
  return <main className="portfolio-experience"><section className="portfolio-section">
    <div className="portfolio-section-heading"><p className="portfolio-eyebrow">{site.projects_page?.eyebrow || ""}</p><h1>{site.projects_page?.title || ""}</h1><p className="portfolio-section-description">{site.projects_page?.description || ""}</p></div>
    {projects.length ? <div className="portfolio-project-grid">{projects.map((project,index)=><article className={"portfolio-project-card project-card-"+(index%3)} key={project.id}><Link href={"/projects/"+project.slug} className="portfolio-project-art">{byId[project.cover_media_id]?.public_url ? <img src={byId[project.cover_media_id].public_url} alt={byId[project.cover_media_id].alt_text || project.title} loading="lazy"/> : <div className="portfolio-image-placeholder"/>}<span className="portfolio-project-open"><ArrowUpRight size={18}/></span></Link><div className="portfolio-project-info"><p className="portfolio-project-category">{project.category}</p><h3><Link href={"/projects/"+project.slug}>{project.title}</Link></h3><p>{project.summary || project.description}</p><div className="portfolio-tech-list">{(project.tech_stack || []).map(tech=><span key={tech}>{tech}</span>)}</div></div></article>)}</div> : null}
  </section></main>;
}
