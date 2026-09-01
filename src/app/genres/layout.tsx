import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export const metadata: Metadata = { title: "Genre Anime Sub Indo", description: "Jelajahi genre anime seperti action, romance, fantasy, comedy, dan isekai dengan subtitle Indonesia di AniStream.", alternates: { canonical: `${SITE_URL}/genres` } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
