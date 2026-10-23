import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPublicRows } from "@/lib/cms/public-data";

async function getStudy(slug) {
  const rows = await getPublicRows("case_studies", "select=*&slug=eq." + encodeURIComponent(slug) + "&status=eq.published&limit=1");
  return rows[0] || null;
}
export async function generateMetadata({ params }) {
  const { slug } = await params; const study = await getStudy(slug);
  if (!study) return { title: "Case study not found" };
  return { title: study.seo_title || study.title, description: study.seo_description || study.excerpt || "" };
}
export default async function CaseStudyPage({ params }) {
  const { slug } = await params; const study = await getStudy(slug);
  if (!study) notFound();
  const media = study.cover_media_id ? (await getPublicRows("media_assets", "select=id,title,alt_text,public_url&id=eq." + encodeURIComponent(study.cover_media_id) + "&limit=1"))[0] : null;
  const blocks = Array.isArray(study.content) ? study.content : [];
  return <main className="portfolio-detail-page">
    <Link href="/#case-studies" className="portfolio-back-link"><ArrowLeft size={16} /> Back to portfolio</Link>
    <header className="portfolio-detail-hero"><p className="portfolio-eyebrow">CASE STUDY</p><h1>{study.title}</h1><p className="portfolio-detail-intro">{study.excerpt}</p></header>
    {media?.public_url ? <div className="portfolio-detail-cover"><img src={media.public_url} alt={media.alt_text || study.title} /></div> : null}
    <div className="portfolio-case-content">
      {study.problem ? <section><p className="portfolio-eyebrow">THE CHALLENGE</p><h2>Problem</h2><p>{study.problem}</p></section> : null}
      {study.goals?.length ? <section><p className="portfolio-eyebrow">THE OBJECTIVE</p><h2>Goals</h2><ul>{study.goals.map(goal => <li key={goal}>{goal}</li>)}</ul></section> : null}
      {study.approach ? <section><p className="portfolio-eyebrow">THE PROCESS</p><h2>Approach</h2><p>{study.approach}</p></section> : null}
      {study.solution ? <section><p className="portfolio-eyebrow">THE OUTCOME</p><h2>Solution</h2><p>{study.solution}</p></section> : null}
      {Array.isArray(study.outcomes) && study.outcomes.length ? <section><p className="portfolio-eyebrow">RESULTS</p><h2>Impact</h2><ul>{study.outcomes.map((outcome, index) => <li key={index}>{typeof outcome === "string" ? outcome : outcome.label || outcome.value || ""}</li>)}</ul></section> : null}
      {blocks.map((block, index) => <section key={index}>{block.heading ? <h2>{block.heading}</h2> : null}{block.body ? <p>{block.body}</p> : null}{block.image_url ? <img className="portfolio-case-inline-image" src={block.image_url} alt={block.alt || ""} loading="lazy" /> : null}</section>)}
    </div>
    {study.project_id ? <p className="portfolio-case-back-project"><Link href="/projects" className="portfolio-text-link">Explore related projects <ArrowUpRight size={16} /></Link></p> : null}
  </main>;
}
