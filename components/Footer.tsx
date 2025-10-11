import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold mb-4">小秦文化角</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              探索秦皇岛的魅力，了解这座城市的历史、文化和美景。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速导航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/attractions"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                >
                  景点介绍
                </Link>
              </li>
              <li>
                <Link
                  href="/culture"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                >
                  文化历史
                </Link>
              </li>
              <li>
                <Link
                  href="/cuisine"
                  className="text-gray-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                >
                  特色美食
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              邮箱：2839681263@qq.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              维护者：悠梦
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-black/[.08] dark:border-white/[.145] text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} 小秦文化角. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}