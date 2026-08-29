import { NextResponse } from "next/server";
import { submitIndexNow } from "@/utils/indexNow";

export async function POST(request: Request) {
  const secret = request.headers.get("x-indexnow-secret");
  if (!process.env.INDEXNOW_SECRET || secret !== process.env.INDEXNOW_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const urls = Array.isArray(body.urls) ? body.urls.filter((url): url is string => typeof url === "string") : [];
  return NextResponse.json(await submitIndexNow(urls));
}
