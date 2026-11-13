'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export function BestSellers() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-stone-500 uppercase mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>COMMUNITY FAVORITES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              BEST SELLERS OF THE SEASON
            </h2>
          </div>
          <Link
            href="/category/best-sellers"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-black hover:opacity-70 transition-opacity underline underline-offset-4"
          >
            <span>VIEW ALL BEST SELLERS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
