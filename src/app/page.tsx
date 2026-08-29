import { API_URL } from "@/utils/config";
import HomeClient from "./HomeClient";

export const revalidate = 60;

async function getInitialNewAnime() {
  try {
    const response = await fetch(`${API_URL}/new-anime`, { next: { revalidate: 60 } });
    if (!response.ok) return { data: [] };
    return await response.json();
  } catch {
    return { data: [] };
  }
}

export default async function HomePage() {
  const initialNewAnime = await getInitialNewAnime();
  return <HomeClient initialNewAnime={initialNewAnime} />;
}
