import type { MetadataRoute } from "next";

const BASE_URL = "https://pedropiresguerraadvogado.pt";
const locales = ["pt", "en", "fr", "de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/politica-privacidade", "/termos-de-utilizacao"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.5,
      });
    }
  }

  return entries;
}
