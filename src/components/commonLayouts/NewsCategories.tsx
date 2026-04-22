"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Activity, Music, Smile } from "lucide-react";

const categories = [
  {
    title: "Business & Finance",
    icon: Briefcase,
  },
  {
    title: "Sports & Health",
    icon: Activity,
  },
  {
    title: "Music & Movies",
    icon: Music,
  },
  {
    title: "Comedy & Fun Fact",
    icon: Smile,
  },
];

export default function NewsCategories() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT GRID */}
        <div className="grid grid-cols-2 gap-6">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="rounded-2xl border-none bg-secondary ring-0 transition"
                style={{
                  backgroundImage: "url('/icons/commonLayout/cardBg.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardContent className="flex flex-col items-center justify-center py-10 text-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-background">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
            We always bring you the{" "}
            <span className="text-primary">latest news</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            From hard-hitting investigations to cultural trends, stay connected
            to the pulse of the world with our comprehensive coverage and
            diverse perspectives.
          </p>
        </div>
      </div>
    </section>
  );
}
