export const LIVE_STREAM_URL = "https://streaming.live365.com/a03806_2";

export const NEWS_FEEDS = {
  home: {
    label: "Home",
    url: "https://feeds.skynews.com/feeds/newsml/home",
  },
  business: {
    label: "Business",
    url: "https://feeds.skynews.com/feeds/newsml/business",
  },
  entertainment: {
    label: "Entertainment",
    url: "https://feeds.skynews.com/feeds/newsml/entertainment",
  },
  politics: {
    label: "Politics",
    url: "https://feeds.skynews.com/feeds/newsml/politics",
  },
  sports: {
    label: "Sports",
    url: "https://feeds.skynews.com/feeds/newsml/sports",
  },
  strangenews: {
    label: "Strange",
    url: "https://feeds.skynews.com/feeds/newsml/strangenews",
  },
  technology: {
    label: "Technology",
    url: "https://feeds.skynews.com/feeds/newsml/technology",
  },
  world: {
    label: "World",
    url: "https://feeds.skynews.com/feeds/newsml/world",
  },
  uk: {
    label: "UK",
    url: "https://feeds.skynews.com/feeds/newsml/uk",
  },
} as const;

export type NewsFeedCategoryKey = keyof typeof NEWS_FEEDS;
export type NewsFeedFilterKey = NewsFeedCategoryKey | "all";

export type NewsFeedItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  categoryKey: NewsFeedCategoryKey;
  categoryLabel: string;
  source: string;
  sourceUrl: string;
  image: string | null;
  publishedAt: string | null;
  publishedLabel: string;
  guid: string;
  feedUrl: string;
};

export const NEWS_FILTERS: Array<{
  key: NewsFeedFilterKey;
  label: string;
}> = [
  { key: "all", label: "All" },
  { key: "home", label: "Home" },
  { key: "uk", label: "UK" },
  { key: "world", label: "World" },
  { key: "technology", label: "Technology" },
  { key: "sports", label: "Sports" },
  { key: "politics", label: "Politics" },
  { key: "entertainment", label: "Entertainment" },
  { key: "business", label: "Business" },
  { key: "strangenews", label: "Strange" },
];
