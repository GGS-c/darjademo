'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'SHIRTS',
    slug: 'shirts',
    subtitle: 'Plain, Linen, Checks & Oversized',
    image: '/images/categories/shirts.jpg',
    itemCount: '48 Styles',
  },
  {
    name: 'T-SHIRTS',
    slug: 't-shirts',
    subtitle: '260 GSM Heavyweight & Boxy Cuts',
    image: '/images/categories/t-shirts.jpg',
    itemCount: '62 Styles',
  },
  {
    name: 'BOTTOMWEAR',
    slug: 'bottomwear',
    subtitle: 'Baggy Denim, Korean Trousers & Cargos',
    image: '/images/categories/bottomwear.jpg',
    itemCount: '35 Styles',
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-bold tracking-[0.3em] text-stone-400 uppercase block mb-1">
            CURATED DEPARTMENTS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
            SHOP BY CATEGORY
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Each silhouette is precisely tailored for modern menswear aesthetics and effortless daily styling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative h-[450px] overflow-hidden rounded-md bg-stone-100 flex flex-col justify-end p-6 sm:p-8"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity" />

              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-stone-300">
                  {cat.itemCount}
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight uppercase mt-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">{cat.subtitle}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold tracking-[0.15em] uppercase underline underline-offset-4 group-hover:text-white">
                  <span>EXPLORE COLLECTION</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
