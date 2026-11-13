'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

export function BrandStory() {
  return (
    <section className="py-20 sm:py-24 bg-black text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 px-3 py-1 rounded text-[11px] font-bold tracking-[0.25em] text-stone-300 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-stone-400" />
              THE BRAND ESSENCE
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-[1.05]">
              DEFINE YOUR STYLE.<br />OWN YOUR PRESENCE.
            </h2>

            <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-light">
              DARJA was conceived for the man who commands every room without saying a word. 
              We strip away redundant branding to champion pure proportion, tactile heavyweight textiles, 
              and architectural cuts that elevate modern Indian menswear into global high fashion.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-800 text-center sm:text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">260+</span>
                <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider block uppercase mt-0.5">
                  GSM Heavy Cotton
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">100%</span>
                <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider block uppercase mt-0.5">
                  Pre-Shrunk Weaves
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">50K+</span>
                <span className="text-[10px] sm:text-xs text-stone-400 tracking-wider block uppercase mt-0.5">
                  Modern Gentlemen
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/category/new-arrivals"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-stone-200 text-xs font-bold tracking-[0.2em] uppercase rounded transition-all shadow-subtle"
              >
                <span>EXPLORE THE ATELIER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-stone-900">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"
                alt="Darja menswear portrait"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-stone-900 translate-y-6">
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
                alt="Darja editorial styling"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
