import Link from "next/link";
import LatestArticles from "@/components/LatestArticles";

export default function Home() {
  return (
    <>
      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Hero Section */}
        <div className="text-center px-4 py-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            小秦文化角 | 探索秦皇岛的魅力
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            从山海关的雄伟到北戴河的浪漫，这里是您了解秦皇岛历史、文化和旅游景点的数字窗口
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/articles"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-12 px-8 w-full sm:w-auto"
            >
              阅读文章
            </Link>
            <Link
              href="/attractions"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-12 px-8 w-full sm:w-auto"
            >
              探索景点
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Latest Articles Section */}
      <LatestArticles />
    </>
  );
}