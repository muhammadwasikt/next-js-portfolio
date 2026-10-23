import { getPublicRows, getSiteContent } from "@/lib/cms/public-data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function About() {
  const [site, skills, experiences] = await Promise.all([
    getSiteContent(),
    getPublicRows("skills", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("experiences", "select=*&status=eq.published&order=sort_order.asc")
  ]);
  const profile = site.profile || {};
  return <main className="portfolio-experience">
    {profile.headline || profile.bio || profile.image_url ? <section className="portfolio-about-section">
      <div className="portfolio-about-image">{profile.image_url ? <img src={profile.image_url} alt={profile.image_alt || ""} /> : <div className="portfolio-about-placeholder" />}{profile.image_caption ? <span className="portfolio-image-caption">{profile.image_caption}</span> : null}</div>
      <div className="portfolio-about-copy"><p className="portfolio-eyebrow">{profile.eyebrow || ""}</p><h2>{profile.headline || ""}</h2><p>{profile.bio || ""}</p>{profile.secondary_bio ? <p>{profile.secondary_bio}</p> : null}{profile.cta_label && profile.cta_url ? <Link href={profile.cta_url} className="portfolio-text-link">{profile.cta_label}<ArrowUpRight size={16}/></Link> : null}
        {Array.isArray(profile.stats) && profile.stats.length ? <div className="portfolio-about-stats">{profile.stats.map((stat,index)=><div key={index}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div> : null}
      </div>
    </section> : null}
    {skills.length ? <section className="portfolio-section"><div className="portfolio-section-heading"><p className="portfolio-eyebrow">{site.section_copy?.skills_eyebrow || ""}</p><h2>{site.section_copy?.skills_title || ""}</h2></div><div className="portfolio-skill-list">{skills.map(skill=><span key={skill.id}>{skill.name}</span>)}</div></section> : null}
    {experiences.length ? <section className="portfolio-section"><div className="portfolio-section-heading"><p className="portfolio-eyebrow">{site.section_copy?.experience_eyebrow || ""}</p><h2>{site.section_copy?.experience_title || ""}</h2></div><div className="portfolio-timeline">{experiences.map(item=><article className="portfolio-timeline-item" key={item.id}><div className="portfolio-timeline-date">{item.start_date || ""}{item.is_current ? " — NOW" : item.end_date ? " — " + item.end_date : ""}</div><div className="portfolio-timeline-content"><h3>{item.role}</h3><p className="portfolio-timeline-company">{item.company}{item.location ? " · " + item.location : ""}</p>{item.summary ? <p>{item.summary}</p> : null}</div></article>)}</div></section> : null}
  </main>;
}
