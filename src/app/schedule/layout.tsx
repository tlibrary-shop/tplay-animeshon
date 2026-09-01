import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export const metadata: Metadata = { title: "Jadwal Rilis Anime Terbaru", description: "Cek jadwal rilis dan update episode anime terbaru setiap hari dengan subtitle Indonesia di AniStream.", alternates: { canonical: `${SITE_URL}/schedule` } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
