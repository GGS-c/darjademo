'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

const TABS = [
  { id: 'all', label: 'ALL DROPS' },
  { id: 'oversized-t-shirts', label: 'OVERSIZED TEES' },
  { id: 'plain-shirts', label: 'SHIRTS' },
  { id: 'cargo-pants', label: 'CARGOS & DENIM' },
];

export function NewArrivals() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = PRODUCTS.filter((product) => {
    if (activeTab === 'all') return product.isNewArrival || product.isTrending;
    if (activeTab === 'cargo-pants') return product.category === 'bottomwear';
    if (activeTab === 'plain-shirts') return product.category === 'shirts';
    return product.subcategory === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-stone-200 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-1">
              FRESH OFF THE ATELIER
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black uppercase">
              NEW SEASON ARRIVALS
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-4 md:mt-0 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-subtle'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/category/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-stone-800 transition-colors shadow-subtle"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
