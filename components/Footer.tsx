import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-lg">小秦文化角</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              探索秦皇岛的魅力，从山海关的雄伟到北戴河的浪漫。
              这里是您了解秦皇岛历史、文化和旅游景点的数字窗口。
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                微信公众号：<span className="font-medium">小秦文化角</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速导航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                >
                  <span>首页</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                >
                  <span>文章</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                >
                  <span>旅行地图</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity inline-flex items-center gap-1"
                >
                  <span>关于我们</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:2839681263@qq.com" className="hover:opacity-60 transition-opacity">
                  2839681263@qq.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>维护者：悠梦</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-black/[.08] dark:border-white/[.145]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} 小秦文化角. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/yumeowo/XiaoQin_CulturalCorner"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="GitHub"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}