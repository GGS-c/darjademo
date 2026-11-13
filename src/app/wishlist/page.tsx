'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="bg-white min-h-[75vh] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
              SAVED PIECES
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
              MY WISHLIST ({wishlistedProducts.length})
            </h1>
          </div>
          <Link
            href="/category/new-arrivals"
            className="text-xs font-bold tracking-wider uppercase text-black hover:opacity-70 underline underline-offset-4"
          >
            Explore More Drops
          </Link>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-black">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Tap the heart icon on any product to save your favorite fits for later.
            </p>
            <Link
              href="/category/new-arrivals"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-stone-800 transition-colors"
            >
              <span>BROWSE NEW DROPS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
