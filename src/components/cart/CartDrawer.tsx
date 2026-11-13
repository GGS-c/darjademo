'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';
import { DEMO_IMAGES, getSafeImage } from '@/config/images';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div className="flex-1" onClick={closeCart} />

      {/* Slide Drawer */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h3 className="text-sm font-bold tracking-widest uppercase text-black">
              SHOPPING BAG ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-stone-100 p-3 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            {amountNeededForFreeShipping === 0 || appliedCoupon === 'FREESHIP' ? (
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> FREE EXPRESS SHIPPING UNLOCKED!
              </span>
            ) : (
              <span className="text-stone-700">
                Add <strong className="text-black">{formatPrice(amountNeededForFreeShipping)}</strong> more for{' '}
                <strong>FREE SHIPPING</strong>
              </span>
            )}
            <span className="text-stone-500 font-mono text-[11px]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                freeShippingProgress >= 100 || appliedCoupon === 'FREESHIP' ? 'bg-emerald-600' : 'bg-black'
              }`}
              style={{ width: appliedCoupon === 'FREESHIP' ? '100%' : `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-stone-900 tracking-wide">YOUR BAG IS EMPTY</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Explore our new season oversized tees, linen shirts, and cargo drops to elevate your wardrobe.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors rounded"
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-4 border-b border-stone-100 relative group animate-fade-in"
              >
                {/* Product Thumbnail */}
                <Link
                  href={`/product/${item.slug}`}
                  onClick={closeCart}
                  className="relative w-20 h-26 bg-stone-100 rounded overflow-hidden shrink-0 aspect-[3/4]"
                >
                  <Image
                    src={getSafeImage(item.image) || DEMO_IMAGES.fallback}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start pr-1">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="text-xs font-bold text-stone-900 hover:text-black line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1 -mr-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded font-medium text-stone-700">
                        Size: {item.size}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[120px]">{item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-stone-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                        disabled={item.quantity >= item.maxStock}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-black font-mono">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.originalPrice > item.price && (
                        <div className="text-[10px] text-stone-400 line-through font-mono">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            {/* Coupon Code Section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      Coupon <strong className="font-mono">{appliedCoupon}</strong> applied!
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-500 hover:text-red-600 font-bold text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter Coupon (e.g. DARJA10)"
                      className="flex-1 px-3 py-1.5 border border-stone-300 rounded text-xs outline-none focus:border-black uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-black text-white text-xs font-bold tracking-wider uppercase rounded hover:bg-stone-800 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
                  {/* Preset Quick Chips */}
                  <div className="flex gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => applyCoupon('DARJA10')}
                      className="text-[10px] bg-white border border-dashed border-stone-300 hover:border-black px-2 py-0.5 rounded font-mono text-stone-700"
                    >
                      DARJA10 (10% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon('FIRSTDROP')}
                      className="text-[10px] bg-white border border-dashed border-stone-300 hover:border-black px-2 py-0.5 rounded font-mono text-stone-700"
                    >
                      FIRSTDROP (₹250 OFF)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-black font-semibold font-mono">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold tracking-wider">FREE</span>
                  ) : (
                    <span className="text-black font-mono">{formatPrice(shippingFee)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="font-mono text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 bg-black text-white flex items-center justify-center gap-2 text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-stone-900 transition-colors shadow-floating"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block text-center text-[11px] font-bold tracking-wider uppercase text-stone-600 hover:text-black py-1 underline underline-offset-4"
              >
                View Full Bag & Cart Details
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-3 text-[10px] text-stone-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" /> 100% Genuine
              </span>
              <span>•</span>
              <span>7-Day Return</span>
              <span>•</span>
              <span>Secure SSL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
