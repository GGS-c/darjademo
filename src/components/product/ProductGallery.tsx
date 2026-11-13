'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeImage = images[selectedImageIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails strip */}
      <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-2 lg:pb-0 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIndex(idx)}
            className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded overflow-hidden bg-stone-100 transition-all shrink-0 ${
              idx === selectedImageIndex
                ? 'ring-2 ring-black ring-offset-1 opacity-100'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`${productName} thumbnail ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Large Display with Interactive Zoom */}
      <div className="flex-1 relative aspect-[3/4] rounded-md overflow-hidden bg-stone-100 group">
        <div
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          className="relative w-full h-full cursor-crosshair overflow-hidden"
        >
          <Image
            src={activeImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover object-center transition-transform duration-200 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : undefined
            }
          />
        </div>

        {/* Fullscreen view trigger */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-black backdrop-blur-md rounded-full shadow-subtle opacity-0 group-hover:opacity-100 transition-opacity"
          title="Fullscreen view"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-3xl h-[85vh]">
            <Image src={activeImage} alt={productName} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
