'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Download,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/formatters';
import { Order } from '@/types';

type PaymentMethodType = 'upi' | 'card' | 'cod' | 'netbanking';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, finalTotal, clearCart, appliedCoupon } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  // Form State
  const [email, setEmail] = useState(user?.email || 'gaurav.sharma@example.com');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [fullName, setFullName] = useState(user?.name || 'Gaurav Sharma');
  const [street, setStreet] = useState('402, High Street Residences, Worli Sea Face');
  const [apartment, setApartment] = useState('Tower B, 4th Floor');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400018');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      // Create Order
      const newOrder = createOrder({
        items: [...cart],
        subtotal,
        discount,
        couponCode: appliedCoupon || undefined,
        shippingFee,
        total: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        shippingAddress: {
          fullName,
          phone,
          email,
          street,
          apartment,
          city,
          state,
          pincode,
        },
      });

      // Clear the cart
      clearCart();

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsProcessing(false);
      setConfirmedOrder(newOrder);
    }, 1500);
  };

  // If order was confirmed, show the luxury success screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-luxury border border-stone-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-black text-white p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-stone-400 block">
              PAYMENT & ORDER CONFIRMED
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              Your order <strong className="text-white font-mono">{confirmedOrder.id}</strong> has been received and is being prepared for dispatch.
            </p>
          </div>

          {/* Body Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Tracking Banner */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-stone-400 uppercase font-bold text-[10px] block">
                  COURIER PARTNER & AWB
                </span>
                <span className="font-bold text-stone-900 text-sm">
                  {confirmedOrder.courierName} ({confirmedOrder.trackingNumber})
                </span>
                <p className="text-stone-500 mt-0.5">{confirmedOrder.estimatedDelivery}</p>
              </div>
              <Link
                href="/track-order"
                className="px-4 py-2 bg-black text-white font-bold rounded uppercase text-[11px] tracking-wider hover:bg-stone-800 transition-colors whitespace-nowrap"
              >
                Track Live Status
              </Link>
            </div>

            {/* Ordered Items Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-3">
                ITEMS IN THIS SHIPMENT ({confirmedOrder.items.length})
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="p-3.5 flex gap-3 items-center">
                    <div className="relative w-14 h-18 bg-stone-100 rounded overflow-hidden shrink-0 aspect-[3/4]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-black truncate">{item.name}</h5>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Size: {item.size} • {item.color} • Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold text-xs">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 border border-stone-200 rounded-lg bg-stone-50/50">
                <span className="font-bold text-stone-400 uppercase text-[10px] block mb-1">
                  DELIVERY DESTINATION
                </span>
                <p className="font-bold text-stone-900">{confirmedOrder.shippingAddress.fullName}</p>
                <p className="text-stone-600">{confirmedOrder.shippingAddress.street}</p>
                {confirmedOrder.shippingAddress.apartment && (
                  <p className="text-stone-600">{confirmedOrder.shippingAddress.apartment}</p>
                )}
                <p className="text-stone-600">
                  {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} -{' '}
                  {confirmedOrder.shippingAddress.pincode}
                </p>
                <p className="text-stone-600 mt-1">Phone: {confirmedOrder.shippingAddress.phone}</p>
              </div>

              <div className="p-4 border border-stone-200 rounded-lg bg-stone-50/50 space-y-1.5">
                <span className="font-bold text-stone-400 uppercase text-[10px] block mb-1">
                  PAYMENT SUMMARY
                </span>
                <div className="flex justify-between text-stone-600">
                  <span>Method:</span>
                  <span className="font-bold text-stone-900 uppercase">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Payment Status:</span>
                  <span className="font-bold text-emerald-600 uppercase">
                    {confirmedOrder.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Total Paid:</span>
                  <span className="font-bold text-black font-mono">{formatPrice(confirmedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/account"
                className="flex-1 py-3.5 bg-black text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-stone-800 transition-colors text-center"
              >
                VIEW IN MY ORDERS
              </Link>
              <Link
                href="/category/new-arrivals"
                className="flex-1 py-3.5 border border-stone-300 text-stone-800 text-xs font-bold tracking-widest uppercase rounded hover:bg-stone-50 transition-colors text-center"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal Checkout Form
  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-6 mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
              FAST & ENCRYPTED CHECKOUT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
              CHECKOUT
            </h1>
          </div>
          <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encryption</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Customer Details & Shipping */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Contact */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-xs font-bold tracking-widest uppercase text-black flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                    1
                  </span>
                  CONTACT DETAILS
                </h3>
                <span className="text-[11px] text-stone-400">OTP not required for demo</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gaurav@example.com"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Phone Number (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-xs font-bold tracking-widest uppercase text-black flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                    2
                  </span>
                  SHIPPING ADDRESS
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full recipient name"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Street Address / House No / Road *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="House/Flat number, building name, street"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    Apartment / Suite / Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Near metro station / Landmark"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="400018"
                      className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-xs font-bold tracking-widest uppercase text-black flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                    3
                  </span>
                  PAYMENT METHOD
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold">Simulated Sandbox</span>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-black bg-stone-50 ring-1 ring-black'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-black mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-black">
                        UPI / QR (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <QrCode className="w-4 h-4 text-stone-500" />
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Instant 1-click simulated UPI authorization.
                    </p>
                  </div>
                </label>

                {/* Card Option */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-black bg-stone-50 ring-1 ring-black'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-black mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-black">
                        Credit / Debit Card (Visa, Mastercard, RuPay)
                      </span>
                      <CreditCard className="w-4 h-4 text-stone-500" />
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      All major Indian debit and credit cards accepted.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-stone-50 ring-1 ring-black'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-black mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-black">
                        Cash on Delivery (COD)
                      </span>
                      <Truck className="w-4 h-4 text-stone-500" />
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Pay via cash or UPI to the delivery executive at your doorstep.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-subtle space-y-6 lg:sticky lg:top-24">
              <h3 className="text-xs font-bold tracking-widest uppercase text-black border-b border-stone-200 pb-3">
                ORDER RECAP ({cart.reduce((s, i) => s + i.quantity, 0)} ITEMS)
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center text-xs">
                    <div className="relative w-12 h-16 bg-stone-100 rounded overflow-hidden shrink-0 aspect-[3/4]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-black truncate">{item.name}</h5>
                      <span className="text-stone-500 text-[11px]">
                        Size: {item.size} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-black">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      <span className="font-mono">{formatPrice(shippingFee)}</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-black pt-3 border-t border-stone-200">
                  <span>Final Total</span>
                  <span className="font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 bg-black hover:bg-stone-900 disabled:bg-stone-400 text-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-all shadow-luxury flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    PROCESSING TRANSACTION...
                  </span>
                ) : (
                  <>
                    <span>PLACE ORDER & PAY {formatPrice(finalTotal)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-stone-400">
                By placing this order you agree to DARJA Terms of Sale and 7-day Exchange Policy.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
