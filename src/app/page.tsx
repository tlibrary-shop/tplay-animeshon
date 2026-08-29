import { API_URL } from "@/utils/config";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nonton Anime Sub Indo Terbaru dan Terlengkap",
  description: "Nonton anime subtitle Indonesia terbaru dengan episode lengkap, jadwal tayang, genre, dan update anime harian di AniStream.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Nonton Anime Sub Indo Terbaru dan Terlengkap",
    description: "Streaming anime subtitle Indonesia terbaru dengan episode lengkap di AniStream.",
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
  return <HomeClient initialNewAnime={initialNewAnime} />;
}
