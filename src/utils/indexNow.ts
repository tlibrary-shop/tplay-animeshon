import { SITE_URL } from "./config";

const endpoint = "https://api.indexnow.org/indexnow";

export async function submitIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || urls.length === 0) return { submitted: false, reason: "INDEXNOW_KEY belum dikonfigurasi" };
  const host = new URL(SITE_URL).hostname;
  const response = await fetch(endpoint, {
    method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList: [...new Set(urls)].slice(0, 10_000) }),
  });
  return { submitted: response.ok, status: response.status };
}
