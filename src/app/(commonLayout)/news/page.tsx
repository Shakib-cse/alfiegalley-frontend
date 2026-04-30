import { NewsHeroBanner } from "@/components/newsLayouts/NewsBanner";
import NewsCard from "@/components/newsLayouts/NewsCard";
import React from "react";

export default function page() {
  return (
    <main>
      <NewsHeroBanner />
      <NewsCard />
    </main>
  );
}
