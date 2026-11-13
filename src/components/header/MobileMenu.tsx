'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, User, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { MAIN_NAV_CATEGORIES } from '@/data/categories';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { wishlistCount } = useWishlist();
  const { totalItemCount, openCart } = useCart();

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in flex">
      {/* Drawer */}
      <div className="w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        {/* Top Header */}
        <div>
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <Link href="/" onClick={onClose} className="flex flex-col">
              <span className="font-extrabold text-xl tracking-[0.25em] text-black">DARJA</span>
              <span className="text-[8px] tracking-[0.35em] text-stone-500 font-semibold -mt-1">
                MENS WEAR
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-3 border-b border-stone-200 bg-stone-50/70 p-3 text-center text-xs">
            <Link
              href="/account"
              onClick={onClose}
              className="flex flex-col items-center gap-1 text-stone-700 hover:text-black"
            >
              <User className="w-4 h-4" />
              <span className="font-medium text-[11px]">Account</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex flex-col items-center gap-1 text-stone-700 hover:text-black relative"
            >
              <Heart className="w-4 h-4" />
              <span className="font-medium text-[11px]">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 right-5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="flex flex-col items-center gap-1 text-stone-700 hover:text-black relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-medium text-[11px]">Bag</span>
              {totalItemCount > 0 && (
                <span className="absolute -top-1 right-5 bg-darja-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Main Navigation List */}
          <div className="p-4 space-y-1">
            <Link
              href="/category/new-arrivals"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-bold tracking-wider text-black border-b border-stone-100"
            >
              <span>NEW ARRIVALS</span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded font-bold">NEW</span>
            </Link>

            {/* Accordion Categories */}
            {MAIN_NAV_CATEGORIES.map((cat) => {
              const isExpanded = expandedCategory === cat.id;
              return (
                <div key={cat.id} className="border-b border-stone-100">
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between py-3 text-sm font-bold tracking-wider text-stone-900"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-black' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pb-3 pl-3 space-y-2 animate-fade-in">
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="block text-xs font-bold text-black tracking-wider py-1 uppercase underline underline-offset-4"
                      >
                        All {cat.name}
                      </Link>
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${sub.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between py-1.5 text-xs font-medium text-stone-600 hover:text-black"
                        >
                          <span>{sub.name}</span>
                          {sub.tag && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-stone-100 text-stone-700 font-bold rounded">
                              {sub.tag}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/category/best-sellers"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-bold tracking-wider text-stone-900 border-b border-stone-100"
            >
              <span>BEST SELLERS</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              href="/category/sale"
              onClick={onClose}
              className="flex items-center justify-between py-3 text-sm font-bold tracking-wider text-darja-accent border-b border-stone-100"
            >
              <span>SALE (UP TO 50% OFF)</span>
              <span className="text-[10px] bg-darja-accent text-white px-2 py-0.5 rounded font-bold">
                HOT
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Utility Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
          <Link
            href="/track-order"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-black"
          >
            <span>Track Your Order</span>
          </Link>
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-black"
          >
            <ShieldCheck className="w-4 h-4 text-stone-400" />
            <span>Admin Management</span>
          </Link>
          <div className="pt-2 text-[10px] text-stone-400">
            © 2026 DARJA MENS WEAR. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}
