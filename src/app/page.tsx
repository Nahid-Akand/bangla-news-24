import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news sections");
  }

  const data = await res.json();

  const sections = data.data ?? [];
  const mainNews = sections[0]?.articles ?? [];
  const otherSections: IOtherSection[] = sections.slice(1);

  return (
    <div className="min-h-screen mx-auto w-full max-w-7xl px-4 bg-gray-50">
     

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* News Section */}
          <section className="min-w-0 md:col-span-2">
            <MainNews news={mainNews} />

            {/* Other News Sections */}
            <div className="mt-8 grid gap-8">
              {otherSections.map((os) => (
                <section key={os.curationId}>
                  {/* Section Heading */}
                  <div className="mb-4 flex items-center justify-between border-b-2 border-red-600 pb-2">
                    <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      {os.title}
                    </h2>
                  </div>

                  {/* News Cards */}
                  {os.articles.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {os.articles.map((news) => (
                        <NewsCard key={news.id} news={news} />
                      ))}
                    </div>
                  ) : (
                    <p className="py-5 text-center text-gray-500">
                      এই বিভাগে কোনো সংবাদ পাওয়া যায়নি।
                    </p>
                  )}
                </section>
              ))}
            </div>
          </section>

          {/* Most Read News Sidebar */}
          <aside className="min-w-0 md:col-span-1">
            <div className="md:sticky md:top-6">
              <MostRead />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
