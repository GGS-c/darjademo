'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryNavigationItem } from '@/data/categories';
import { ArrowUpRight } from 'lucide-react';

interface MegaMenuProps {
  category: CategoryNavigationItem;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white text-black border-b border-stone-200 shadow-luxury transition-all duration-300 z-40 py-8 px-6 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left Column: Subcategories */}
        <div className="col-span-8 grid grid-cols-3 gap-6 pr-6 border-r border-stone-100">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-stone-400 uppercase mb-4 block">
              EXPLORE {category.name}
            </span>
            <ul className="space-y-3">
              {category.subcategories.slice(0, 4).map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/category/${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-sm font-medium text-stone-800 hover:text-black transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{sub.name}</span>
                    {sub.tag && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black text-white ml-2">
                        {sub.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-widest text-stone-400 uppercase mb-4 block">
              MORE SILHOUETTES
            </span>
            <ul className="space-y-3">
              {category.subcategories.slice(4).map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/category/${sub.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between text-sm font-medium text-stone-800 hover:text-black transition-colors"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{sub.name}</span>
                    {sub.tag && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-darja-accent text-white ml-2">
                        {sub.tag}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-black underline underline-offset-4 pt-2 hover:opacity-70"
                >
                  VIEW ALL {category.name}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-widest text-stone-400 uppercase mb-4 block">
              FEATURED CURATIONS
            </span>
            <ul className="space-y-3 text-sm text-stone-600">
              <li>
                <Link
                  href="/category/best-sellers"
                  onClick={onClose}
                  className="hover:text-black hover:translate-x-1 transition-all block font-medium"
                >
                  Best Sellers in {category.name}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/new-arrivals"
                  onClick={onClose}
                  className="hover:text-black hover:translate-x-1 transition-all block font-medium"
                >
                  New Season Drops
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sale"
                  onClick={onClose}
                  className="text-red-600 hover:text-red-700 hover:translate-x-1 transition-all block font-semibold"
                >
                  End of Season Sale (Up to 50% Off)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Editorial Visual Card */}
        <div className="col-span-4 pl-4">
          <Link
            href={`/category/${category.slug}`}
            onClick={onClose}
            className="group relative block aspect-[16/10] overflow-hidden rounded-md bg-stone-100"
          >
            <Image
              src={category.bannerImage}
              alt={category.name}
              fill
              sizes="(max-width: 1280px) 300px, 400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-300">
                CURATED COLLECTION
              </span>
              <h4 className="text-lg font-bold tracking-wide mt-0.5">{category.name} EDIT</h4>
              <p className="text-xs text-stone-300 line-clamp-1 mt-1 font-normal">{category.description}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wider uppercase underline underline-offset-4 group-hover:text-white">
                EXPLORE NOW <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
