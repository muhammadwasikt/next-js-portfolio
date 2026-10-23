import { getPublicRows } from "@/lib/cms/public-data";

export default async function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://muhammadwasiportfolio.vercel.app").replace(/\/$/, "");
  const staticRoutes = ["", "/about", "/services", "/projects", "/case-studies", "/contact"].map(path => ({
    url: baseUrl + path, lastModified: new Date(), changeFrequency: "weekly", priority: path === "" ? 1 : 0.7
  }));
  const [projects, studies] = await Promise.all([
    getPublicRows("projects", "select=slug,updated_at&status=eq.published"),
    getPublicRows("case_studies", "select=slug,updated_at&status=eq.published")
  ]);
  return staticRoutes.concat(
    projects.map(item => ({ url: baseUrl + "/projects/" + item.slug, lastModified: item.updated_at ? new Date(item.updated_at) : new Date(), changeFrequency: "monthly", priority: 0.7 })),
    studies.map(item => ({ url: baseUrl + "/case-studies/" + item.slug, lastModified: item.updated_at ? new Date(item.updated_at) : new Date(), changeFrequency: "monthly", priority: 0.6 }))
  );
}
