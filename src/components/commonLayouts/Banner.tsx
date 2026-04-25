"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Newspaper, Pause, Play } from "lucide-react";
import { useRadioPlayer } from "./RadioPlayerProvider";
import Link from "next/link";

export default function HeroBanner() {
  const { isPlaying, togglePlayback } = useRadioPlayer();

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-center gap-30 max-w-6xl">
        {/* LEFT IMAGES */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 w-full md:w-auto">
          {/* Large Image */}
          <div className="relative w-[140px] h-[260px] sm:w-[180px] sm:h-[340px] lg:w-[220px] lg:h-[420px] rounded-full overflow-hidden">
            <Image
              src="/icons/commonLayout/banner1.png"
              alt="artist"
              fill
              className="object-cover"
            />
          </div>

          {/* Small Image */}
          <div className="relative w-[110px] h-[260px] sm:w-[140px] sm:h-[340px] lg:w-[160px] lg:h-[420px] rounded-full overflow-hidden">
            <Image
              src="/icons/commonLayout/banner2.png"
              alt="artist"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            Your Sound, Your World. <span className="text-primary">Live</span>{" "}
            24/7
          </h1>

          <p className="mt-4 text-gray-500 text-sm sm:text-base">
            Stream live radio, stay informed with breaking news, and experience
            music and culture – all in one premium destination.
          </p>

          {/* STATS */}
          <div className="flex justify-center md:justify-between gap-6 sm:gap-10 mt-6 sm:mt-8 flex-wrap">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                30+
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Artist at This Studio
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                05+
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Artist at Work Now
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                15+
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Freelance Artist
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button
              asChild
              variant="outline"
              className="gap-2 w-full sm:w-auto bg-background hover:bg-background/70 px-6 py-5"
            >
              <Link href="/news">
                <Newspaper size={16} />
                Explore News
              </Link>
            </Button>

            <Button
              onClick={togglePlayback}
              className="bg-primary text-background hover:bg-primary/90 gap-2 w-full sm:w-auto px-6 py-5 cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "Pause Live Radio" : "Listen Live Radio"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
