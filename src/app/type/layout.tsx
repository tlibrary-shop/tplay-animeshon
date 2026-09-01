import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export const metadata: Metadata = { title: "Tipe Anime Sub Indo", description: "Pilih anime TV, movie, OVA, ONA, dan special dengan subtitle Indonesia serta update episode terbaru di AniStream.", alternates: { canonical: `${SITE_URL}/type` } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
