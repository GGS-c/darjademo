'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const COMMUNITY_POSTS = [
  {
    image: '/images/banners/lookbook-1.jpg',
    handle: '@arjun.mehta',
    product: 'Minimalist Oxford Shirt',
  },
  {
    image: '/images/banners/lookbook-2.jpg',
    handle: '@kabir_v',
    product: 'Phantom 260 GSM Heavy Tee',
  },
  {
    image: '/images/banners/lookbook-3.jpg',
    handle: '@rohan_style',
    product: 'Tokyo Pleated Trousers',
  },
  {
    image: '/images/banners/lookbook-4.jpg',
    handle: '@dev.sharma',
    product: 'Textured Waffle Overshirt',
  },
];

export function InstagramFeed() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-1">
            COMMUNITY & LOOKBOOK
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
            #DARJAMAN
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Tag @darjawear on Instagram to get featured in our seasonal global editorial gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMMUNITY_POSTS.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-[3/4] overflow-hidden rounded-md bg-stone-100"
            >
              <Image
                src={post.image}
                alt={post.product}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white text-center">
                <Instagram className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold tracking-wider">{post.handle}</span>
                <span className="text-[10px] text-stone-300 mt-1">{post.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
