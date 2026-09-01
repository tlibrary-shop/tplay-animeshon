import type { Metadata } from "next";
import { SITE_URL } from "@/utils/config";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const name = slug.replace(/[-_]/g, " "); return { title: `Anime ${name} Sub Indo`, description: `Daftar anime kategori ${name} dengan subtitle Indonesia, episode terbaru, dan informasi tayang di AniStream.`, alternates: { canonical: `${SITE_URL}/category/${encodeURIComponent(slug)}` } }; }
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
