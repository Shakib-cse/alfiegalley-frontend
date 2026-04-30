"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const episodes = [
  {
    title: "Find Your Peace Right Now With This Methods",
    image: "/icons/commonLayout/card1.png",
    duration: "1hr 30m",
  },
  {
    title: "Inner Harmony: Guided Meditation",
    image: "/icons/commonLayout/card2.png",
    duration: "1hr 30m",
  },
  {
    title: "Unlocking Serenity: Simple Techniques",
    image: "/icons/commonLayout/card3.png",
    duration: "1hr 30m",
  },
  {
    title: "Achieve Mindfulness: Simple Exercises",
    image: "/icons/commonLayout/card4.png",
    duration: "1hr 30m",
  },
];

export default function LatestEpisodes() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Latest <span className="text-primary">Episodes</span>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {episodes.map((item, i) => (
            <Card
              key={i}
              className="rounded-2xl overflow-hidden bg-background ring-0 p-0"
            >
              <CardContent className="p-4">
                {/* IMAGE */}
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-80 object-cover"
                  />

                  {/* PLAY BUTTON */}
                  <Button
                    size="icon"
                    className="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
                  >
                    <Play className="text-background fill-background w-5 h-5" />
                  </Button>
                </div>

                {/* TEXT */}
                <div className="mt-4">
                  <h3 className="font-medium text-sm leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                    <span>{item.duration}</span>
                    <span>Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 rounded-lg">
            View All Episode
          </Button>
        </div>
      </div>
    </section>
  );
}
