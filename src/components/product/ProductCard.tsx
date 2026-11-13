'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import { DEMO_IMAGES } from '@/config/images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileSizes, setShowMobileSizes] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(product.id);
  const activeVariant = product.variants[activeVariantIndex] || product.variants[0];

  const [primaryErr, setPrimaryErr] = useState(false);
  const [secondaryErr, setSecondaryErr] = useState(false);

  useEffect(() => {
    setPrimaryErr(false);
    setSecondaryErr(false);
  }, [activeVariantIndex]);

  const rawPrimary = activeVariant.images[0] || DEMO_IMAGES.fallback;
  const rawSecondary = activeVariant.images[1] || rawPrimary;

  const primaryImage = primaryErr ? DEMO_IMAGES.fallback : rawPrimary;
  const secondaryImage = secondaryErr ? DEMO_IMAGES.fallback : rawSecondary;

  const handleQuickAdd = (size: 'S' | 'M' | 'L' | 'XL' | 'XXL', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, activeVariant, size, 1);
    setShowMobileSizes(false);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMobileSizes(false);
      }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-sm">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          {/* Primary & Secondary Image Crossfade */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? 'opacity-0 scale-105'
                : 'opacity-100 scale-100'
            }`}
            onError={() => setPrimaryErr(true)}
          />
          {secondaryImage && secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              onError={() => setSecondaryErr(true)}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-black text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm shadow-subtle">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="bg-stone-900 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm shadow-subtle">
              BESTSELLER
            </span>
          )}
          {product.discountPercentage > 35 && (
            <span className="bg-darja-accent text-white text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm shadow-subtle">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 shadow-subtle ${
            isFavorited
              ? 'bg-white text-darja-accent'
              : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:bg-white hover:text-black'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Quick Add Bar - Desktop Hover Reveal & Mobile Toggle */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-2.5 transition-all duration-300 z-20 flex flex-col items-center ${
            isHovered || showMobileSizes
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-stone-500 mb-1.5">
            QUICK ADD SIZE
          </span>
          <div className="flex items-center justify-center gap-1.5 w-full">
            {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size) => {
              const stock = activeVariant.stockBySize[size] || 0;
              const isOutOfStock = stock <= 0;
              return (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(size, e)}
                  disabled={isOutOfStock}
                  className={`flex-1 py-1 text-xs font-bold rounded uppercase transition-all ${
                    isOutOfStock
                      ? 'bg-stone-100 text-stone-300 cursor-not-allowed line-through'
                      : 'bg-stone-100 text-black hover:bg-black hover:text-white active:scale-95'
                  }`}
                  title={isOutOfStock ? `${size} Out of stock` : `Add size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Quick Add Trigger Button (visible only on small touch screens) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowMobileSizes((prev) => !prev);
          }}
          className="lg:hidden absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/85 text-white flex items-center justify-center shadow-md z-10"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Product Details Section */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Color Swatches */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.variants.map((v, index) => (
              <button
                key={v.colorName}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveVariantIndex(index);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  index === activeVariantIndex
                    ? 'ring-1 ring-black ring-offset-1 scale-110 border-black'
                    : 'border-stone-300 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: v.colorHex }}
                title={v.colorName}
              />
            ))}
            <span className="text-[10px] text-stone-400 font-medium ml-1">
              +{product.variants.length} colors
            </span>
          </div>
        )}

        {/* Brand & Title */}
        <Link href={`/product/${product.slug}`} className="group-hover:text-black">
          <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase block mb-0.5">
            DARJA
          </span>
          <h3 className="text-xs sm:text-sm font-semibold text-stone-900 tracking-normal line-clamp-1 group-hover:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mt-1.5">
          <span className="text-sm font-bold text-black font-mono">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-stone-400 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded whitespace-nowrap">
                ({product.discountPercentage}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
