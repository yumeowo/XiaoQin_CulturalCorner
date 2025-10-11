import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/[.08] dark:border-white/[.145]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold hover:opacity-80 transition-opacity"
          >
            小秦文化角
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              首页
            </Link>
            <Link
              href="/articles"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              文章
            </Link>
            <Link
              href="/attractions"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              景点
            </Link>
            <Link
              href="/culture"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              文化
            </Link>
            <Link
              href="/cuisine"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              美食
            </Link>
            <Link
              href="/about"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              关于
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-black/[.05] dark:hover:bg-white/[.06] transition-colors"
            aria-label="菜单"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}