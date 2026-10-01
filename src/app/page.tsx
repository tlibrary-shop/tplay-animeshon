import { API_URL } from "@/utils/config";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "TPLAY-ANIMESHON - Nonton Anime Sub Indo Terbaru",
  description: "TPLAY-ANIMESHON - Nonton anime subtitle Indonesia terbaru dengan episode lengkap, jadwal tayang, genre, dan update anime harian.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "TPLAY-ANIMESHON - Nonton Anime Sub Indo Terbaru",
    description: "Streaming anime subtitle Indonesia terbaru dengan episode lengkap di TPLAY-ANIMESHON.",
    url: SITE_URL,
    type: "website",
  },
};

async function getInitialNewAnime() {
  try {
    const response = await fetch(`${API_URL}/new-anime`, { next: { revalidate: 60 } });
    if (!response.ok) return { data: [] };
    return await response.json();
  } catch {
    return { data: [] };
  }
}

export default async function HomePage() {
  const initialNewAnime = await getInitialNewAnime();
  return <main><HomeClient initialNewAnime={initialNewAnime} /><section className="mx-auto max-w-5xl px-4 py-10 text-gray-300" aria-labelledby="tentang-anistream"><h2 id="tentang-anistream" classN[...]
}
