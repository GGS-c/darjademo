'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import { DEMO_IMAGES, getSafeImage } from '@/config/images';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    originalSubtotal,
    discount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountNeededForFreeShipping,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponCode('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center px-4 py-16">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-sm text-stone-500 mt-2 max-w-md text-center">
          You haven&apos;t added any items to your bag yet. Explore our newest drops, oversized t-shirts, and tailored shirts.
        </p>
        <Link
          href="/category/new-arrivals"
          className="mt-8 px-8 py-3.5 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-stone-800 transition-colors shadow-floating"
        >
          EXPLORE NEW ARRIVALS
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-400 uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-semibold">Shopping Bag ({cart.length})</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-black mb-8">
          YOUR SHOPPING BAG
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Meter Banner */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                {amountNeededForFreeShipping === 0 || appliedCoupon === 'FREESHIP' ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-bold">
                    <Sparkles className="w-4 h-4" /> YOU QUALIFY FOR FREE EXPRESS SHIPPING!
                  </span>
                ) : (
                  <span className="text-stone-700">
                    Add <strong className="text-black">{formatPrice(amountNeededForFreeShipping)}</strong> more to get{' '}
                    <strong>FREE SHIPPING</strong>
                  </span>
                )}
                <span className="text-stone-500 font-mono">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    freeShippingProgress >= 100 || appliedCoupon === 'FREESHIP' ? 'bg-emerald-600' : 'bg-black'
                  }`}
                  style={{ width: appliedCoupon === 'FREESHIP' ? '100%' : `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-200">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative w-20 sm:w-24 aspect-[3/4] bg-stone-100 rounded overflow-hidden shrink-0"
                  >
                    <Image
                      src={getSafeImage(item.image) || DEMO_IMAGES.fallback}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                        DARJA
                      </span>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm sm:text-base font-bold text-black hover:underline block"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                        <span className="bg-stone-100 px-2 py-0.5 rounded font-medium text-stone-800">
                          Size: {item.size}
                        </span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold font-mono text-black">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-xs text-stone-400 line-through font-mono">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                            disabled={item.quantity >= item.maxStock}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-stone-50 p-6 rounded-lg border border-stone-200 space-y-6 lg:sticky lg:top-24">
            <h3 className="text-sm font-bold tracking-widest uppercase text-black border-b border-stone-200 pb-3">
              ORDER SUMMARY
            </h3>

            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>
                      Coupon <strong className="font-mono">{appliedCoupon}</strong> Applied!
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-red-600 font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code"
                      className="flex-1 px-3 py-2 border border-stone-300 rounded text-xs outline-none focus:border-black uppercase font-mono bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white text-xs font-bold tracking-wider uppercase rounded hover:bg-stone-800 transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => applyCoupon('DARJA10')}
                      className="text-[10px] bg-white border border-stone-300 hover:border-black px-2 py-0.5 rounded font-mono text-stone-700"
                    >
                      DARJA10 (-10%)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon('FIRSTDROP')}
                      className="text-[10px] bg-white border border-stone-300 hover:border-black px-2 py-0.5 rounded font-mono text-stone-700"
                    >
                      FIRSTDROP (-₹250)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-200 pt-4">
              <div className="flex justify-between">
                <span>Original MRP Total</span>
                <span className="font-mono">{formatPrice(originalSubtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Catalogue Discount</span>
                <span className="font-mono">-{formatPrice(originalSubtotal - subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span className="font-mono">{formatPrice(shippingFee)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-black pt-3 border-t border-stone-200">
                <span>Total Payable</span>
                <span className="font-mono">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-stone-900 transition-colors shadow-luxury flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Security Badges */}
            <div className="pt-2 text-center text-xs text-stone-500 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Guaranteed Safe & Secure Checkout</span>
              </div>
              <p className="text-[11px] text-stone-400">Doorstep reverse pickup on exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
