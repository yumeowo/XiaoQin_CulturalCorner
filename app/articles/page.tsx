import Link from "next/link";
import Image from "next/image";
import {
  getAllArticles,
  getAllCategories,
  getArticlesByCategory,
} from "@/lib/articles";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ArticlesPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category as string | undefined;

  // Filter articles based on selected category
  const articles = selectedCategory
    ? getArticlesByCategory(selectedCategory)
    : getAllArticles();

  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-down">
          文章列表
        </h1>
        <p className="text-gray-600 dark:text-gray-400 animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          探索秦皇岛的历史文化与美景，同步自微信公众号&ldquo;小秦文化角&rdquo;
        </p>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <Link
            href="/articles"
            className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 hover:scale-105 hover:shadow-md ${
              !selectedCategory
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06]"
            }`}
          >
            全部
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/articles?category=${category}`}
              className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 hover:scale-105 hover:shadow-md ${
                selectedCategory === category
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                  : "border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06]"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-400">
            暂无文章，敬请期待...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block"
            >
              <article className="h-full border border-black/[.08] dark:border-white/[.145] rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                {/* Cover Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 group-hover:scale-110 transition-transform duration-500">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="px-2 py-1 bg-black/[.05] dark:bg-white/[.06] rounded">
                      {article.category}
                    </span>
                    <time>{article.date}</time>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-black/[.03] dark:bg-white/[.03] rounded group-hover:bg-black/[.06] dark:group-hover:bg-white/[.06] transition-colors duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
