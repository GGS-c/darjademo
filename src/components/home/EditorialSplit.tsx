'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function EditorialSplit() {
  return (
    <section className="py-6 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Banner 1: Oversized */}
          <Link
            href="/category/oversized-t-shirts"
            className="group relative h-[420px] sm:h-[520px] overflow-hidden rounded-md bg-stone-900 block"
          >
            <Image
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop"
              alt="Oversized Boxy Silhouette"
              fill
              className="object-cover object-center filter brightness-[0.8] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="text-[11px] font-bold tracking-[0.25em] text-stone-300 uppercase mb-1">
                SIGNATURE DROP
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                THE OVERSIZED SILHOUETTE
              </h3>
              <p className="text-xs text-stone-300 mt-2 max-w-sm line-clamp-2">
                Heavyweight 260 GSM French Terry engineered with structural dropped shoulders.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase underline underline-offset-4 group-hover:text-white transition-colors">
                <span>SHOP OVERSIZED TEES</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Banner 2: Bottomwear */}
          <Link
            href="/category/bottomwear"
            className="group relative h-[420px] sm:h-[520px] overflow-hidden rounded-md bg-stone-900 block"
          >
            <Image
              src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop"
              alt="Tailored & Tactical Bottomwear"
              fill
              className="object-cover object-center filter brightness-[0.8] transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="text-[11px] font-bold tracking-[0.25em] text-stone-300 uppercase mb-1">
                CONTEMPORARY CUTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                TACTICAL & TAILORED
              </h3>
              <p className="text-xs text-stone-300 mt-2 max-w-sm line-clamp-2">
                From Japanese-inspired double pleat trousers to multi-pocket parachute utility cargos.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase underline underline-offset-4 group-hover:text-white transition-colors">
                <span>EXPLORE BOTTOMWEAR</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
