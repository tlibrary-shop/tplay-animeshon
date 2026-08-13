import type { Metadata } from "next";
import "./globals.css";
// @ts-ignore
import "swiper/css/bundle";
import { Providers } from "@/components/Providers";
import { AdsterraSiteScripts } from "@/components/Ads/AdsterraAd";
import { SITE_URL } from "@/utils/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Nonton Anime Sub Indo & English Sub - AniStream", template: "%s | Nonton Anime Sub Indo & English Sub - AniStream" },
  description: "Nonton anime subtitle Indonesia dan English subtitle terbaru dengan sinopsis, jadwal tayang, dan episode lengkap di AniStream.",
  applicationName: "AniStream",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "id_ID", url: SITE_URL,
    siteName: "AniStream", title: "Nonton Anime Sub Indo & English Sub - AniStream",
    description: "Koleksi anime subtitle Indonesia dan English subtitle terbaru dan populer.",
    images: [{ url: "/banner.png", alt: "AniStream" }],
  },
  twitter: { card: "summary_large_image", title: "AniStream", description: "Nonton anime Sub Indo dan English Sub.", images: ["/banner.png"] },
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
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "AniStream", url: SITE_URL, inLanguage: ["id-ID", "en-US"], potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } }) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "AniStream", url: SITE_URL, logo: `${SITE_URL}/favicon.ico` }) }} />
          <Providers>
            {children}
          </Providers>
          <AdsterraSiteScripts />
        </body>
      </html>
  );
}
