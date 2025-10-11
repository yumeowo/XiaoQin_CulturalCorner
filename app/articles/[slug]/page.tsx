import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  getArticleBySlug,
  getAllArticles,
  getRelatedArticles,
} from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${article.title} | 小秦文化角`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              首页
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/articles"
              className="hover:text-foreground transition-colors"
            >
              文章
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{article.category}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="px-3 py-1 bg-black/[.05] dark:bg-white/[.06] rounded">
            {article.category}
          </span>
          <time>{article.date}</time>
          <span>作者：{article.author}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {article.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-black/[.05] dark:bg-white/[.06] rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="prose prose-gray dark:prose-invert max-w-none mb-16">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {article.content}
        </ReactMarkdown>
      </article>

      {/* Footer Notice */}
      <div className="border-t border-black/[.08] dark:border-white/[.145] pt-8 mb-16">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          本文同步自微信公众号"小秦文化角"，欢迎关注获取更多精彩内容
        </p>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">相关文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/articles/${related.slug}`}
                className="group"
              >
                <article className="border border-black/[.08] dark:border-white/[.145] rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span className="px-2 py-0.5 bg-black/[.05] dark:bg-white/[.06] rounded">
                      {related.category}
                    </span>
                    <time>{related.date}</time>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {related.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Articles */}
      <div className="mt-12 text-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回文章列表
        </Link>
      </div>
    </div>
  );
}