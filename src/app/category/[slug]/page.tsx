'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, X, SlidersHorizontal, ChevronRight, LayoutGrid, Grid3X3, Grid2X2 } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { MAIN_NAV_CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSubcategory } from '@/types';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount';

const COLOR_FILTERS = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Grey', hex: '#6b7280' },
  { name: 'Beige', hex: '#d6d3d1' },
  { name: 'Olive', hex: '#3f4e3c' },
  { name: 'Navy', hex: '#1e3a8a' },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'all';

  // State
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Category title & metadata
  const currentCategory = MAIN_NAV_CATEGORIES.find((c) => c.slug === slug);
  const currentSubcategory = MAIN_NAV_CATEGORIES.flatMap((c) => c.subcategories).find(
    (s) => s.slug === slug
  );

  let pageTitle = 'ALL COLLECTIONS';
  let pageDescription = 'Explore our complete seasonal menswear drops engineered for modern presence.';

  if (slug === 'new-arrivals') {
    pageTitle = 'NEW ARRIVALS';
    pageDescription = 'The latest silhouettes fresh off the atelier. Limited initial drops.';
  } else if (slug === 'best-sellers') {
    pageTitle = 'BEST SELLERS';
    pageDescription = 'Our most demanded oversized tees, crisp shirts, and tailored bottoms.';
  } else if (slug === 'sale') {
    pageTitle = 'END OF SEASON SALE';
    pageDescription = 'Up to 50% off on signature seasonal menswear pieces. While stocks last.';
  } else if (currentCategory) {
    pageTitle = currentCategory.name;
    pageDescription = currentCategory.description;
  } else if (currentSubcategory) {
    pageTitle = currentSubcategory.name;
    pageDescription = currentSubcategory.description;
  }

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Slug match
      if (slug === 'new-arrivals') {
        if (!product.isNewArrival && !product.isTrending) return false;
      } else if (slug === 'best-sellers') {
        if (!product.isBestSeller) return false;
      } else if (slug === 'sale') {
        if (product.discountPercentage < 40) return false;
      } else if (currentCategory) {
        if (product.category !== currentCategory.id) return false;
      } else if (currentSubcategory) {
        if (product.subcategory !== currentSubcategory.id) return false;
      }

      // Size Filter
      if (selectedSizes.length > 0) {
        const hasSizeInStock = product.variants.some((v) =>
          selectedSizes.some((s) => (v.stockBySize[s as keyof typeof v.stockBySize] || 0) > 0)
        );
        if (!hasSizeInStock) return false;
      }

      // Color Filter
      if (selectedColors.length > 0) {
        const matchesColor = product.variants.some((v) =>
          selectedColors.some((c) => v.colorName.toLowerCase().includes(c.toLowerCase()))
        );
        if (!matchesColor) return false;
      }

      // Price Range Filter
      if (selectedPriceRange) {
        if (selectedPriceRange === 'under-1000' && product.price >= 1000) return false;
        if (selectedPriceRange === '1000-1500' && (product.price < 1000 || product.price > 1500)) return false;
        if (selectedPriceRange === '1500-2000' && (product.price < 1500 || product.price > 2000)) return false;
        if (selectedPriceRange === 'above-2000' && product.price <= 2000) return false;
      }

      // In Stock Only
      if (inStockOnly) {
        const totalStock = product.variants.reduce(
          (sum, v) => sum + Object.values(v.stockBySize).reduce((a, b) => a + b, 0),
          0
        );
        if (totalStock <= 0) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (selectedSort === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0; // recommended
    });
  }, [slug, currentCategory, currentSubcategory, selectedSizes, selectedColors, selectedPriceRange, inStockOnly, selectedSort]);

  const activeFiltersCount =
    selectedSizes.length + selectedColors.length + (selectedPriceRange ? 1 : 0) + (inStockOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRange(null);
    setInStockOnly(false);
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Category Top Banner */}
      <div className="border-b border-stone-200 bg-stone-50/60 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-stone-400 uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/category/shirts" className="hover:text-black">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-black font-semibold">{pageTitle}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-black">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-2xl">{pageDescription}</p>

          {/* Subcategory Quick Pills */}
          {currentCategory && (
            <div className="flex flex-wrap gap-2 mt-6">
              <Link
                href={`/category/${currentCategory.slug}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white"
              >
                All {currentCategory.name}
              </Link>
              {currentCategory.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/category/${sub.slug}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white border border-stone-200 text-stone-700 hover:border-black hover:text-black transition-all"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Control Bar: Total Count, Sorting & Grid Switcher */}
      <div className="border-b border-stone-200 sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Left: Mobile Filter Button & Product Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded text-xs font-bold uppercase tracking-wider text-black"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
            <span className="text-xs font-bold tracking-wider uppercase text-stone-500 font-mono">
              {filteredProducts.length} PRODUCTS FOUND
            </span>
          </div>

          {/* Right: Grid Switcher & Sorting Dropdown */}
          <div className="flex items-center gap-4">
            {/* Desktop Grid Switcher */}
            <div className="hidden lg:flex items-center border border-stone-200 rounded p-0.5">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded ${gridCols === 3 ? 'bg-black text-white' : 'text-stone-400 hover:text-black'}`}
                title="3 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded ${gridCols === 4 ? 'bg-black text-white' : 'text-stone-400 hover:text-black'}`}
                title="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline font-bold tracking-wider text-stone-500 uppercase">
                SORT BY:
              </span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded font-semibold text-xs text-stone-900 outline-none focus:border-black cursor-pointer uppercase"
              >
                <option value="recommended">RECOMMENDED</option>
                <option value="newest">NEWEST FIRST</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
                <option value="discount">BIGGEST DISCOUNT</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags Strip */}
        {activeFiltersCount > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              ACTIVE FILTERS:
            </span>
            {selectedSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs px-2.5 py-0.5 rounded-full font-medium"
              >
                <span>Size: {size}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedColors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs px-2.5 py-0.5 rounded-full font-medium"
              >
                <span>Color: {color}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedPriceRange && (
              <button
                onClick={() => setSelectedPriceRange(null)}
                className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs px-2.5 py-0.5 rounded-full font-medium"
              >
                <span>Price: {selectedPriceRange}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {inStockOnly && (
              <button
                onClick={() => setInStockOnly(false)}
                className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs px-2.5 py-0.5 rounded-full font-medium"
              >
                <span>In Stock Only</span>
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-red-600 hover:underline uppercase ml-2"
            >
              CLEAR ALL
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-36">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-black">
                FILTERS ({activeFiltersCount})
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-stone-500 hover:text-black uppercase underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Size Filter */}
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-800 block mb-3">
                SELECT SIZE
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-xs font-bold rounded uppercase transition-all ${
                        isSelected
                          ? 'bg-black text-white shadow-subtle'
                          : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-800 block mb-3">
                COLOUR
              </span>
              <div className="flex flex-wrap gap-2.5">
                {COLOR_FILTERS.map((col) => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => toggleColor(col.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-black bg-stone-100 ring-1 ring-black'
                          : 'border-stone-200 hover:border-stone-400 bg-white'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-stone-300"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-b border-stone-100 pb-5">
              <span className="text-xs font-bold tracking-wider uppercase text-stone-800 block mb-3">
                PRICE RANGE
              </span>
              <div className="space-y-2 text-xs text-stone-700">
                {[
                  { id: 'under-1000', label: 'Under ₹1,000' },
                  { id: '1000-1500', label: '₹1,000 - ₹1,500' },
                  { id: '1500-2000', label: '₹1,500 - ₹2,000' },
                  { id: 'above-2000', label: 'Above ₹2,000' },
                ].map((range) => (
                  <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price-range"
                      checked={selectedPriceRange === range.id}
                      onChange={() =>
                        setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)
                      }
                      className="accent-black"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Only Toggle */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-black w-4 h-4 rounded"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="col-span-1 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-stone-300 rounded-lg">
                <h3 className="text-base font-bold uppercase tracking-wider text-black">
                  NO PRODUCTS MATCH THE CHOSEN FILTERS
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try clearing some filter tags or explore our new season arrivals.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 gap-4 sm:gap-6 ${
                  gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end animate-fade-in">
          <div className="w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-black">
                FILTERS {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
              {/* Size */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">
                  Sizes
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`py-2 text-xs font-bold rounded uppercase ${
                        selectedSizes.includes(s)
                          ? 'bg-black text-white'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">
                  Colours
                </span>
                <div className="flex flex-wrap gap-2">
                  {COLOR_FILTERS.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => toggleColor(col.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs ${
                        selectedColors.includes(col.name)
                          ? 'border-black bg-stone-100 ring-1 ring-black'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">
                  Price
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'under-1000', label: 'Under ₹1,000' },
                    { id: '1000-1500', label: '₹1,000 - ₹1,500' },
                    { id: '1500-2000', label: '₹1,500 - ₹2,000' },
                    { id: 'above-2000', label: 'Above ₹2,000' },
                  ].map((r) => (
                    <label key={r.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="mob-price"
                        checked={selectedPriceRange === r.id}
                        onChange={() =>
                          setSelectedPriceRange(selectedPriceRange === r.id ? null : r.id)
                        }
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 bg-stone-50 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider border border-stone-300 rounded text-stone-700"
              >
                RESET
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-black text-white rounded"
              >
                APPLY ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
