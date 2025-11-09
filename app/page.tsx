import Link from "next/link";
import LatestArticles from "@/components/LatestArticles";
import ScrollButton from "@/components/ScrollButton";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Hero Section */}
        <div className="text-center px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent animate-slide-down leading-tight">
            小秦文化角 | 探索秦皇岛的魅力
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up opacity-0 leading-relaxed" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            从山海关的雄伟到北戴河的浪漫，这里是您了解秦皇岛历史、文化和旅游景点的数字窗口
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <Link
              href="/articles"
              className="group rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] hover:scale-105 hover:shadow-lg font-medium text-sm sm:text-base h-12 px-8 w-full sm:w-auto"
            >
              <span>阅读文章</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/map"
              className="group rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent hover:scale-105 hover:shadow-lg font-medium text-sm sm:text-base h-12 px-8 w-full sm:w-auto"
            >
              <span>探索景点</span>
              <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </Link>
          </div>

          {/* Feature Tags */}
          <div className="mt-16 flex flex-wrap justify-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {["历史文化", "旅游攻略", "美食探索", "景点推荐"].map((tag, index) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full border border-black/[.08] dark:border-white/[.145] hover:scale-105 transition-transform duration-300 cursor-default"
                style={{
                  animation: `float 3s ease-in-out ${index * 0.2}s infinite`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative Elements - Animated */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200/10 to-purple-200/10 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        {/* Scroll Indicator */}
        <ScrollButton targetId="latest-articles" />
      </div>

      {/* Latest Articles Section */}
      <LatestArticles />
    </>
  );
}