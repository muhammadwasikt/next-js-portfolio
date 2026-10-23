import dynamic from "next/dynamic";
const Services = dynamic(() => import("@/app/modules/Services"));
export async function generateMetadata() {
  const { getSiteContent } = await import("@/lib/cms/public-data");
  const site = await getSiteContent();
  return { title: site.services_page?.seo_title || site.services_page?.title || "Services", description: site.services_page?.description || "" };
}
export default function ServicesPage() { return <Services />; }
