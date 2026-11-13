'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const MESSAGES = [
  { text: 'FLAT 10% OFF ON YOUR FIRST ORDER', code: 'USE CODE: DARJA10', href: '/shop' },
  { text: 'FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹999', code: 'PAN INDIA', href: '/shop' },
  { text: 'HASSLE-FREE 7-DAY DOORSTEP RETURNS & EXCHANGES', code: 'EASY RETURNS', href: '/account' },
  { text: 'NEW SEASON DROP: THE NOIR MONOCHROME STATEMENT', code: 'EXPLORE NOW', href: '/category/new-arrivals' },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = MESSAGES[currentIndex];

  return (
    <div className="bg-black text-white py-2 px-4 text-xs font-medium tracking-wider uppercase transition-all duration-300 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-4 text-stone-400 text-[11px] tracking-widest">
          <span>MEN&apos;S COUTURE & LUXURY STREETWEAR</span>
        </div>

        <Link
          href={current.href}
          className="mx-auto flex items-center justify-center gap-2 group hover:text-stone-300 transition-colors"
        >
          <span className="font-semibold text-white tracking-widest">{current.text}</span>
          <span className="bg-white/10 text-stone-200 px-2 py-0.5 rounded text-[10px] tracking-normal font-mono">
            {current.code}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <div className="hidden md:flex items-center space-x-3 text-stone-400 text-[11px]">
          <Link href="/track-order" className="hover:text-white transition-colors">
            TRACK ORDER
          </Link>
          <span>•</span>
          <Link href="/admin" className="hover:text-white text-stone-500 transition-colors">
            ADMIN PORTAL
          </Link>
        </div>
      </div>
    </div>
  );
}
