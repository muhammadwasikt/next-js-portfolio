import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { getPublicRows, getSiteContent, safeText } from "@/lib/cms/public-data";

function MediaImage({ media, alt = "" }) {
  if (!media?.public_url) return <div className="portfolio-image-placeholder"><Sparkles size={24} /></div>;
  return <img src={media.public_url} alt={alt || media.alt_text || media.title || ""} loading="lazy" />;
}
function SectionHeading({ eyebrow, title, description }) {
  return <div className="portfolio-section-heading"><p className="portfolio-eyebrow">{eyebrow}</p><h2>{title}</h2>{description ? <p className="portfolio-section-description">{description}</p> : null}</div>;
}
export default async function PortfolioHome() {
  const [site, projects, studies, skills, experiences, testimonials, media] = await Promise.all([
    getSiteContent(),
    getPublicRows("projects", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("case_studies", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("skills", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("experiences", "select=*&status=eq.published&order=sort_order.asc"),
    getPublicRows("testimonials", "select=*&status=eq.published&approved=eq.true&order=sort_order.asc"),
    getPublicRows("media_assets", "select=id,title,alt_text,public_url")
  ]);
  const mediaById = Object.fromEntries(media.map(item => [item.id, item]));
  const hero = site.hero || {};
  const profile = site.profile || {};
  const settings = site.site_settings || {};
  const sectionCopy = site.section_copy || {};
  const featuredProjects = projects.filter(item => item.featured);
  const visibleProjects = featuredProjects.length ? featuredProjects : projects;
  const featuredStudies = studies.filter(item => item.featured);
  const visibleStudies = featuredStudies.length ? featuredStudies : studies;

  return <main className="portfolio-experience">
    <section className="portfolio-hero">
      <div className="portfolio-hero-grid" aria-hidden="true" />
      <div className="portfolio-hero-glow" aria-hidden="true" />
      <div className="portfolio-hero-copy">
        {hero.eyebrow ? <p className="portfolio-eyebrow">{safeText(hero.eyebrow)}</p> : null}
        <h1>{safeText(hero.headline)}</h1>
        {hero.intro ? <p className="portfolio-hero-intro">{safeText(hero.intro)}</p> : null}
        <div className="portfolio-hero-actions">
          {hero.primary_label && hero.primary_url ? <Link className="portfolio-button portfolio-button-primary" href={hero.primary_url}>{hero.primary_label}<ArrowUpRight size={17} /></Link> : null}
          {hero.secondary_label && hero.secondary_url ? <Link className="portfolio-button portfolio-button-ghost" href={hero.secondary_url}>{hero.secondary_label}<ArrowRight size={16} /></Link> : null}
        </div>
        <div className="portfolio-hero-meta">
          {settings.location ? <span>{settings.location}</span> : null}
          {settings.availability ? <span className="portfolio-availability"><i />{settings.availability}</span> : null}
        </div>
      </div>
      <div className="portfolio-hero-art" aria-label={hero.art_alt || "Abstract 3D portfolio artwork"}>
        <div className="portfolio-art-orbit orbit-a" /><div className="portfolio-art-orbit orbit-b" /><div className="portfolio-art-orbit orbit-c" />
        <div className="portfolio-art-core">{hero.image_url ? <img src={hero.image_url} alt={hero.art_alt || ""} /> : <div className="portfolio-art-shine" />}</div>
        <span className="portfolio-art-chip chip-top">{hero.art_label || ""}</span>
        <span className="portfolio-art-chip chip-bottom"><Sparkles size={13} /> {hero.art_caption || ""}</span>
      </div>
      <a className="portfolio-scroll-cue" href="#selected-work"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16} /></a>
    </section>

    {skills.length > 0 ? <section className="portfolio-skill-ribbon"><span className="portfolio-ribbon-label">CRAFT & TOOLKIT</span><div className="portfolio-skill-list">{skills.map(skill => <span key={skill.id}>{skill.name}</span>)}</div></section> : null}

    <section className="portfolio-section portfolio-work-section" id="selected-work">
      <SectionHeading eyebrow={sectionCopy.projects_eyebrow || ""} title={sectionCopy.projects_title || ""} description={sectionCopy.projects_description || ""} />
      {visibleProjects.length ? <div className="portfolio-project-grid">{visibleProjects.map((project, index) => <article className={"portfolio-project-card project-card-" + (index % 3)} key={project.id}>
        <Link href={"/projects/" + project.slug} className="portfolio-project-art">
          <MediaImage media={mediaById[project.cover_media_id]} alt={project.title} />
          <span className="portfolio-project-open"><ArrowUpRight size={18} /></span>
          <span className="portfolio-project-index">{String(index + 1).padStart(2, "0")}</span>
        </Link>
        <div className="portfolio-project-info"><div><p className="portfolio-project-category">{project.category}</p><h3><Link href={"/projects/" + project.slug}>{project.title}</Link></h3><p>{project.summary || project.description}</p></div><div className="portfolio-project-bottom"><div className="portfolio-tech-list">{(project.tech_stack || []).slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>{project.live_url ? <a href={project.live_url} target="_blank" rel="noreferrer" aria-label={"Open " + project.title + " website"}><ExternalLink size={15} /></a> : null}</div></div>
      </article>)}</div> : <p className="portfolio-empty-note">{site.empty_state?.projects || ""}</p>}
      <div className="portfolio-section-end"><Link href="/projects" className="portfolio-text-link">{sectionCopy.all_projects_label || ""} <ArrowUpRight size={16} /></Link></div>
    </section>

    {profile.headline || profile.bio || profile.image_url ? <section className="portfolio-about-section" id="about">
      <div className="portfolio-about-image">{profile.image_url ? <img src={profile.image_url} alt={profile.image_alt || ""} loading="lazy" /> : <div className="portfolio-about-placeholder"><Code2 size={36} /></div>}<span className="portfolio-image-caption">{profile.image_caption || ""}</span></div>
      <div className="portfolio-about-copy"><p className="portfolio-eyebrow">{profile.eyebrow || "A LITTLE ABOUT ME"}</p><h2>{profile.headline || ""}</h2><p>{profile.bio || ""}</p>{profile.secondary_bio ? <p>{profile.secondary_bio}</p> : null}
        {profile.cta_label && profile.cta_url ? <Link href={profile.cta_url} className="portfolio-text-link">{profile.cta_label}<ArrowUpRight size={16} /></Link> : null}
        <div className="portfolio-about-stats">{(profile.stats || []).map((stat, index) => <div key={index}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
      </div>
    </section> : null}

    {visibleStudies.length > 0 ? <section className="portfolio-section portfolio-case-section" id="case-studies">
      <SectionHeading eyebrow={sectionCopy.case_studies_eyebrow || ""} title={sectionCopy.case_studies_title || ""} description={sectionCopy.case_studies_description || ""} />
      <div className="portfolio-case-grid">{visibleStudies.map((study, index) => <Link key={study.id} href={"/case-studies/" + study.slug} className="portfolio-case-card">
        <span className="portfolio-case-number">{String(index + 1).padStart(2, "0")}</span><span className="portfolio-case-arrow"><ArrowUpRight size={19} /></span>
        <div className="portfolio-case-cover"><MediaImage media={mediaById[study.cover_media_id]} alt={study.title} /></div>
        <p className="portfolio-eyebrow">{study.project_id ? (projects.find(project => project.id === study.project_id)?.category || "CASE STUDY") : "CASE STUDY"}</p><h3>{study.title}</h3><p>{study.excerpt}</p>
      </Link>)}</div>
    </section> : null}

    {experiences.length > 0 ? <section className="portfolio-section portfolio-experience-section" id="experience">
      <SectionHeading eyebrow={sectionCopy.experience_eyebrow || ""} title={sectionCopy.experience_title || ""} description={sectionCopy.experience_description || ""} />
      <div className="portfolio-timeline">{experiences.map(item => <article className="portfolio-timeline-item" key={item.id}><div className="portfolio-timeline-date">{item.start_date ? new Date(item.start_date + "T00:00:00").getFullYear() : ""}{item.is_current ? " — NOW" : item.end_date ? " — " + new Date(item.end_date + "T00:00:00").getFullYear() : ""}</div><div className="portfolio-timeline-content"><h3>{item.role}</h3><p className="portfolio-timeline-company">{item.company}{item.location ? " · " + item.location : ""}</p>{item.summary ? <p>{item.summary}</p> : null}{Array.isArray(item.achievements) && item.achievements.length ? <ul>{item.achievements.map((achievement, index) => <li key={index}>{typeof achievement === "string" ? achievement : achievement.text || ""}</li>)}</ul> : null}</div></article>)}</div>
    </section> : null}

    {testimonials.length > 0 ? <section className="portfolio-section portfolio-testimonials-section" id="testimonials">
      <SectionHeading eyebrow={sectionCopy.testimonials_eyebrow || ""} title={sectionCopy.testimonials_title || ""} description={sectionCopy.testimonials_description || ""} />
      <div className="portfolio-testimonial-grid">{testimonials.map(item => <figure key={item.id} className="portfolio-testimonial"><span className="portfolio-quote-mark">“</span><blockquote>{item.quote}</blockquote><figcaption><div className="portfolio-avatar">{item.person_name.slice(0, 1).toUpperCase()}</div><div><strong>{item.person_name}</strong><span>{[item.role, item.company].filter(Boolean).join(" · ")}</span></div></figcaption></figure>)}</div>
    </section> : null}

    <section className="portfolio-contact-band" id="contact"><div><p className="portfolio-eyebrow">{safeText(site.contact?.eyebrow)}</p><h2>{safeText(site.contact?.headline)}</h2><p>{safeText(site.contact?.description)}</p></div><div className="portfolio-contact-actions">{site.contact?.email ? <a className="portfolio-button portfolio-button-primary" href={"mailto:" + site.contact.email}>{site.contact?.cta_label || ""}<ArrowUpRight size={17} /></a> : null}{site.contact?.social_url && site.contact?.social_label ? <a className="portfolio-button portfolio-button-ghost" href={site.contact.social_url} target="_blank" rel="noreferrer">{site.contact.social_label}<ExternalLink size={15} /></a> : null}</div></section>
  </main>;
}
