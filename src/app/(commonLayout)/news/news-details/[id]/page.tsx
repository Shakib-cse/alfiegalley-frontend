import Link from "next/link";
import { notFound } from "next/navigation";
import ReleventNews from "@/components/newsDetails/ReleventNews";
import { fetchAllNewsFeedItems, getRelatedNewsItems } from "@/lib/news-feed";

const FALLBACK_IMAGE = "/icons/newsLayout/news.jpeg";

function normalizeImageSrc(src?: string) {
  if (!src) {
    return FALLBACK_IMAGE;
  }

  const trimmed = src.trim();

  if (!trimmed) {
    return FALLBACK_IMAGE;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  const normalized = trimmed.replaceAll("&amp;", "&");

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("/")
  ) {
    return normalized;
  }

  return FALLBACK_IMAGE;
}

type NewsDetailsPageProps = {
  params:
    | {
        id: string;
      }
    | Promise<{
        id: string;
      }>;
};

export default async function NewsDetailsPage({
  params,
}: NewsDetailsPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const items = await fetchAllNewsFeedItems();
  const news = items.find((item) => item.id === resolvedParams.id);

  if (!news) {
    notFound();
  }

  const relatedNews = getRelatedNewsItems(items, news);
  const paragraphs = news.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const imageSrc = normalizeImageSrc(news.image ?? undefined);

  return (
    <div className="w-full bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div>
          <article className="space-y-6">
            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                {news.categoryLabel}
              </span>
              <span>{news.publishedLabel}</span>
              <span>{news.source}</span>
            </div>

            <div className="overflow-hidden rounded-3xl bg-foreground/5">
              <div className="relative aspect-video w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={news.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            <p className="rounded-2xl bg-foreground/5 p-5 text-base leading-7 text-foreground/75 md:text-lg">
              {news.summary}
            </p>

            <div className="space-y-5 text-base leading-8 text-foreground/80 md:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={`${news.id}-paragraph-${index}`}>{paragraph}</p>
              ))}
            </div>

            {news.sourceUrl ? (
              <div>
                <Link
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-primary/90"
                >
                  Read original article
                </Link>
              </div>
            ) : null}
          </article>

          {/* <aside className="space-y-6">
            <div className="rounded-3xl border border-foreground/10 bg-background p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">
                Story details
              </h2>
              <dl className="mt-4 space-y-3 text-sm text-foreground/70">
                <div className="flex items-center justify-between gap-4">
                  <dt>Category</dt>
                  <dd className="font-medium text-foreground">
                    {news.categoryLabel}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt>Published</dt>
                  <dd className="font-medium text-foreground">
                    {news.publishedLabel}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt>Estimated reading time</dt>
                  <dd className="font-medium text-foreground">
                    {readingMinutes} min
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt>Source</dt>
                  <dd className="font-medium text-foreground">{news.source}</dd>
                </div>
              </dl>
            </div>
          </aside> */}
        </div>

        <div className="mt-10">
          <ReleventNews items={relatedNews} />
        </div>
      </div>
    </div>
  );
}
