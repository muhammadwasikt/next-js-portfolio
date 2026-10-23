import Home from "@/app/modules/Home";
import { getSiteContent } from "@/lib/cms/public-data";
export async function generateMetadata() {
  const site = await getSiteContent();
  return { title: site.site_settings?.seo_title || site.hero?.headline || "Portfolio", description: site.site_settings?.seo_description || site.hero?.intro || "" };
}
export default function HomePage() { return <Home />; }
