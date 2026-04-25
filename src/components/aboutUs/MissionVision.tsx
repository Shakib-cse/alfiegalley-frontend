"use client";

import { Target, Binoculars } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="w-full bg-background py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* CARD 1 */}
        <div className="bg-secondary rounded-2xl p-8 shadow-sm">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-primary mb-6">
            <Target className="text-background w-6 h-6" />
          </div>

          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Our Mission
          </h3>

          <p className="text-foreground/50 leading-relaxed text-lg">
            To deliver great music and engaging audio content seamlessly. We
            strive to provide reliable and up-to-date news via trusted sources
            while ensuring a smooth, enjoyable, and uninterrupted listening
            experience.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-secondary rounded-2xl p-8 shadow-sm">
          <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-primary mb-6">
            <Binoculars className="text-background w-6 h-6" />
          </div>

          <h3 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h3>

          <p className="text-foreground/50 leading-relaxed text-lg">
            To become the leading digital-first radio destination, breaking the
            boundaries of traditional broadcasting by merging high-fidelity
            audio with real-time global news in one distraction-free platform.
          </p>
        </div>
      </div>
    </section>
  );
}
