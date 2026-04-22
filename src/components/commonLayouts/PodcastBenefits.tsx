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
    <section className="w-full pt-16 bg-secondary">
      <div className="container mx-auto px-4 text-center pb-70 bg-secondary">
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
              style={{
                backgroundImage: "url('/icons/commonLayout/cardSmallBg.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right top",
              }}
            >
              <CardContent className="p-6 text-left">
                <div className="flex items-center justify-center w-12 h-12 bg-background rounded-full mb-4">
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
      <div className="bg-foreground py-20"></div>
    </section>
  );
}
