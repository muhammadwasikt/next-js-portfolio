import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublicRows, getSiteContent } from "@/lib/cms/public-data";

export async function generateMetadata() {
  const site = await getSiteContent();
  return { title: site.case_studies_page?.seo_title || site.case_studies_page?.title || "Case Studies", description: site.case_studies_page?.description || "" };
}
export default async function CaseStudiesIndexPage() {
  const [site, studies, media] = await Promise.all([
    getSiteContent(),
    getPublicRows("case_studies", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("media_assets", "select=id,title,alt_text,public_url")
  ]);
  const byId = Object.fromEntries(media.map(item => [item.id, item]));
  const copy = site.case_studies_page || {};
  return <main className="portfolio-experience"><section className="portfolio-section">
    <div className="portfolio-section-heading"><p className="portfolio-eyebrow">{copy.eyebrow || ""}</p><h1>{copy.title || ""}</h1><p className="portfolio-section-description">{copy.description || ""}</p></div>
    {studies.length ? <div className="portfolio-case-grid">{studies.map((study,index)=><Link key={study.id} href={"/case-studies/"+study.slug} className="portfolio-case-card"><span className="portfolio-case-number">{String(index+1).padStart(2,"0")}</span><span className="portfolio-case-arrow"><ArrowUpRight size={19}/></span><div className="portfolio-case-cover">{byId[study.cover_media_id]?.public_url ? <img src={byId[study.cover_media_id].public_url} alt={byId[study.cover_media_id].alt_text || study.title} loading="lazy"/> : null}</div><p className="portfolio-eyebrow">{study.category || ""}</p><h3>{study.title}</h3><p>{study.excerpt}</p></Link>)}</div> : null}
  </section></main>;
}
