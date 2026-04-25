import { NextRequest, NextResponse } from "next/server";
import { fetchAllNewsFeedItems } from "@/lib/news-feed";
import { NEWS_FEEDS } from "@/lib/news-data";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const items = await fetchAllNewsFeedItems();

  const filteredItems =
    category && category !== "all" && category in NEWS_FEEDS
      ? items.filter((item) => item.categoryKey === category)
      : items;

  return NextResponse.json({
    items: filteredItems,
    total: filteredItems.length,
    updatedAt: new Date().toISOString(),
  });
}
