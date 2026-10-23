import Contact from "@/app/modules/Contact";
import { getSiteContent } from "@/lib/cms/public-data";
export async function generateMetadata() {
  const site = await getSiteContent();
  return { title: site.contact?.seo_title || site.contact?.headline || "Contact", description: site.contact?.description || "" };
}
export default async function ContactPage() {
  const site = await getSiteContent();
  return <Contact contact={site.contact || {}} />;
}
