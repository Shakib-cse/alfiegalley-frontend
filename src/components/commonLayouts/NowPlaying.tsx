"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function NowPlaying() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 text-center">
        {/* TITLE */}
        <h2 className="text-3xl font-semibold mb-8">
          Now <span className="text-primary">Playing</span>
        </h2>

        {/* CARD */}
        <Card className="relative p-6 rounded-2xl bg-background overflow-hidden border-0 ring-0">
          {/* WAVEFORM BACKGROUND - RIGHT SIDE */}
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/2 items-center justify-end gap-[4px] pr-6 pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={i}
                className="w-[6px] bg-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 50 + 15}px`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* CONTENT - POSITIONED ON TOP LEFT */}
          <div className="relative z-10 flex items-center gap-4">
            {/* PLAY BUTTON */}
            <Button
            size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 flex-shrink-0"
            >
              <Play className="text-background fill-background w-6 h-6" />
            </Button>

            {/* TEXT */}
            <div className="text-left">
              <h3 className="font-semibold text-lg">Life Chill Music</h3>
              <p className="text-sm text-foreground">
                Radio streaming by{" "}
                <span className="font-medium">Alex Kabir</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
