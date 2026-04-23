"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
};

const filters = [
  "All",
  "Home",
  "Uk",
  "World",
  "Technology",
  "Sports",
  "Politics",
  "Entertainment",
  "Business",
  "Strange",
];

const news: NewsItem[] = [
  {
    id: 1,
    title:
      "Political Tensions Rise as the Verdict Accord Faces Scrutiny. Experts analyze...",
    category: "Politics",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 2,
    title:
      "Zenith Sharks secure a stunning victory in the Intercontinental Cup final...",
    category: "Sports",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 3,
    title:
      "Empowering Minds: Innovative Teaching Methods for Enhanced Learning outcomes...",
    category: "Education",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 4,
    title:
      "Finding Your Focus: Practical Strategies for Staying Motivated and productive...",
    category: "Motivation",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 5,
    title:
      "Tune In: The 'Chatham Zen' Podcast for Daily Mindfulness. Discover practical tips...",
    category: "Podcast",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 6,
    title:
      "Achieving Peak Performance: Expert Strategies for Athletic Success discussed...",
    category: "Sports",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 7,
    title:
      "Mastering Market Volatility: Strategies for Investors. Discover how to manage risk...",
    category: "Business",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 8,
    title:
      "Soothing the Soul: Practical Steps for Achieving Mental Wellness and resilience...",
    category: "Health",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 9,
    title:
      "Unlocking Mindfulness: Scientific Insights for Daily Serenity. Dive into research...",
    category: "Science",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
  {
    id: 10,
    title:
      "Unlocking Mindfulness: Scientific Insights for Daily Serenity. Dive into research...",
    category: "Science",
    date: "20/04/2026",
    image: "/icons/newsLayout/hero.png",
  },
];

export default function NewsroomSection() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const itemsPerPage = 9;

  // Filter news based on selected category
  const filteredNews = useMemo(() => {
    if (selectedFilter === "Home" || selectedFilter === "All") {
      return news;
    }
    return news.filter((item) => item.category === selectedFilter);
  }, [selectedFilter]);

  // Paginate filtered news
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
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
          Latest News From{" "}
          <span className="text-primary">Vibrato Newsroom</span>
        </h2>

        {/* Filter pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = filter === selectedFilter;
            return (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange(filter)}
                className={cn(
                  "h-8 rounded-full border-foreground/40 bg-background px-4 text-xs font-medium text-foreground/50",
                  active &&
                    "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15",
                )}
              >
                {filter}
              </Button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-2xl border-background bg-background ring-0 p-0 border-0 shadow-sm transition-shadow duration-300"
            >
              <div className="relative h-72 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Badge className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-background hover:bg-primary">
                    {item.category}
                  </Badge>
                  <span className="text-xs text-foreground/50">
                    {item.date}
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

        {/* Bottom nav */}
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
      </div>
    </section>
  );
}
