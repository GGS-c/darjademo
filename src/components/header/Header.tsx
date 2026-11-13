'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { MAIN_NAV_CATEGORIES } from '@/data/categories';
import { MegaMenu } from './MegaMenu';
import { SearchModal } from './SearchModal';
import { MobileMenu } from './MobileMenu';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export function Header() {
  const [activeMenuCat, setActiveMenuCat] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { wishlistCount } = useWishlist();
  const { totalItemCount, openCart } = useCart();

  const selectedCategory = MAIN_NAV_CATEGORIES.find((c) => c.id === activeMenuCat);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile Hamburger & Desktop Left Links */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-stone-800 hover:text-black"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex flex-col group py-1">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-[0.25em] text-black group-hover:opacity-90 transition-opacity font-display">
                  DARJA
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.45em] text-stone-500 font-semibold -mt-1 uppercase">
                  MENS WEAR
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 h-full">
              <Link
                href="/category/new-arrivals"
                className="text-xs font-bold tracking-[0.15em] text-stone-900 hover:text-black py-6 transition-colors"
              >
                NEW ARRIVALS
              </Link>

              {MAIN_NAV_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenuCat(cat.id)}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`text-xs font-bold tracking-[0.15em] transition-colors py-6 ${
                      activeMenuCat === cat.id ? 'text-black border-b-2 border-black' : 'text-stone-700 hover:text-black'
                    }`}
                  >
                    {cat.name}
                  </Link>
                </div>
              ))}

              <Link
                href="/category/best-sellers"
                className="text-xs font-bold tracking-[0.15em] text-stone-900 hover:text-black py-6 transition-colors"
              >
                BEST SELLERS
              </Link>

              <Link
                href="/category/sale"
                className="text-xs font-bold tracking-[0.15em] text-darja-accent hover:text-red-700 py-6 transition-colors flex items-center gap-1.5"
              >
                <span>SALE</span>
                <span className="bg-darja-accent text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                  50%
                </span>
              </Link>
            </nav>

            {/* Right: Actions Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account Link */}
              <Link
                href="/account"
                className="p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100 hidden sm:flex items-center"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-stone-700 hover:text-black transition-colors rounded-full hover:bg-stone-100 relative flex items-center"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-stone-900 hover:text-black transition-colors rounded-full hover:bg-stone-100 relative flex items-center"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-darja-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop MegaMenu Container */}
        {selectedCategory && (
          <MegaMenu
            category={selectedCategory}
            isOpen={!!activeMenuCat}
            onClose={() => setActiveMenuCat(null)}
          />
        )}
      </header>

      {/* Global Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
