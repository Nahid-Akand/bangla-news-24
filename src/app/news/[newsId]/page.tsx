import Image from "next/image";
import type { ReactNode } from "react";

interface NewsDetailsProps {
  params: Promise<{
    newsId: string;
  }>;
}

function renderArticleContent(value: unknown): ReactNode {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <div key={index}>{renderArticleContent(item)}</div>
    ));
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;

    // Handle nested article blocks
    if ("blocks" in obj) {
      return renderArticleContent(obj.blocks);
    }

    // Handle common text and content properties
    for (const key of [
      "text",
      "children",
      "content",
      "value",
      "data",
    ]) {
      if (key in obj) {
        return renderArticleContent(obj[key]);
      }
    }
  }

  return null;
}

export default async function NewsDetails({
  params,
}: NewsDetailsProps) {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news details");
  }

  const data = await res.json();
  const news = data.data;

  if (!news) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-center text-lg text-gray-500">
          সংবাদ পাওয়া যায়নি।
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* News Image */}
        {typeof news.imageUrl === "string" &&
          news.imageUrl.length > 0 && (
            <div className="relative aspect-video w-full bg-gray-100">
              <Image
                src={news.imageUrl}
                alt={
                  typeof news.imageAlt === "string"
                    ? news.imageAlt
                    : news.title || "সংবাদের ছবি"
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

        {/* News Content */}
        <div className="p-5 sm:p-8 lg:p-10">
          {/* Category */}
          {typeof news.category === "string" && (
            <span className="inline-block rounded-md bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
              {news.category}
            </span>
          )}

          {/* Title */}
          <h1 className="mt-4 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {typeof news.title === "string"
              ? news.title
              : "সংবাদের বিস্তারিত"}
          </h1>

          {/* Description */}
          {typeof news.description === "string" &&
            news.description && (
              <p className="mt-5 border-l-4 border-red-600 pl-4 text-lg leading-8 text-gray-600">
                {news.description}
              </p>
            )}

          <div className="my-6 border-t border-gray-200" />

          {/* Full Article */}
          <div className="space-y-5 text-base leading-8 text-gray-700 sm:text-lg">
            {renderArticleContent(news.text)}
          </div>
        </div>
      </article>
    </main>
  );
}
