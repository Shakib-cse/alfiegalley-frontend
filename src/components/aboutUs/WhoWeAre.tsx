"use client";

import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Who </span>
            <span className="text-primary">We Are</span>
          </h2>

          <p className="text-foreground/50 text-lg leading-relaxed mb-5">
            We are a modern digital radio platform dedicated to bringing you the
            best in live audio streaming and up-to-the-minute news. We believe
            that radio should be accessible, simple, and of the highest quality.
          </p>

          <p className="text-foreground/50 text-lg leading-relaxed">
            Whether you&apos;re at home, commuting, or at work, you can tune in
            anytime, anywhere, and immerse yourself in a curated audio
            experience designed for the modern listener.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full">
          <div className="relative w-full h-87.5 md:h-100 rounded-2xl overflow-hidden">
            <Image
              src="/icons/aboutUs/Image.png" // replace with your image
              alt="Who We Are"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
