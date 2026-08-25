import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

const BASE = "https://www.henryridgeplumbing.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/gallery`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/quote`, priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages];
}
