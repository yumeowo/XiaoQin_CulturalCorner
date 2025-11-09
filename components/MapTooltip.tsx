import React from 'react';

/**
 * MapTooltip 组件的 Props
 */
interface MapTooltipProps {
  /** 是否可见 */
  visible: boolean;
  /** X 坐标 (相对于视口的坐标) */
  x: number;
  /** Y 坐标 (相对于视口的坐标) */
  y: number;
  /** 要显示的自定义内容 */
  children: React.ReactNode;
}

/**
 * 一个通用的浮动信息框（工具提示）组件
 * 使用 fixed 定位，根据传入的 x, y 坐标（相对于视口）进行定位
 * 移动端优化：更小的 padding、字体和阴影
 */
const MapTooltip: React.FC<MapTooltipProps> = ({ visible, x, y, children }) => {
  if (!visible) {
    return null;
  }

  // 计算位置，确保不超出视口边界
  const offset = 15;
  const maxWidth = 200; // Tooltip 最大宽度（估算）
  const maxHeight = 100; // Tooltip 最大高度（估算）

  let finalX = x + offset;
  let finalY = y + offset;

  // 如果右侧超出视口，则显示在鼠标左侧
  if (finalX + maxWidth > window.innerWidth) {
    finalX = x - maxWidth - offset;
  }

  // 如果底部超出视口，则显示在鼠标上方
  if (finalY + maxHeight > window.innerHeight) {
    finalY = y - maxHeight - offset;
  }

  return (
    <div
      className="fixed bg-white border border-gray-300 shadow-md md:shadow-lg rounded-md p-2 md:p-3 z-50 pointer-events-none transition-opacity duration-150 max-w-[180px] md:max-w-xs"
      style={{
        // 使用 fixed 定位配合 clientX/Y 坐标
        left: `${finalX}px`,
        top: `${finalY}px`,
      }}
    >
      {children}
    </div>
  );
};

export default MapTooltip;