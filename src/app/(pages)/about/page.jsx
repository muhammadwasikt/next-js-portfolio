import dynamic from "next/dynamic";
const About = dynamic(() => import("@/app/modules/About"));
export async function generateMetadata() {
  const { getSiteContent } = await import("@/lib/cms/public-data");
  const site = await getSiteContent();
  return { title: site.profile?.seo_title || site.profile?.headline || "About", description: site.profile?.bio || "" };
}
export default function AboutPage() { return <About />; }
