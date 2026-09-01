import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const name = slug.replace(/[-_]/g, " "); const label = name === "tv" ? "TV Series" : name.toUpperCase(); const description = `Jelajahi daftar anime ${label} subtitle Indonesia terbaru di AniStream. Temukan episode lengkap, rating, genre, dan update terbaru.`; return { title: `Anime ${label} Sub Indo`, description, alternates: { canonical: `${SITE_URL}/type/${encodeURIComponent(slug)}` }, robots: { index: true, follow: true } }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
