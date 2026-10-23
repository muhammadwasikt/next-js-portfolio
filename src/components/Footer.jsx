"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import useSiteContent from "./useSiteContent";

export default function Footer() {
  const site = useSiteContent();
  const settings = site.site_settings || {};
  const footer = site.footer || {};
  const links = Array.isArray(footer.social_links) ? footer.social_links : [];
  if (!footer.headline && !settings.brand_name && !links.length && !footer.copyright) return null;
  return <footer className="portfolio-site-footer">
    <div><p className="portfolio-eyebrow">{footer.eyebrow || ""}</p><h2>{footer.headline || settings.brand_name || ""}</h2>{footer.description ? <p>{footer.description}</p> : null}</div>
    <div className="portfolio-footer-links">{links.map((item,index)=><a key={item.url || index} href={item.url || "#"} target={item.url?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{item.label || ""}<ArrowUpRight size={14}/></a>)}</div>
    {footer.copyright ? <p className="portfolio-footer-copyright">{footer.copyright}</p> : null}
  </footer>;
}
