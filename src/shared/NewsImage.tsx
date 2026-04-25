"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/icons/newsLayout/newsHero.png";

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

  return trimmed.replaceAll("&amp;", "&");
}

export default function NewsImage({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const normalizedSrc = normalizeImageSrc(src);
  const resolvedSrc = hasError ? FALLBACK_IMAGE : normalizedSrc;

  return (
    <div className="relative h-72 w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-foreground/10" />
      )}

      <Image
        src={resolvedSrc}
        alt={alt || "image"}
        fill
        unoptimized={
          resolvedSrc.startsWith("http://") ||
          resolvedSrc.startsWith("https://")
        }
        className={`object-cover transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 768px) 100vw, 33vw"
        placeholder="blur"
        blurDataURL="/icons/newsLayout/news.jpeg"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
