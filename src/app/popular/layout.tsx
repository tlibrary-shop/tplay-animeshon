import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export const metadata: Metadata = { title: "Anime Populer Sub Indo", description: "Lihat anime populer yang paling banyak ditonton di AniStream, lengkap dengan rating dan episode subtitle Indonesia.", alternates: { canonical: `${SITE_URL}/popular` } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
