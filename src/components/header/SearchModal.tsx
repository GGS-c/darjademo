'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = [
  'Oversized T-Shirts',
  'Linen Shirts',
  'Parachute Cargo',
  'Pleated Trousers',
  'Zip Polo',
  'Plain Oxford',
  'Monochrome',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.tags.some((tag) => tag.toLowerCase().includes(term)) ||
        p.description.toLowerCase().includes(term)
    ).slice(0, 8);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-start items-center pt-8 sm:pt-16 px-4 animate-fade-in">
      {/* Search Container */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-luxury overflow-hidden border border-stone-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shirts, oversized tees, baggy jeans, cargos..."
            autoFocus
            className="w-full text-base sm:text-lg outline-none placeholder:text-stone-400 font-medium text-stone-900"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-bold tracking-widest text-stone-500 hover:text-black ml-2 px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6">
          {!searchTerm.trim() ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-stone-400 uppercase mb-3">
                <TrendingUp className="w-4 h-4 text-darja-accent" />
                TRENDING SEARCHES
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {TRENDING_SEARCHES.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchTerm(query)}
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-stone-200 hover:border-black hover:bg-black hover:text-white transition-all text-stone-700"
                  >
                    {query}
                  </button>
                ))}
              </div>

              <div className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-3">
                FEATURED CATEGORIES
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  href="/category/oversized-t-shirts"
                  onClick={onClose}
                  className="p-3 rounded-lg border border-stone-100 bg-stone-50 hover:bg-stone-100 text-center font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Oversized Tees
                </Link>
                <Link
                  href="/category/plain-shirts"
                  onClick={onClose}
                  className="p-3 rounded-lg border border-stone-100 bg-stone-50 hover:bg-stone-100 text-center font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Plain Shirts
                </Link>
                <Link
                  href="/category/cargo-pants"
                  onClick={onClose}
                  className="p-3 rounded-lg border border-stone-100 bg-stone-50 hover:bg-stone-100 text-center font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Cargo Pants
                </Link>
                <Link
                  href="/category/jeans"
                  onClick={onClose}
                  className="p-3 rounded-lg border border-stone-100 bg-stone-50 hover:bg-stone-100 text-center font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  Baggy Denim
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-4 flex justify-between items-center">
                <span>PRODUCTS FOUND ({filteredProducts.length})</span>
                {filteredProducts.length > 0 && (
                  <span className="text-stone-500 font-normal">Click to view details</span>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <p className="text-base font-medium">No products matching &quot;{searchTerm}&quot;</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Try searching for &apos;shirts&apos;, &apos;cotton&apos;, &apos;cargos&apos;, or &apos;oversized&apos;
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => {
                    const firstVariant = product.variants[0];
                    return (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex gap-4 p-2.5 rounded-lg hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-200"
                      >
                        <div className="relative w-16 h-20 bg-stone-100 rounded overflow-hidden shrink-0">
                          <Image
                            src={firstVariant.images[0] || '/images/fallback.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                            {product.category}
                          </span>
                          <h4 className="text-sm font-semibold text-stone-900 truncate group-hover:text-black">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-black">{formatPrice(product.price)}</span>
                            <span className="text-xs text-stone-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                              {product.discountPercentage}% OFF
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
