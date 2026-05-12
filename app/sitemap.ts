import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { SERVICES, INDUSTRIES, CASE_STUDIES } from "@/lib/content";

/**
 * Single sitemap covering every static + content-driven route on the site.
 * Service and industry slugs are pulled from lib/content so adding a new
 * service automatically extends the sitemap on the next build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/commercial"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/process"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/case-studies"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/locations"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/insurance"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/emergency-response-agreement"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/quote"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: url(`/industries/${i.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: url(`/case-studies/${c.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...caseStudyRoutes];
}
