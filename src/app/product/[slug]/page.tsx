'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Zap,
  Ruler,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Truck,
  Sparkles,
  ChevronDown,
  Star,
  Check,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { PinCodeChecker } from '@/components/product/PinCodeChecker';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { ProductCard } from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/utils/formatters';

type SizeKey = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Find product by slug
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  // Dynamic Variant State
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<SizeKey | null>('L');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  // Current stock for selected size
  const currentSizeStock = selectedSize ? currentVariant.stockBySize[selectedSize] || 0 : 0;
  const isSelectedSizeOutOfStock = selectedSize !== null && currentSizeStock <= 0;

  // Handler for Color Change
  const handleColorChange = (index: number) => {
    setSelectedVariantIndex(index);
    // If the currently selected size is out of stock in this new color, adapt:
    const newVariant = product.variants[index];
    if (selectedSize && (newVariant.stockBySize[selectedSize] || 0) <= 0) {
      // Find first available size in this new color
      const availableSize = (['S', 'M', 'L', 'XL', 'XXL'] as const).find(
        (s) => (newVariant.stockBySize[s] || 0) > 0
      );
      setSelectedSize(availableSize || null);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    addToCart(product, currentVariant, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    addToCart(product, currentVariant, selectedSize, quantity);
    router.push('/checkout');
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-stone-200 bg-stone-50/50 py-3 text-xs text-stone-500 uppercase tracking-wider">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${product.category}`} className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${product.subcategory}`} className="hover:text-black">
            {product.subcategory.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (changes dynamically when color variant changes!) */}
          <div className="lg:col-span-7">
            <ProductGallery
              key={currentVariant.colorName}
              images={currentVariant.images}
              productName={product.name}
            />
          </div>

          {/* Right Column: Sticky Product Actions & Information */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Brand, Title & Rating */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.25em] text-stone-400 uppercase">
                  DARJA ATELIER
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                    isFavorited
                      ? 'border-red-200 bg-red-50 text-darja-accent'
                      : 'border-stone-200 text-stone-600 hover:border-black hover:text-black'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                  <span>{isFavorited ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black mt-1">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">{product.tagline}</p>
              )}

              {/* Star Rating & Review link */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex items-center gap-0.5 bg-black text-white px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-stone-400">•</span>
                <span className="text-stone-600 font-medium">{product.reviewCount} Verified Reviews</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-black font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm sm:text-base text-stone-400 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      SAVE {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">Inclusive of all taxes. Free shipping over ₹999.</p>
            </div>

            {/* Dynamic Color Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold tracking-wider uppercase text-black">
                  COLOUR: <strong className="text-stone-600 font-semibold">{currentVariant.colorName}</strong>
                </span>
                <span className="text-stone-400 text-[11px]">
                  {product.variants.length} {product.variants.length === 1 ? 'Color' : 'Colors'} Available
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.variants.map((v, index) => {
                  const isSelected = index === selectedVariantIndex;
                  return (
                    <button
                      key={v.colorName}
                      onClick={() => handleColorChange(index)}
                      className={`group relative p-1 rounded-full transition-all ${
                        isSelected ? 'ring-2 ring-black scale-110' : 'hover:scale-105'
                      }`}
                      title={v.colorName}
                    >
                      <span
                        className="w-7 h-7 rounded-full block border border-stone-300 shadow-subtle"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Size Selector with Stock Validation */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold tracking-wider uppercase text-black">
                  SELECT SIZE: {selectedSize && <strong className="text-stone-600">({selectedSize})</strong>}
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-black font-bold uppercase underline underline-offset-2 hover:opacity-75"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size) => {
                  const stock = currentVariant.stockBySize[size] || 0;
                  const isOutOfStock = stock <= 0;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`relative py-3 rounded text-xs font-bold uppercase transition-all ${
                        isSelected
                          ? 'bg-black text-white shadow-floating ring-2 ring-black'
                          : isOutOfStock
                          ? 'bg-stone-100 text-stone-300 cursor-not-allowed line-through'
                          : 'bg-white text-stone-900 border border-stone-200 hover:border-black hover:bg-stone-50'
                      }`}
                    >
                      <span>{size}</span>
                      {stock > 0 && stock <= 3 && (
                        <span className="absolute -top-1.5 -right-1 bg-amber-500 text-white text-[8px] px-1 rounded-full font-mono font-bold">
                          {stock} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Stock Notice */}
              {selectedSize && (
                <div className="text-xs font-medium pt-1">
                  {currentSizeStock <= 0 ? (
                    <span className="text-red-600 font-bold">
                      Size {selectedSize} is currently out of stock in {currentVariant.colorName}. Please select another size or color.
                    </span>
                  ) : currentSizeStock <= 4 ? (
                    <span className="text-amber-700 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" /> Hurry, only {currentSizeStock} items left in stock for size {selectedSize}!
                    </span>
                  ) : (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Stepper & Main CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded px-3 py-2 bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="text-stone-500 hover:text-black disabled:opacity-30 px-1 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(currentSizeStock || 10, q + 1))}
                    disabled={quantity >= (currentSizeStock || 10)}
                    className="text-stone-500 hover:text-black disabled:opacity-30 px-1 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* ADD TO BAG */}
                <button
                  onClick={handleAddToCart}
                  disabled={isSelectedSizeOutOfStock}
                  className="flex-1 py-3.5 bg-black hover:bg-stone-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-all shadow-floating flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSelectedSizeOutOfStock ? 'OUT OF STOCK' : 'ADD TO BAG'}</span>
                </button>
              </div>

              {/* BUY NOW */}
              <button
                onClick={handleBuyNow}
                disabled={isSelectedSizeOutOfStock}
                className="w-full py-3.5 bg-white border-2 border-black hover:bg-stone-50 disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed text-black text-xs font-bold tracking-[0.2em] uppercase rounded transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>BUY NOW WITH 1-CLICK</span>
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <PinCodeChecker />

            {/* Collapsible Accordions: Details, Fabric & Care, Shipping */}
            <div className="border-t border-stone-200 divide-y divide-stone-200 text-xs">
              {/* Product Description */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-black text-left"
                >
                  <span>PRODUCT DETAILS & DESCRIPTION</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === 'details' && (
                  <div className="pt-3 space-y-3 text-stone-600 animate-fade-in leading-relaxed">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-stone-800 bg-stone-50 p-3 rounded">
                      <div><strong className="text-stone-500">Fit:</strong> {product.specifications.fit}</div>
                      <div><strong className="text-stone-500">Pattern:</strong> {product.specifications.pattern}</div>
                      {product.specifications.collar && (
                        <div><strong className="text-stone-500">Collar:</strong> {product.specifications.collar}</div>
                      )}
                      {product.specifications.sleeve && (
                        <div><strong className="text-stone-500">Sleeve:</strong> {product.specifications.sleeve}</div>
                      )}
                      <div>
                        <strong className="text-stone-500">Model Stats:</strong> {product.specifications.modelHeight}, wearing size {product.specifications.modelSizeWorn}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fabric & Care */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-black text-left"
                >
                  <span>FABRIC & CARE INSTRUCTIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openAccordion === 'fabric' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pt-3 space-y-2 text-stone-600 animate-fade-in">
                    <p>
                      <strong>Material Composition:</strong> {product.fabric}
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-stone-500">
                      {product.careInstructions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3.5">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-black text-left"
                >
                  <span>SHIPPING & 7-DAY DOORSTEP RETURNS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-3 space-y-2 text-stone-600 animate-fade-in">
                    <p>
                      • <strong>Express Pan-India Delivery:</strong> Dispatched within 24 hours. Metro deliveries arrive in 1-2 business days.
                    </p>
                    <p>
                      • <strong>Doorstep 7-Day Exchange:</strong> If the size does not fit you like a glove, exchange it seamlessly through your account with reverse doorstep courier pickup.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection
          rating={product.rating}
          reviewCount={product.reviewCount}
          productName={product.name}
        />

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-stone-400 uppercase block mb-1">
                  CURATED RECOMMENDATIONS
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
                  COMPLETE THE LOOK
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
