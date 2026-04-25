"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Pause, Play, Radio, WifiOff } from "lucide-react";
import { useMemo } from "react";
import { useRadioPlayer } from "@/components/commonLayouts/RadioPlayerProvider";

export default function NowPlaying() {
  const { isPlaying, status, streamUrl, togglePlayback } = useRadioPlayer();

  const waveform = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        key: index,
        height: `${18 + ((index * 7) % 42)}px`,
        delay: `${index * 0.045}s`,
      })),
    [],
  );

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 text-center">
        {/* TITLE */}
        <h2 className="text-3xl font-semibold mb-8">
          Live <span className="text-primary">Radio</span>
        </h2>

        {/* CARD */}
        <Card className="relative overflow-hidden rounded-2xl border-0 bg-background p-6 ring-0">
          {/* CONTENT */}
          <div className="relative z-10 grid gap-5 text-left md:grid-cols-3 md:items-center md:gap-6">
            <div className="flex items-center gap-4 md:flex-1">
              {/* PLAY BUTTON */}
              <Button
                size="icon"
                onClick={togglePlayback}
                className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shrink-0"
                aria-label={isPlaying ? "Pause live radio" : "Play live radio"}
              >
                {status === "loading" ? (
                  <Loader2 className="h-6 w-6 animate-spin text-background" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6 fill-background text-background" />
                ) : (
                  <Play className="h-6 w-6 fill-background text-background" />
                )}
              </Button>

              {/* TEXT */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  <Radio className="h-4 w-4" />
                  Live Stream
                </div>
                <h3 className="text-lg font-semibold">Live365 Radio Stream</h3>
                <p className="text-sm text-foreground/70">
                  Streaming live audio for the station audience.
                </p>
              </div>
            </div>

            <div className="hidden md:flex md:flex-1 items-center justify-center gap-1 overflow-hidden opacity-60">
              {waveform.map((bar) => (
                <span
                  key={bar.key}
                  className="w-1.5 rounded-full bg-primary animate-pulse"
                  style={{
                    height: bar.height,
                    animationDelay: bar.delay,
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col items-start gap-2 md:min-w-65 md:items-end md:text-right">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {isPlaying ? "On Air" : "Tap to listen"}
              </span>

              <p className="max-w-65 text-xs text-foreground/60">
                {status === "error"
                  ? "The stream could not be started. Try again."
                  : status === "loading"
                    ? "Connecting to the live stream..."
                    : `Source: ${streamUrl}`}
              </p>
            </div>
          </div>

          {status === "error" ? (
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
              <WifiOff className="h-4 w-4" />
              Live audio is temporarily unavailable.
            </div>
          ) : null}
        </Card>
      </div>
    </section>
  );
}
