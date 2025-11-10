'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ScrollingImagesProps {
  images: string[];
  direction: 'up' | 'down';
  side: 'left' | 'right';
}

const ScrollingImages: React.FC<ScrollingImagesProps> = ({ images, direction, side }) => {
  const positionClass = side === 'left' ? 'left-4' : 'right-4';
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保动画样式被添加到元素上
    if (scrollRef.current) {
      const keyframes = direction === 'up'
        ? [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-33.33%)' }
          ]
        : [
            { transform: 'translateY(-33.33%)' },
            { transform: 'translateY(0)' }
          ];

      const animation = scrollRef.current.animate(keyframes, {
        duration: 60000, // 60秒
        iterations: Infinity,
        easing: 'linear',
      });

      return () => {
        animation.cancel();
      };
    }
  }, [direction]);

  return (
    <div
      className={`hidden lg:block fixed ${positionClass} top-0 h-screen w-32 overflow-hidden z-0`}
      style={{ opacity: 0.4 }}
    >
      <div
        ref={scrollRef}
        className="flex flex-col gap-4"
        style={{ willChange: 'transform' }}
      >
        {images.map((src, index) => (
          <div
            key={`${side}-${index}`}
            className="relative w-full h-48 flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={src}
              alt="景点"
              fill
              sizes="128px"
              className="object-cover"
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingImages;
