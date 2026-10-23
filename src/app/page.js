import PortfolioHome from "./modules/PortfolioHome";

export async function generateMetadata() {
  const { getSiteContent } = await import("@/lib/cms/public-data");
  const content = await getSiteContent();
  const settings = content.site_settings || {};
  const hero = content.hero || {};
  const title = settings.seo_title || hero.headline || "Portfolio";
  const description = settings.seo_description || hero.intro || "";
  return { title, description, openGraph: { title, description, images: settings.og_image ? [settings.og_image] : undefined } };
}
export default async function Page() { return <PortfolioHome />; }
