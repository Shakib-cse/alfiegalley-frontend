"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mic, User, MessageCircle } from "lucide-react";

export default function PodcastBenefits() {
  const items = [
    {
      icon: <Mic className="w-6 h-6 text-primary" />,
      title: "Most Recent Topics",
      desc: "Stay up-to-date with the freshest discussions with insights on current events, trending stories, and expert interviews.",
    },
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "Famous Speaker",
      desc: "Engage with visionary leaders and influencers as they share expertise, stories, and perspectives on our podcast.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Support All Platform",
      desc: "Enjoy seamless access on any device. UpBeat Africa ensures you’re always connected to your favorite content, anytime, anywhere.",
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Why you should listen
          <br />
          to our <span className="text-primary">podcast</span>
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {items.map((item, index) => (
            <Card
              key={index}
              className="bg-primary text-background rounded-2xl shadow-md border-none"
            >
              <CardContent className="p-6 text-left">
                <div className="flex items-center justify-center w-12 h-12 bg-background/20 rounded-full mb-4">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                <p className="text-sm text-background/90 leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= NEWSLETTER SECTION =================

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Subscribe Our <span className="text-primary">Newsletter</span>
        </h2>

        {/* Description */}
        <p className="text-foreground/70 mt-4 text-sm md:text-base leading-relaxed">
          Get the latest insights, stories, and updates delivered directly to
          your inbox. Join the Essex Estuary Radio community today!
        </p>

        {/* Input + Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-full bg-background border-none focus-visible:ring-0 px-6"
          />

          <Button className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-background">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

// ================= NEWS HERO BANNER =================

import Image from "next/image";

export function NewsHeroBanner() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden">
          {/* Background Image */}
          <Image
            src="/icons/newsLayout/hero.png"
            alt="News Banner"
            fill
            className="object-cover"
            priority
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-end p-6 md:p-10">
            <div className="text-background max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold">News</h2>
              <p className="mt-2 text-sm md:text-base text-background/90">
                Stay informed with Essex Estuary Radio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
