"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { NewsFeedItem } from "@/lib/news-data";

type ReleventNewsProps = {
  items: NewsFeedItem[];
};

export default function ReleventNews({ items }: ReleventNewsProps) {
  const router = useRouter();

  const displayedNews = items.slice(0, 3);

  if (displayedNews.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8">
      <div className="mx-auto container px-4">
        {/* Title */}
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Related <span className="text-primary">News</span>
        </h2>

        {/* Cards grid - 3 columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedNews.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-2xl border-background bg-background ring-0 p-0 border-0 shadow-sm transition-shadow duration-300"
            >
              <div className="relative h-72 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || "/icons/newsLayout/newsHero.png"}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Badge className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-background hover:bg-primary">
                    {item.categoryLabel}
                  </Badge>
                  <span className="text-xs text-foreground/50">
                    {item.publishedLabel}
                  </span>
                </div>

                <h3 className="line-clamp-2 min-h-[2.8rem] text-sm font-medium leading-5 text-foreground">
                  {item.title}
                </h3>

                <Button
                  variant="outline"
                  onClick={() => router.push(`/news/news-details/${item.id}`)}
                  className="mt-4 h-9 w-full rounded-xl border-foreground/40 bg-background text-sm font-semibold text-foreground hover:bg-foreground/10"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
