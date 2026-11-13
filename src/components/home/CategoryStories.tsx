'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEMO_IMAGES } from '@/config/images';

const STORIES = [
  {
    name: 'Oversized Tees',
    slug: 'oversized-t-shirts',
    image: DEMO_IMAGES.tshirt,
    badge: 'Trending',
  },
  {
    name: 'Plain Shirts',
    slug: 'plain-shirts',
    image: DEMO_IMAGES.shirt,
    badge: 'Popular',
  },
  {
    name: 'Parachute Cargos',
    slug: 'cargo-pants',
    image: DEMO_IMAGES.pants,
    badge: 'Hot',
  },
  {
    name: 'Kids Street',
    slug: 'kids',
    image: DEMO_IMAGES.kids,
    badge: 'New',
  },
  {
    name: 'Baggy Jeans',
    slug: 'jeans',
    image: DEMO_IMAGES.pants,
    badge: 'Popular',
  },
  {
    name: 'Pleated Pants',
    slug: 'trousers',
    image: DEMO_IMAGES.pants,
    badge: 'Editorial',
  },
  {
    name: 'Knit Polos',
    slug: 'polo-t-shirts',
    image: DEMO_IMAGES.tshirt,
  },
  {
    name: 'Linen Edits',
    slug: 'shirts',
    image: DEMO_IMAGES.banner,
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
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-stone-900 via-stone-400 to-stone-900 group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-100 border-2 border-white">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {story.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full border border-white shadow-subtle whitespace-nowrap">
                    {story.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-stone-800 uppercase mt-2 group-hover:text-black text-center whitespace-nowrap">
                {story.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
