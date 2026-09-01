import type { Metadata } from "next";
import GenreClient from "./GenreClient";
import { API_URL, SITE_URL } from "@/utils/config";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> };
type GenreResponse = { data: unknown[]; total_page: number; current_page: number };

async function getGenre(id: string, page: number): Promise<GenreResponse> {
  try { const response = await fetch(`${API_URL}/genre-anime/${encodeURIComponent(id)}?page=${page}`, { next: { revalidate: 600 } }); if (!response.ok) return { data: [], total_page: 0, current_page: page }; return await response.json(); } catch { return { data: [], total_page: 0, current_page: page }; }
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> { const { id } = await params; const { page } = await searchParams; const number = Math.max(1, Number(page) || 1); const name = id.replace(/[-_]/g, " "); const canonical = `${SITE_URL}/genres/${encodeURIComponent(id)}${number > 1 ? `?page=${number}` : ""}`; return { title: `Anime Genre ${name} Sub Indo${number > 1 ? ` - Halaman ${number}` : ""}`, description: `Daftar anime genre ${name} subtitle Indonesia halaman ${number}. Temukan judul, rating, dan episode terbaru di AniStream.`, alternates: { canonical } }; }
export default async function GenrePage({ params, searchParams }: Props) { const { id } = await params; const { page } = await searchParams; const number = Math.max(1, Number(page) || 1); const initialData = await getGenre(id, number); return <GenreClient params={Promise.resolve({ id })} initialData={initialData as never} />; }
