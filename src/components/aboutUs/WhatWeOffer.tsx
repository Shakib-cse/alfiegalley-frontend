"use client";

import { Radio, Newspaper, Sparkles } from "lucide-react";

export default function WhatWeOffer() {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 text-center">
        {/* HEADER */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-foreground">What We </span>
          <span className="text-primary">Offer</span>
        </h2>

        <p className="text-foreground/50 text-lg mb-12">
          Everything you need, nothing you don’t.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* CARD 1 */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-secondary mb-6">
              <Radio className="text-primary w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              Live 24/7 Streaming
            </h3>

            <p className="text-foreground/50 leading-relaxed">
              Continuous, high-quality audio streaming that never stops. Your
              favorite tracks and shows available around the clock.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-secondary mb-6">
              <Newspaper className="text-primary w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              Real-Time News
            </h3>

            <p className="text-foreground/50 leading-relaxed">
              Stay informed with live updates from trusted RSS feeds spanning
              business, entertainment, politics, and more.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-background rounded-2xl p-8 shadow-sm">
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-secondary mb-6">
              <Sparkles className="text-primary w-6 h-6" />
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-3">
              Distraction-Free UX
            </h3>

            <p className="text-foreground/50 leading-relaxed">
              An easy-to-use, minimalist interface designed purely for the joy
              of listening and seamless reading.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
