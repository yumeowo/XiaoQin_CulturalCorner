import Image from 'next/image';
import MapOverlay from '@/components/MapOverlay'; // 确保路径正确
import ScrollingImages from '@/components/ScrollingImages'; // 引入滚动图片组件

// 所有景点图片路径
const allImages = [
  '/map/1/zu-shan-1.jpg',
  '/map/1/zu-shan-2.jpg',
  '/map/2/qiu-xian-ru-hai-chu.jpg',
  '/map/3/shan-hai-guan.jpg',
  '/map/3/meng-jiang-nv-miao.jpg',
  '/map/4/ge-zi-wo.jpg',
  '/map/5/lv-you-qu.jpg',
  '/map/6/lu-long-xian.jpg',
  '/map/7/fei-cui-dao-1.jpg',
  '/map/7/fei-cui-dao-2.jpg',
];

export default function MyMapPage() {
  // 复制图片数组3次以创建足够长度的无缝滚动效果
  const leftImages = [...allImages, ...allImages, ...allImages];
  const rightImages = [...allImages.slice().reverse(), ...allImages.slice().reverse(), ...allImages.slice().reverse()];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start md:justify-center px-3 py-4 md:p-8 bg-gray-100 overflow-hidden">
      {/* 左侧滚动图片 - 只在桌面端显示 */}
      <ScrollingImages images={leftImages} direction="up" side="left" />

      {/* 右侧滚动图片 - 只在桌面端显示 */}
      <ScrollingImages images={rightImages} direction="down" side="right" />

      {/* 页面标题 */}
      <div className="w-full max-w-3xl mb-4 md:mb-6 relative z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
          秦皇岛旅游地图
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-1 md:mt-2">
          点击区域查看详细信息
        </p>
      </div>

      {/* --- 关键容器 ---
        1. 'relative': 这是必需的。它为内部 'absolute' 定位的底图、
           SVG 浮层和 Tooltip 提供了定位上下文。
        2. 'w-full max-w-3xl': 控制地图的宽度（768px），自动适应不同屏幕。
        3. 'aspect-square': 强制容器保持 1:1 的宽高比，
           这与您的 SVG viewBox (1890x1890) 相匹配，防止变形。
        4. 移动端：减少圆角和阴影，桌面端：较大的圆角和阴影
      */}
      <div className="relative w-full max-w-3xl aspect-square overflow-hidden rounded-md md:rounded-lg shadow-lg md:shadow-2xl z-10">

        {/* ----- 1. 底图 ----- */}
        {/* 使用 Next.js 的 Image 组件
          - layout="fill" 和 objectFit="cover" 使其完全填充父容器
          - 您需要将 'src' 替换为您真实的底图路径
        */}
        <Image
          src="/map_img.jpg" // <--- 替换为您的底图路径
          alt="地图底图"
          layout="fill"
          objectFit="cover"
          className="z-0" // 确保它在最底层
        />

        {/* ----- 2. SVG 交互浮层 ----- */}
        {/* - 'absolute' 使其覆盖在底图之上
          - 'z-10' 确保它在底图（z-0）之上
          - 'w-full h-full' 使其完全填充父容器
        */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <MapOverlay />
        </div>

      </div>
    </main>
  );
}