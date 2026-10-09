import { Suspense } from "react";
import NewsCard from "@/components/NewsCard";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface CategoryNewsProps {
  params: Promise<{
    categoryId: string;
  }>;
}

async function CategoryNewsContent({ params }: CategoryNewsProps) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${encodeURIComponent(categoryId)}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category news");
  }

  const data = await res.json();
  const categoryNews: News[] = Array.isArray(data.data)
    ? data.data
    : [];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">
      <h1 className="mb-5 border-b-2 border-red-600 pb-3 text-2xl font-bold">
        {data.title || "বিভাগের সংবাদ"}
      </h1>

      {categoryNews.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          কোনো সংবাদ পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
}

export default function CategoryNewsPage({
  params,
}: CategoryNewsProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          সংবাদ লোড হচ্ছে...
        </div>
      }
    >
      <CategoryNewsContent params={params} />
    </Suspense>
  );
}
