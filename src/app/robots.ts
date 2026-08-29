import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/profile", "/admin/", "/search"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/profile", "/admin/", "/search"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/profile", "/admin/", "/search"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
