"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  NEWS_FILTERS,
  type NewsFeedFilterKey,
  type NewsFeedItem,
} from "@/lib/news-data";

export default function NewsroomSection() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] =
    useState<NewsFeedFilterKey>("all");
  const [news, setNews] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    const controller = new AbortController();

    async function loadNews() {
      try {
        setLoading(true);
        const response = await fetch("/api/news", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load news feed");
        }

        const payload = (await response.json()) as { items?: NewsFeedItem[] };
        setNews(payload.items ?? []);
        setError(null);
      } catch (loadError) {
        if ((loadError as Error).name !== "AbortError") {
          setError("We could not load the latest news right now.");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadNews();

    return () => controller.abort();
  }, []);

  const filteredNews = useMemo(() => {
    if (selectedFilter === "all") {
      return news;
    }
    return news.filter((item) => item.categoryKey === selectedFilter);
  }, [selectedFilter, news]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter as NewsFeedFilterKey);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="w-full py-8">
      <div className="mx-auto container px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Latest News From <span className="text-primary">Sky News</span>
        </h2>

        {/* Filter pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {NEWS_FILTERS.map((filter) => {
            const active = filter.key === selectedFilter;
            return (
              <Button
                key={filter.key}
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange(filter.key)}
                className={cn(
                  "h-8 rounded-full border-foreground/40 bg-background px-4 text-xs font-medium text-foreground/50",
                  active &&
                    "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15",
                )}
              >
                {filter.label}
              </Button>
            );
          })}
        </div>

        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-88 animate-pulse rounded-2xl bg-foreground/5"
              />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="mt-6 rounded-2xl border border-foreground/10 bg-background p-6 text-sm text-foreground/70">
            {error}
          </div>
        ) : null}

        {/* Cards grid */}
        {!loading && !error ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedNews.map((item) => (
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

                <CardContent className="flex h-52 flex-col p-4">
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

                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-foreground/65 mb-3">
                    {item.summary}
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => router.push(`/news/news-details/${item.id}`)}
                    className="mt-auto h-9 w-full rounded-xl border-foreground/40 bg-background text-sm cursor-pointer font-semibold text-foreground hover:bg-foreground/10"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {!loading && !error && filteredNews.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-foreground/10 bg-background p-6 text-sm text-foreground/70">
            No articles are available for this category right now.
          </div>
        ) : null}

        {/* Bottom nav */}
        {!loading && !error && totalPages > 0 ? (
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    index + 1 === currentPage
                      ? "bg-primary w-6"
                      : "bg-foreground/30",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                variant="outline"
                className="h-10 rounded-xl border-foreground/40 px-6 text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="h-10 rounded-xl bg-primary px-8 text-background hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
