import type { Metadata } from "next";
import "./globals.css";
// @ts-ignore
import "swiper/css/bundle";
import { Providers } from "@/components/Providers";
import { AdsterraSiteScripts } from "@/components/Ads/AdsterraAd";
import { SITE_URL } from "@/utils/config";
import { JsonLd } from "@/components/Seo/JsonLd";

const siteTitle = "Nonton Anime Sub Indo & English Sub - AniStream";
const siteDescription = "Nonton anime subtitle Indonesia dan English subtitle terbaru dengan sinopsis, jadwal tayang, dan episode lengkap di AniStream.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: siteTitle, template: "%s | Nonton Anime Sub Indo & English Sub - AniStream" },
  description: siteDescription,
  applicationName: "AniStream",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "id_ID", alternateLocale: ["en_US"], url: SITE_URL,
    siteName: "AniStream", title: siteTitle, description: siteDescription,
    images: [{ url: "/banner.png", width: 1200, height: 630, alt: "AniStream" }],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: ["/banner.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="id">
        <body className="antialiased bg-gray-800 text-white font-sans overflow-x-hidden">
          <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "AniStream", url: SITE_URL, inLanguage: ["id-ID", "en-US"], potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "AniStream", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/banner.png` } }} />
          <Providers>
            {children}
          </Providers>
          <AdsterraSiteScripts />
        </body>
      </html>
  );
}
