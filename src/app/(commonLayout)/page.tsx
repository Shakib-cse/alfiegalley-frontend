import RadioBanner from "@/components/commonLayouts/Banner";
import LatestEpisodes from "@/components/commonLayouts/LatestEpisodes";
import NewsCategories from "@/components/commonLayouts/NewsCategories";
import { NewsletterSection } from "@/components/commonLayouts/NewsletterSection";
import NowPlaying from "@/components/commonLayouts/NowPlaying";
import PodcastBenefits from "@/components/commonLayouts/PodcastBenefits";

export default function Home() {
  return (
    <main>
      <RadioBanner />
      <NowPlaying />
      <LatestEpisodes />
      <NewsCategories />
      <PodcastBenefits />
      <NewsletterSection />
    </main>
  );
}
