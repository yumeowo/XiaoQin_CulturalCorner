"use client"; // 声明为客户端组件，因为我们需要使用 useState 和事件监听

import React, { useState } from 'react';
import MapTooltip from './MapTooltip'; // 引入我们刚创建的 Tooltip

// --- 自定义信息内容 ---
// 在这里定义每个形状（ID）悬停时应显示的内容
// 键（key）必须与 SVG 中 <path> 元素的 id 完全匹配
// 移动端优化：使用响应式字体大小
const mapData: { [key: string]: React.ReactNode } = {
  "形状 1": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 1</h3>
      <p className="text-xs md:text-sm mt-0.5">这是形状 1的自定义信息。</p>
    </div>
  ),
  "形状 2": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 2</h3>
      <p className="text-xs md:text-sm mt-0.5">您可以放入图片、列表等任何 React 元素。</p>
    </div>
  ),
  "形状 3": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 3</h3>
      <p className="text-xs md:text-sm mt-0.5">这是形状 3的详细描述。</p>
    </div>
  ),
  "形状 4": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 4</h3>
      <p className="text-xs md:text-sm mt-0.5">这是形状 4的详细描述。</p>
    </div>
  ),
  "形状 5": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 5</h3>
      <p className="text-xs md:text-sm mt-0.5">这是形状 5的详细描述。</p>
    </div>
  ),
  "形状 6": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 6</h3>
      <p className="text-xs md:text-sm mt-0.5">这是形状 6的详细描述。</p>
    </div>
  ),
  "形状 7": (
    <div>
      <h3 className="font-bold text-sm md:text-base">区域 7</h3>
      <p className="text-xs md:text-sm mt-0.5">这是形状 7的详细描述。</p>
    </div>
  ),
};
// -------------------------

// 定义 Tooltip 的状态接口
interface TooltipState {
  visible: boolean;
  content: React.ReactNode;
  x: number;
  y: number;
}

const MapOverlay: React.FC = () => {
  // 使用一个 state 来统一管理 Tooltip 的所有状态
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: null,
    x: 0,
    y: 0,
  });

  // 鼠标进入 <path> 区域
  const handleMouseEnter = (e: React.MouseEvent<SVGPathElement>, id: string) => {
    const content = mapData[id] || <div>未定义内容</div>;
    setTooltip({
      visible: true,
      content: content,
      x: e.clientX, // 使用 clientX/Y 获取相对于视口的坐标
      y: e.clientY,
    });
  };

  // 鼠标在 <path> 区域内移动
  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    // 仅当 Tooltip 可见时才更新位置
    if (tooltip.visible) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  // 鼠标离开 <path> 区域
  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // --- 触摸事件处理（移动端支持）---
  // 触摸开始
  const handleTouchStart = (e: React.TouchEvent<SVGPathElement>, id: string) => {
    // 阻止默认行为，避免触发鼠标事件
    e.preventDefault();
    const touch = e.touches[0];
    const content = mapData[id] || <div>未定义内容</div>;
    setTooltip({
      visible: true,
      content: content,
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  // 触摸移动
  const handleTouchMove = (e: React.TouchEvent<SVGPathElement>) => {
    if (tooltip.visible && e.touches.length > 0) {
      const touch = e.touches[0];
      setTooltip(prev => ({
        ...prev,
        x: touch.clientX,
        y: touch.clientY,
      }));
    }
  };

  // 触摸结束
  const handleTouchEnd = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // --- Tailwind 样式定义 ---
  // 基础样式：透明填充（让整个区域可交互），透明描边（默认不可见）
  // 使用 fill-transparent 而不是 fill-none，这样path内部区域也能响应鼠标事件
  const pathBaseStyle = "fill-transparent stroke-transparent";
  // 交互样式：过渡效果，悬停时添加浅蓝色填充(fill-blue-600/20)，描边变红(stroke-red-500)，描边宽度(stroke-[3px])，显示指针
  const pathHoverStyle = "transition-all duration-300 ease-in-out hover:fill-blue-600/20 hover:stroke-red-500 hover:stroke-[3px] cursor-pointer";
  // 组合样式
  const interactivePathClass = `${pathBaseStyle} ${pathHoverStyle}`;

  return (
    <>
      {/* 1. 渲染 Tooltip 组件 */}
      <MapTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
        {tooltip.content}
      </MapTooltip>

      {/* 2. 渲染 SVG (已转换为 React 组件) */}
      {/* - viewBox 保持不变，它定义了 SVG 的坐标系
        - width 和 height 设置为 "100%"，使其填充父容器
      */}
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1890 1890"
        width="100%"
        height="100%"
      >
        {/* <style> 标签已被移除，样式由 className={interactivePathClass} 控制 */}
        <g id="Layer 1">
          {/* 注意：
            - className 应用了我们定义的 Tailwind 样式
            - d="..." 中的路径数据是您提供的原始数据 (为了简洁已缩短)
            - 添加了 onMouseEnter, onMouseMove, onMouseLeave 事件
          */}
          <path
            id="形状 1"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m221 434l-19-20-8-27-7-21-8-22 31-17 33-4 22-60 62 20 35-15 25-9 18-44 26-31 32 10 32-17 26 12 26-5 21 11 12-35 26-7 13-24 21 5 8-20h21l27-19 23 21 26-21 47-3 40-7 43 8 22 12-21 32 50 57 19 5 20 8 26-12 20 17 13-20 34-10 10 18 22 5 18-18 21 3 31 4 21-8 53-7 41 23-24 26 26 52 32 24 3 34-11 19 10 51-20 16 18 36-5 24 28 29-29 10-14 12 14 30-37 20-10 16 2 16 12 20-4 20-11 10 3 15v22l-19 27-15 32-12 13-14 28-13 22-26 10-8 7-11 6h-15l-22 9-32 6-16 3-11-3-10-23-11-24-10-16 3-29-2-12-14-9-21-6-20 4-37 7-30 2-18-2-24 12-26 26-27 17-22 22-16 17-21 6-26-1-25-11-18-17-13-17-13-17-15-7-23-6-28-6h-28l-19-2-10-15-7-12-24-1-17-14-20 3-19-6-18-9-22-17-10-4-19 14-17 2-11-10 2-16-9 3-12-8-6-5-20 5-15-6-8-5-16-13-17-22-10-11-17-1-15-1-11-12-1-11-11 1-15 3-11 1-10-7-10-19-3-24h9l7-20 5-3 19-2 5-23 10-10 16-7 3-11 11-11 1-13 4-7 9-5z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 1")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 1")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <path
            id="形状 2"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m1328 515l-16 4-22 12-1 10 14 24-18 11-24 15-5 21 11 22 1 21-12 7 3 24-1 21-13 17-14 27-8 18-15 15-13 24-18 25-33 9-20 7-14 9-5 18-7 15-1 20-11 12-3 16 8 21 14-8 13-7 7-17 8 17 18 11 10 15 10 2-10 12v14l-11 17 2 11 11-1 4 14 18 7-5 22-1 18-20 9-10 11 7 11 8 11 2 18 1 16 10 18 16 15 8-5-2-15 14-7 10-12 20-8 21-17 30-19 22-6 13 1-13 12 16-3 16-7-5-15 14 6 20-21 66-8 12-15-1-24-20-3-12-13-19-14-8-3-14 5-14-6-11 6-11-16 7-21 10-36 8-6 10 4-1-14 21 2 5-10-5-13v-29l22 5 11-10 1-15 15-7-4-16 21 4 9-5 24-39-9-32-2-62-8-10-20-1-9 2-3 11-8 8-9-16-14-23-11-21-11-3-13 6-20 2-10 8-10 6-2-11 13-13 14-19 1-17 8-9-9-23-9-10-19-9-8-11z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 2")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 2")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <path
            id="形状 3"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m1476 823l-10 5-22-5 4 16-15 7 1 15-11 9-21-3-2 31 5 11-6 9-19-1-1 14-9-4-8 6-17 56 11 17 12-6 12 6 15-6 19 13 14 11 6 7 19 4 2 22-5 7 6 5 26-13 16-4 37-1 11-26 19-12 36-6 6-2-11-11 8-21-1-10-2-4 11-14-9-12-14-13-11-4-17 1-20 4-14-2-26-37-16-28-5-24z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 3")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 3")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <path
            id="形状 4"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m1152 1113l11 16 4 30 4 13 6 11 17 13 7-6-2-13 15-8 9-11 20-9-12 22v19l-7 25 3 15 11 3 4 28-8 4-13-3c-3.65-0.89-13 0-13 0l-9-4-15 8-13-1-30 15-9-5h-12l-13-6-17-7-16-6-4 5v14l-1 11-10 8-14-5-15 9-13-5 1-28-13-2-9-3-10-20 3-20 8-18 10-7-7-8-13-11 2-15 11-11 9-1 9 13 15 7 13 7 3 11 11 3c4.78 0.11 13-11 13-11l-8-16-8-11 8-6 21 5h17l11-10 12-6 13-4z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 4")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 4")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <path
            id="形状 5"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m759 851l42-44 28-17 23-24 24-9 40-1 63-11 35 14 2 16-3 26 11 18 21 44 12 4 45-8 13-5-6 10-5 14-6 13-1 21-10 11-5 17 10 18 23-13 12-17 6 17 20 12 8 14 9 4-9 10v14l-10 17 1 10 11 1 4 14 18 7-5 37-18 9-13 11 3 9-12 16-22 8-16 14-37-6-9 5 17 29-13 11-11-5-3-9-27-15-10-13-9 2-11 10-3 16 21 17-9 9-9 17-3 23 10 17 22 6-1 28 15 5 15-10 13 5 9-6 1-26 4-6 49 20 10-1-12 13-16 15-21-15-3 8-14 4 8 5 11-4 9 7v8l-10-4-13 8 4 7-25 20-11 17-19 31-42-23-13-5v-13l-21-23-26-4-26-13-14-32-18-9-15 1-9 11-6 14h-8l-7-12-9 5-5 11-14 2-13-13 11-25-5-42-26-44-8 2-9-32-19-10 7-43 17-18-4-13-17-5 9-14-14-8 1-10-5-16 8-14 27 2 18-11 17-4-2-11-19-31 1-30 6-13-4-13 4-18z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 5")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 5")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <path
            id="形状 6"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m550 775l28-1 66 19 35 45 8 6 26 10 27 3 19-6 10 21-4 19 5 9-6 14-1 31 18 32 2 11-16 3-19 11-26-1-8 13 5 17-2 9 14 8-10 15 18 4 4 12-18 20-5 43 17 9 11 33 8-2 25 44 6 40-12 27-16 6-12 15-45 17-28 12-18-2-8 2h-12l2 13-2 15-8 12-8 5-11-2-4 10-16 3-23-2c-1.38-3.79-7-10-7-10l-49 3-6 7-4 8-12-2-10-14-10-4-19-2-20-17-22-19-28-26 12-11-3-22 5-4 24-3 2-6-13-12 3-12-4-9 13-17 4-8 12-12-1-13-3-8 23-20 5-62 14-27 9-4 6-19 5-14-4-8 7-18-6-38-12-9-13-13 6-28-6-22 56-39 21-21-6-9-3-14 4-17 10-15z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 6")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 6")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <path
            id="形状 7"
            fillRule="evenodd"
            className={interactivePathClass}
            d="m378 1320l72 64h20l9 6 10 14 9 2 12-15 50-5 8 11 21 3 14-4 7-11 12 3 12-12 3-15-2-18 23-3 18 3 73-30 10-15 18-5 11 13 15-4 4-9 10-6 7 13 8-2 7-18 8-6h16l17 10 14 31 28 13 23 4 23 23v13l54 28-11 40h-13l2 13-7 8h8l-41 123-7 22-21-27-13 10-15 5-19 28 16-2 3 9 8 4 8-22 17-13 8 4 2 24-10 20-2 13 4 9-9 40-3 17-2 30-5 12 18 3-8 13-7 15 15-7-5 16-17 7-18-8-16-13-23-3-16-10-18-4-33 7-39-2-24-11-17-1-14 19-14 5-26-6-25-11-4-14 9-14-4-33v-14l-18 4-20-7v-10l-6-7 16-8 5-8-30-8-9-12-4-10-18 10-18 10-15 2-18-11-3-10 5-10-9-16-12-8-10-19-8-22-12-18-16-31-15-17-1-15-11-14-3-10-15-16-1-11-5-7-1-9-6-12v-17l-17-21-2-13 5-16z"
            onMouseEnter={(e) => handleMouseEnter(e, "形状 7")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={(e) => handleTouchStart(e, "形状 7")}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </g>
      </svg>
    </>
  );
};

export default MapOverlay;