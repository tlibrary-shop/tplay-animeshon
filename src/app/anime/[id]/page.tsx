import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimeClient from "./AnimeClient";
import { JsonLd } from "@/components/Seo/JsonLd";
import { getAnime, getAnimeDescription, getGenres, getPoster, seoAnimeDescription } from "@/utils/anime";
import { SITE_URL } from "@/utils/config";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const anime = await getAnime(id);
  const title = anime?.title || id.replace(/[-_]/g, " ");
  const description = anime ? seoAnimeDescription(anime, title) : `Nonton anime ${title} subtitle Indonesia dengan episode terbaru di AniStream.`;
  const canonical = `${SITE_URL}/anime/${encodeURIComponent(id)}`;
  return {
    title: `Nonton ${title} Sub Indo | Episode Lengkap`,
    description,
    keywords: [
      `nonton anime ${title}`,
      `nonton ${title} sub indo`,
      `${title} episode terbaru`,
      `${title} subtitle Indonesia`,
    ],
    alternates: { canonical },
    openGraph: { title: `Nonton ${title} Sub Indo`, description, url: canonical, type: "video.tv_show", images: [{ url: anime ? getPoster(anime) : `${SITE_URL}/banner.png` }] },
  };
}

export default async function AnimePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const anime = await getAnime(id);
  if (!anime) notFound();
  const title = anime.title || id;
  const description = seoAnimeDescription(anime, title);
  const genres = getGenres(anime);
  const poster = getPoster(anime);
  const canonical = `${SITE_URL}/anime/${encodeURIComponent(id)}`;
  const episodes = (anime.episodes || [])
    .filter((episode) => episode.episode != null)
    .sort((a, b) => {
      const episodeA = Number(a.episode);
      const episodeB = Number(b.episode);

      if (Number.isNaN(episodeA)) return 1;
      if (Number.isNaN(episodeB)) return -1;
      return episodeB - episodeA;
    });
  const schema = {
    "@context": "https://schema.org", "@type": "TVSeries", "@id": `${canonical}#series`, name: title,
    alternateName: [anime.english_title, anime.japanese_title].filter(Boolean), description,
    image: [poster], url: canonical,
    genre: genres, inLanguage: "id-ID", isFamilyFriendly: true,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    aggregateRating: anime.rating ? { "@type": "AggregateRating", ratingValue: Number(anime.rating), ratingCount: Number(anime.rating_count || 1), bestRating: 10 } : undefined,
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Anime", item: `${SITE_URL}/latest` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };
  const episodeList = episodes.length > 0 ? {
    "@context": "https://schema.org", "@type": "ItemList", name: `Episode ${title}`,
    itemListElement: episodes.map((episode, index) => ({
      "@type": "ListItem", position: index + 1,
      name: episode.title || `Episode ${episode.episode}`,
      url: `${SITE_URL}/watch/${encodeURIComponent(id)}/${encodeURIComponent(String(episode.episode))}`,
    })),
  } : null;
  return <>
    <JsonLd data={schema} />
    <JsonLd data={breadcrumb} />
    {episodeList && <JsonLd data={episodeList} />}
    <section className="px-4 pt-24 pb-6 md:px-16 md:pt-28 bg-gray-900" aria-label={`Informasi ${title}`}>
      <h1 className="text-2xl md:text-3xl font-semibold">Nonton {title} Sub Indo</h1>
      <p className="mt-3 max-w-4xl text-gray-300 leading-7">{description}</p>
      {genres.length > 0 && <p className="mt-2 text-sm text-gray-400">Genre: {genres.join(", ")}</p>}
      {episodes.length > 0 && (
        <nav aria-label={`Daftar episode ${title}`}>
          <h2>Daftar Episode {title}</h2>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {episodes.map((episode) => (
              <li key={String(episode.episode)}>
                <a href={`${SITE_URL}/watch/${encodeURIComponent(id)}/${encodeURIComponent(String(episode.episode))}`}>
                  {title} {episode.title || `Episode ${episode.episode}`} Sub Indo
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
    <AnimeClient params={Promise.resolve({ id })} />
  </>;
}
