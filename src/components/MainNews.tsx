import Image from "next/image";
import Link from "next/link";

interface News {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt: string;
}

const MainNews = ({ news }: { news: News[] }) => {
  const [firstNews, ...otherNews] = news;

  if (!firstNews) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">কোনো সংবাদ পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Section Heading */}
      <div className="mb-4 border-b-2 border-red-600 pb-2">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          সর্বশেষ সংবাদ
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Featured News */}
        <Link
          href={`/news/${firstNews.id}`}
          className="group block overflow-hidden rounded-xl border border-gray-200 bg-base-100 shadow-sm transition hover:shadow-lg lg:col-span-3"
        >
          {/* Featured Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt || firstNews.title}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 60vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Featured Content */}
          <div className="p-4 sm:p-5">
            <p className="mb-2 text-sm font-semibold text-red-600">
              {firstNews.category}
            </p>

            <h3 className="text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-700 sm:text-2xl">
              {firstNews.title}
            </h3>

            {firstNews.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600 sm:text-base">
                {firstNews.description}
              </p>
            )}

            <span className="mt-4 inline-block font-semibold text-red-600">
              বিস্তারিত পড়ুন →
            </span>
          </div>
        </Link>

        {/* Other News */}
        <div className="grid content-start gap-3 lg:col-span-2">
          {otherNews.slice(0, 4).map((item) => (
            <Link
              href={`/news/${item.id}`}
              key={item.id}
              className="group rounded-xl border border-gray-200 bg-base-100 p-4 transition hover:border-red-200 hover:shadow-md"
            >
              <p className="mb-2 text-xs font-bold text-red-600">
                {item.category}
              </p>

              <h3 className="font-bold leading-6 text-gray-800 transition-colors group-hover:text-red-700">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainNews;
