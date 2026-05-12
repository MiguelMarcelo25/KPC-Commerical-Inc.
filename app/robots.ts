import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/**
 * Robots policy — allow everything, point crawlers at the sitemap.
 * Disallow rules can be added here if internal-only routes appear later
 * (e.g. a future /admin or /preview).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
