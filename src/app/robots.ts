import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep render assets crawlable. Blocking /_next can prevent Google from
      // rendering and understanding a Next.js page correctly.
      disallow: [
        "/api/",
        "/profile",
        "/search",
        "/*?*",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
