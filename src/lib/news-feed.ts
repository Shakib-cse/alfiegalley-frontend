import "server-only";

import { createHash } from "crypto";
import { XMLParser } from "fast-xml-parser";
import {
  NEWS_FEEDS,
  type NewsFeedCategoryKey,
  type NewsFeedItem,
} from "./news-data";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  processEntities: true,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function textValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const candidate = value as Record<string, unknown>;

  if (typeof candidate["#text"] === "string") {
    return candidate["#text"];
  }

  if (typeof candidate["@_url"] === "string") {
    return candidate["@_url"];
  }

  if (typeof candidate["@_href"] === "string") {
    return candidate["@_href"];
  }

  return "";
}

function stripHtml(value: string): string {
  return value
    .replace(/<\s*\/\s*p\s*>/gi, "\n\n")
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\s*\/\s*h[1-6]\s*>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function createItemId(categoryKey: NewsFeedCategoryKey, uniqueInput: string) {
  return `${categoryKey}-${createHash("sha1").update(uniqueInput).digest("hex").slice(0, 16)}`;
}

function extractImageUrl(item: Record<string, unknown>, summaryHtml: string) {
  const imageCandidates = [
    textValue(item["media:thumbnail"]),
    textValue(item["media:content"]),
    textValue(item.enclosure),
  ].filter(Boolean);

  if (imageCandidates.length > 0) {
    return imageCandidates[0];
  }

  const imageMatch = summaryHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imageMatch?.[1] ?? null;
}

function getNewsMlTextComponent(item: Record<string, unknown>) {
  const outer =
    item.NewsComponent && typeof item.NewsComponent === "object"
      ? (item.NewsComponent as Record<string, unknown>).NewsComponent
      : undefined;

  const components =
    outer && typeof outer === "object"
      ? toArray<Record<string, unknown>>(
          (outer as Record<string, unknown>).NewsComponent as
            | Record<string, unknown>
            | Record<string, unknown>[]
            | undefined,
        )
      : [];

  return (
    components.find(
      (component) =>
        textValue(
          (component.Role as Record<string, unknown> | undefined)?.[
            "@_FormalName"
          ],
        ) === "TEXT",
    ) ?? null
  );
}

function getNewsMlPhotosComponent(item: Record<string, unknown>) {
  const outer =
    item.NewsComponent && typeof item.NewsComponent === "object"
      ? (item.NewsComponent as Record<string, unknown>).NewsComponent
      : undefined;

  const components =
    outer && typeof outer === "object"
      ? toArray<Record<string, unknown>>(
          (outer as Record<string, unknown>).NewsComponent as
            | Record<string, unknown>
            | Record<string, unknown>[]
            | undefined,
        )
      : [];

  return (
    components.find(
      (component) =>
        textValue(
          (component.Role as Record<string, unknown> | undefined)?.[
            "@_FormalName"
          ],
        ) === "PHOTOS",
    ) ?? null
  );
}

function normalizeNewsMlItem(
  categoryKey: NewsFeedCategoryKey,
  item: Record<string, unknown>,
): NewsFeedItem | null {
  const category = NEWS_FEEDS[categoryKey];
  const textComponent = getNewsMlTextComponent(item);

  if (!textComponent) {
    return null;
  }

  const newsLines =
    textComponent.NewsLines && typeof textComponent.NewsLines === "object"
      ? (textComponent.NewsLines as Record<string, unknown>)
      : {};

  const contentItem =
    textComponent.ContentItem && typeof textComponent.ContentItem === "object"
      ? (textComponent.ContentItem as Record<string, unknown>)
      : {};

  const identification =
    item.Identification && typeof item.Identification === "object"
      ? (item.Identification as Record<string, unknown>)
      : {};

  const newsIdentifier =
    identification.NewsIdentifier &&
    typeof identification.NewsIdentifier === "object"
      ? (identification.NewsIdentifier as Record<string, unknown>)
      : {};

  const management =
    item.NewsManagement && typeof item.NewsManagement === "object"
      ? (item.NewsManagement as Record<string, unknown>)
      : {};

  const title = stripHtml(textValue(newsLines.HeadLine));
  const contentHtml =
    textValue(contentItem.DataContent) || textValue(newsLines.SlugLine);
  const content = stripHtml(contentHtml) || title;
  const summary =
    content
      .split(/\n{2,}/)
      .find((paragraph) => paragraph.length > 40)
      ?.trim() ||
    content.slice(0, 220) ||
    title;

  const copyrightLine = textValue(newsLines.CopyrightLine);
  const linkFromCopyright =
    copyrightLine.match(/https?:\/\/[^"'\s<>]+/)?.[0] ?? "";

  const publicIdentifier = textValue(newsIdentifier.PublicIdentifier);
  const itemId = textValue(newsIdentifier.NewsItemId);
  const sourceUrl =
    linkFromCopyright || (itemId ? `https://news.sky.com/story/${itemId}` : "");

  const photosComponent = getNewsMlPhotosComponent(item);
  const photoItems = photosComponent
    ? toArray<Record<string, unknown>>(
        photosComponent.ContentItem as
          | Record<string, unknown>
          | Record<string, unknown>[]
          | undefined,
      )
    : [];

  const image =
    photoItems.map((photo) => textValue(photo["@_Href"])).find(Boolean) ??
    extractImageUrl(item, contentHtml);

  const publishedRaw =
    textValue(management.ThisRevisionCreated) ||
    textValue(management.FirstCreated);
  const isoGuess = publishedRaw
    ? publishedRaw.replace(
        /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,
        "$1-$2-$3T$4:$5:$6Z",
      )
    : "";
  const parsedPublished = isoGuess ? new Date(isoGuess) : null;

  if (!title) {
    return null;
  }

  return {
    id: createItemId(
      categoryKey,
      `${sourceUrl || title}|${publicIdentifier || itemId || title}`,
    ),
    title,
    summary,
    content,
    categoryKey,
    categoryLabel: category.label,
    source: "Sky News",
    sourceUrl,
    image,
    publishedAt:
      parsedPublished && !Number.isNaN(parsedPublished.getTime())
        ? parsedPublished.toISOString()
        : null,
    publishedLabel:
      parsedPublished && !Number.isNaN(parsedPublished.getTime())
        ? dateFormatter.format(parsedPublished)
        : category.label,
    guid: publicIdentifier || itemId || sourceUrl || title,
    feedUrl: category.url,
  };
}

function normalizeFeedItem(
  categoryKey: NewsFeedCategoryKey,
  item: Record<string, unknown>,
): NewsFeedItem | null {
  const category = NEWS_FEEDS[categoryKey];
  const title = stripHtml(textValue(item.title));
  const link = textValue(item.link);
  const guid = textValue(item.guid) || link || title;
  const publishedRaw =
    textValue(item.pubDate) ||
    textValue(item.published) ||
    textValue(item.updated);
  const parsedPublished = publishedRaw ? new Date(publishedRaw) : null;
  const contentHtml =
    textValue(item["content:encoded"]) || textValue(item.description) || title;
  const content = stripHtml(contentHtml) || title;
  const summary =
    content
      .split(/\n{2,}/)
      .find((paragraph) => paragraph.length > 40)
      ?.trim() || content.slice(0, 220);

  if (!title) {
    return null;
  }

  return {
    id: createItemId(categoryKey, `${link || title}|${guid}`),
    title,
    summary: summary || title,
    content,
    categoryKey,
    categoryLabel: category.label,
    source: "Sky News",
    sourceUrl: link,
    image: extractImageUrl(item, contentHtml),
    publishedAt:
      parsedPublished && !Number.isNaN(parsedPublished.getTime())
        ? parsedPublished.toISOString()
        : null,
    publishedLabel:
      parsedPublished && !Number.isNaN(parsedPublished.getTime())
        ? dateFormatter.format(parsedPublished)
        : category.label,
    guid,
    feedUrl: category.url,
  };
}

async function fetchFeedItems(
  categoryKey: NewsFeedCategoryKey,
): Promise<NewsFeedItem[]> {
  const feed = NEWS_FEEDS[categoryKey];
  const response = await fetch(feed.url, {
    headers: {
      "user-agent": "Mozilla/5.0",
      accept: "application/xml, application/rss+xml;q=0.9, */*;q=0.8",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${feed.label} feed`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml) as Record<string, unknown>;

  const newsMlItems =
    parsed.NewsML && typeof parsed.NewsML === "object"
      ? toArray<Record<string, unknown>>(
          (parsed.NewsML as Record<string, unknown>).NewsItem as
            | Record<string, unknown>
            | Record<string, unknown>[]
            | undefined,
        )
      : [];

  if (newsMlItems.length > 0) {
    return newsMlItems
      .map((item) => normalizeNewsMlItem(categoryKey, item))
      .filter((item): item is NewsFeedItem => Boolean(item));
  }

  const channel =
    parsed.rss && typeof parsed.rss === "object"
      ? (parsed.rss as Record<string, unknown>).channel
      : undefined;
  const items = toArray<Record<string, unknown>>(
    channel && typeof channel === "object"
      ? ((channel as Record<string, unknown>).item as
          | Record<string, unknown>
          | Record<string, unknown>[]
          | undefined)
      : undefined,
  );

  return items
    .map((item) => normalizeFeedItem(categoryKey, item))
    .filter((item): item is NewsFeedItem => Boolean(item));
}

export async function fetchAllNewsFeedItems() {
  const results = await Promise.allSettled(
    Object.keys(NEWS_FEEDS).map((categoryKey) =>
      fetchFeedItems(categoryKey as NewsFeedCategoryKey),
    ),
  );

  const items = results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : [],
  );

  const deduped = new Map<string, NewsFeedItem>();

  for (const item of items) {
    const key = item.sourceUrl || item.guid || item.id;

    if (!deduped.has(key)) {
      deduped.set(key, item);
    }
  }

  return Array.from(deduped.values()).sort((left, right) => {
    const leftTime = left.publishedAt ? Date.parse(left.publishedAt) : 0;
    const rightTime = right.publishedAt ? Date.parse(right.publishedAt) : 0;

    return rightTime - leftTime || left.title.localeCompare(right.title);
  });
}

export async function fetchNewsFeedItemById(id: string) {
  const items = await fetchAllNewsFeedItems();
  return items.find((item) => item.id === id) ?? null;
}

export function getRelatedNewsItems(
  items: NewsFeedItem[],
  currentItem: NewsFeedItem,
  limit = 3,
) {
  return items
    .filter(
      (item) =>
        item.id !== currentItem.id &&
        item.categoryKey === currentItem.categoryKey,
    )
    .slice(0, limit);
}
