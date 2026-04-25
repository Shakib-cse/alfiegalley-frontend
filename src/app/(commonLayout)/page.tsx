import RadioBanner from "@/components/commonLayouts/Banner";
import HomeNewsPreview from "@/components/commonLayouts/HomeNewsPreview";
import NewsCategories from "@/components/commonLayouts/NewsCategories";
import { NewsletterSection } from "@/components/commonLayouts/NewsletterSection";
import NowPlaying from "@/components/commonLayouts/NowPlaying";
import PodcastBenefits from "@/components/commonLayouts/PodcastBenefits";

export default function Home() {
  return (
    <main>
      <RadioBanner />
      <NowPlaying />
      <HomeNewsPreview />
      <NewsCategories />
      <PodcastBenefits />
      <NewsletterSection />
    </main>
  );
}
