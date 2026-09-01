import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export const metadata: Metadata = { title: "Anime Terbaru Sub Indo", description: "Temukan daftar anime terbaru dan episode update terkini dengan subtitle Indonesia di AniStream.", alternates: { canonical: `${SITE_URL}/latest` } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
