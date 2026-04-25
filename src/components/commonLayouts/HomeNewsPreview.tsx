"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { NewsFeedItem } from "@/lib/news-data";

export default function HomeNewsPreview() {
  const [items, setItems] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadNewsPreview() {
      try {
        setLoading(true);

        const response = await fetch("/api/news", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load latest news");
        }

        const payload = (await response.json()) as { items?: NewsFeedItem[] };
        setItems(payload.items ?? []);
        setError(null);
      } catch (loadError) {
        if ((loadError as Error).name !== "AbortError") {
          setError("We could not load the latest headlines right now.");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadNewsPreview();

    return () => controller.abort();
  }, []);

  const previewItems = useMemo(() => items.slice(0, 4), [items]);

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Latest <span className="text-primary">News</span>
          </h2>
        </div>

        {loading ? (
          <div className="mx-auto mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-2xl bg-background"
              />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="mx-auto mt-10 rounded-2xl border border-foreground/10 bg-background p-6 text-sm text-foreground/70">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mx-auto mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {previewItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden rounded-2xl border border-foreground/10 bg-background p-0 ring-0"
              >
                <div className="relative h-44 w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "/icons/newsLayout/newsHero.png"}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <CardContent className="flex h-52 flex-col p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-foreground/65">
                    {item.summary}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-foreground/45">
                    <span>{item.publishedLabel}</span>
                    <span>{item.categoryLabel}</span>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="mt-auto h-9 w-full rounded-xl border-foreground/30 text-sm font-semibold text-foreground hover:bg-foreground/10"
                  >
                    <Link href={`/news/news-details/${item.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {!loading && !error && previewItems.length === 0 ? (
          <div className="mx-auto mt-10 rounded-2xl border border-foreground/10 bg-background p-6 text-sm text-foreground/70">
            No headlines are available right now.
          </div>
        ) : null}

        {!loading && !error && previewItems.length > 0 ? (
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              className="h-10 rounded-lg bg-primary px-6 text-sm font-semibold text-background hover:bg-primary/90"
            >
              <Link href="/news">View All News</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
