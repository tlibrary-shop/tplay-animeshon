import { API_URL } from "@/utils/config";

export type AnimeGenre =
  | string
  | { title?: string; name?: string; tag?: string };

export type AnimeEpisode = {
  episode?: number | string;
  title?: string;
  description?: string;
  detail_eps?: string;
  updated_at?: string;
};

export type AnimeDetail = {
  title?: string;
  english_title?: string;
  japanese_title?: string;
  description?: string;
  descriptions?: string[];
  img?: string;
  poster?: string;
  status?: string;
  released?: string;
  rating?: string | number;
  rating_count?: string | number;
  genres?: AnimeGenre[];
  episodes?: AnimeEpisode[];
};

export type EpisodeDetails = {
  title?: string;
  description?: string;
  videos?: Array<{ video?: string; title?: string; type?: string }>;
};

export async function getAnime(id: string): Promise<AnimeDetail | null> {
  try {
    const response = await fetch(
      `${API_URL}/detail-anime/${encodeURIComponent(id)}`,
      { next: { revalidate: 3600, tags: [`anime:${id}`] } },
    );
    if (!response.ok) return null;
    const json = await response.json();
    return json?.data || json;
  } catch {
    return null;
  }
}

export async function getEpisode(path: string): Promise<EpisodeDetails | null> {
  if (!path.startsWith("/")) return null;

  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 900 },
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json?.data || json;
  } catch {
    return null;
  }
}

export function getAnimeDescription(anime: AnimeDetail, fallback: string) {
  return (
    anime.description || anime.descriptions?.filter(Boolean).join(" ") || fallback
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

export function getPoster(anime: AnimeDetail) {
  return anime.img || anime.poster || "/banner.png";
}

export function getGenres(anime: AnimeDetail) {
  return (anime.genres || [])
    .map((genre) =>
      typeof genre === "string"
        ? genre
        : genre.title || genre.name || genre.tag || "",
    )
    .filter(Boolean);
}

export function episodePath(value: string) {
  return value.startsWith("/") ? value : `/${value}`;
}
