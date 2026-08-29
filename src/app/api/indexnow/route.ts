import { NextResponse } from "next/server";
import { submitIndexNow } from "@/utils/indexNow";

export async function POST(request: Request) {
  const secret = request.headers.get("x-indexnow-secret");
  if (!process.env.INDEXNOW_SECRET || secret !== process.env.INDEXNOW_SECRET) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: unknown = await request.json().catch(() => ({}));
  const candidate = body && typeof body === "object" ? body as { urls?: unknown } : {};
  const urls = Array.isArray(candidate.urls) ? candidate.urls.filter((url: unknown): url is string => typeof url === "string") : [];
  return NextResponse.json(await submitIndexNow(urls));
}
