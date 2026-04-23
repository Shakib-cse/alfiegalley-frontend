"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
};

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

export default function ReleventNews() {
  const router = useRouter();

  // Show only first 3 items
  const displayedNews = news.slice(0, 3);

  return (
    <section className="w-full py-8">
      <div className="mx-auto container px-4">
        {/* Title */}
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
          Relevent <span className="text-primary">News</span>
        </h2>

        {/* Cards grid - 3 columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedNews.map((item) => (
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
      </div>
    </section>
  );
}
