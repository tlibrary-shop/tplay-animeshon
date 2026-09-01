import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const name = id.replace(/[-_]/g, " "); const description = `Kumpulan anime genre ${name} subtitle Indonesia di AniStream. Lihat judul populer, episode terbaru, rating, dan update pilihan.`; return { title: `Anime Genre ${name} Sub Indo`, description, alternates: { canonical: `${SITE_URL}/genres/${encodeURIComponent(id)}` }, robots: { index: true, follow: true } }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
