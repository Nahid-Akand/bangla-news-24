import React from 'react';

interface MostReadNews {
    id: string;
    title: string;
}

const MostRead = async() => {
   const res = await fetch(
  "https://news-api-v2.vercel.app/api/news/most-read",
  {
    cache: "force-cache",
  }
);

const data = await res.json();
const news: MostReadNews[] = data.data;
    return (
       
<div className="card overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
    <div className="flex items-center gap-3">
      <div className="h-7 w-1 rounded-full bg-red-600" />
      <h1 className="text-lg font-extrabold text-gray-900">
        সর্বাধিক পঠিত
      </h1>
    </div>

    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
      জনপ্রিয়
    </span>
  </div>

  {/* News list */}
  <div className="divide-y divide-gray-100 px-5">
    {news.map((n, i) => (
      <article
        key={n.id}
        className="group flex gap-4 py-4 transition-colors"
      >
        {/* Ranking number */}
        <div className="flex w-9 shrink-0 items-start justify-center">
          <span
            className={`text-2xl font-black leading-none ${
              i < 10 ? "text-red-600" : "text-gray-300"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Headline */}
        <div className="flex-1">
          <h2 className="text-sm font-semibold leading-6 text-gray-800 transition-colors group-hover:text-red-700 sm:text-base">
            {n.title}
          </h2>
        </div>

        {/* Arrow */}
        <span className="pt-1 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-red-600">
          →
        </span>
      </article>
    ))}
  </div>

  {/* Footer */}
  <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
    <p className="text-center text-xs font-medium text-gray-500">
      পাঠকদের পছন্দের সংবাদ
    </p>
  </div>
</div>

    );
};

export default MostRead;