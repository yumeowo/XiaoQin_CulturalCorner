import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMetadata {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  published: boolean;
}

export interface Article extends ArticleMetadata {
  content: string;
}

const articlesDirectory = path.join(process.cwd(), "content/articles");

/**
 * Get all articles from the content directory
 */
export function getAllArticles(): Article[] {
  // Ensure directory exists
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getArticleBySlug(slug);
    })
    .filter((article): article is Article => article !== null)
    .filter((article) => article.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return articles;
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      published: data.published !== false,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter((article) => article.category === category);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const allArticles = getAllArticles();
  const categories = new Set(allArticles.map((article) => article.category));
  return Array.from(categories);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allArticles = getAllArticles();
  const tags = new Set(allArticles.flatMap((article) => article.tags));
  return Array.from(tags);
}

/**
 * Get latest N articles
 */
export function getLatestArticles(count: number = 3): Article[] {
  const allArticles = getAllArticles();
  return allArticles.slice(0, count);
}

/**
 * Get related articles based on tags and category
 */
export function getRelatedArticles(
  slug: string,
  count: number = 3
): Article[] {
  const currentArticle = getArticleBySlug(slug);
  if (!currentArticle) return [];

  const allArticles = getAllArticles().filter(
    (article) => article.slug !== slug
  );

  // Calculate relevance score
  const articlesWithScore = allArticles.map((article) => {
    let score = 0;

    // Same category gets 2 points
    if (article.category === currentArticle.category) {
      score += 2;
    }

    // Each matching tag gets 1 point
    const matchingTags = article.tags.filter((tag) =>
      currentArticle.tags.includes(tag)
    );
    score += matchingTags.length;

    return { article, score };
  });

  // Sort by score and date
  articlesWithScore.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return new Date(b.article.date) > new Date(a.article.date) ? 1 : -1;
  });

  return articlesWithScore.slice(0, count).map((item) => item.article);
}