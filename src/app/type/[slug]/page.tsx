import type { Metadata } from "next";
import TypeClient from "./TypeClient";
import { API_URL, SITE_URL } from "@/utils/config";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };
type TypeResponse = { data: unknown[]; total_items: number; current_page: number; total_page: number; type: string };
async function getType(slug: string, page: number): Promise<TypeResponse> { try { const response = await fetch(`${API_URL}/type-anime/${encodeURIComponent(slug)}?page=${page}`, { next: { revalidate: 600 } }); if (!response.ok) return { data: [], total_items: 0, current_page: page, total_page: 0, type: slug }; return await response.json(); } catch { return { data: [], total_items: 0, current_page: page, total_page: 0, type: slug }; } }
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> { const { slug } = await params; const { page } = await searchParams; const number = Math.max(1, Number(page) || 1); const name = slug.replace(/[-_]/g, " "); const canonical = `${SITE_URL}/type/${encodeURIComponent(slug)}${number > 1 ? `?page=${number}` : ""}`; return { title: `Anime ${name} Sub Indo${number > 1 ? ` - Halaman ${number}` : ""}`, description: `Daftar anime tipe ${name} subtitle Indonesia halaman ${number}, lengkap dengan rating dan update episode terbaru.`, alternates: { canonical } }; }
export default async function TypePage({ params, searchParams }: Props) { const { slug } = await params; const { page } = await searchParams; const number = Math.max(1, Number(page) || 1); const initialData = await getType(slug, number); return <TypeClient initialData={initialData as never} />; }
