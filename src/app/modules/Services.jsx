import { getSiteContent } from "@/lib/cms/public-data";

export default async function Services() {
  const site = await getSiteContent();
  const services = Array.isArray(site.services) ? site.services : [];
  const copy = site.services_page || {};
  if (!services.length) return null;
  return <main className="portfolio-experience"><section className="portfolio-section">
    <div className="portfolio-section-heading"><p className="portfolio-eyebrow">{copy.eyebrow || ""}</p><h1>{copy.title || ""}</h1><p className="portfolio-section-description">{copy.description || ""}</p></div>
    <div className="portfolio-case-grid">{services.map((service,index)=><article key={service.id || service.title || index} className="portfolio-case-card"><span className="portfolio-case-number">{String(index+1).padStart(2,"0")}</span><h3>{service.title || ""}</h3><p>{service.description || ""}</p></article>)}</div>
  </section></main>;
}
