'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const STORIES = [
  {
    name: 'Oversized Tees',
    slug: 'oversized-t-shirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400',
    badge: 'Trending',
  },
  {
    name: 'Plain Shirts',
    slug: 'plain-shirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400',
    badge: 'Popular',
  },
  {
    name: 'Parachute Cargos',
    slug: 'cargo-pants',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=400',
    badge: 'Hot',
  },
  {
    name: 'Baggy Jeans',
    slug: 'jeans',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=400',
    badge: 'New',
  },
  {
    name: 'Pleated Pants',
    slug: 'trousers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400',
    badge: 'Editorial',
  },
  {
    name: 'Knit Polos',
    slug: 'polo-t-shirts',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400',
  },
  {
    name: 'Flannel Checks',
    slug: 'checks-shirts',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400',
  },
  {
    name: 'Linen Resort',
    slug: 'shorts',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400',
  },
];

export function CategoryStories() {
  return (
    <section className="py-8 bg-white border-b border-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 pt-1">
          {STORIES.map((story) => (
            <Link
              key={story.slug}
              href={`/category/${story.slug}`}
              className="flex flex-col items-center shrink-0 group"
            >
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-stone-900 via-stone-400 to-stone-900 group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100 border-2 border-white">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {story.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full border border-white shadow-subtle whitespace-nowrap">
                    {story.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-stone-800 uppercase mt-2 group-hover:text-black text-center">
                {story.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
