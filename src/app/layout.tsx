import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
// @ts-ignore
import "swiper/css/bundle";
import { Providers } from "@/components/Providers";
import { SITE_URL } from "@/utils/config";
import { JsonLd } from "@/components/Seo/JsonLd";

const siteTitle = "TPLAY-ANIMESHON - Nonton Anime Sub Indo & English Sub";
const siteDescription = "TPLAY-ANIMESHON - Nonton anime subtitle Indonesia dan English subtitle terbaru dengan sinopsis, jadwal tayang, dan episode lengkap.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: siteTitle, template: "%s | TPLAY-ANIMESHON" },
  description: siteDescription,
  applicationName: "TPLAY-ANIMESHON",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "id_ID", alternateLocale: ["en_US"], url: SITE_URL,
    siteName: "TPLAY-ANIMESHON", title: siteTitle, description: siteDescription,
    images: [{ url: "/banner.png", width: 1200, height: 630, alt: "TPLAY-ANIMESHON" }],
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
        <head>
          <link rel="preconnect" href="https://api.animekudesu.web.id" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api.animekudesu.web.id" />
        </head>
        <body className="antialiased bg-gray-900 text-white font-sans overflow-x-hidden">
          {/* Google Analytics tetap dipertahankan karena ini untuk statistik pengunjung, bukan iklan */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-C4EQ753MZB"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C4EQ753MZB');
            `}
          </Script>
          
          <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "TPLAY-ANIMESHON", url: SITE_URL, inLanguage: ["id-ID", "en-US"], potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` }, query: "required name=search_term_string" } }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "TPLAY-ANIMESHON", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico`, width: 32, height: 32 }, sameAs: [] }} />
          
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}
