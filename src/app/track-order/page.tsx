'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { formatPrice, formatDate } from '@/utils/formatters';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get('orderId') || '';

  const { getOrderById, orders } = useOrders();

  const [searchId, setSearchId] = useState(queryOrderId || (orders[0]?.id || 'DARJA-934812'));
  const [searchedOrder, setSearchedOrder] = useState<ReturnType<typeof getOrderById>>(
    getOrderById(queryOrderId || (orders[0]?.id || 'DARJA-934812'))
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (queryOrderId) {
      setSearchId(queryOrderId);
      const found = getOrderById(queryOrderId);
      if (found) {
        setSearchedOrder(found);
      }
    }
  }, [queryOrderId, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const found = getOrderById(searchId.trim());
    if (found) {
      setSearchedOrder(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`No order found matching "${searchId}". Try "DARJA-934812" or "DARJA-871203"`);
    }
  };

  const steps = [
    { title: 'Confirmed', desc: 'Order received & verified' },
    { title: 'Processing', desc: 'Hand-picked & steam pressed' },
    { title: 'Shipped', desc: 'Handed over to Air Express' },
    { title: 'Out for Delivery', desc: 'Courier out with package' },
    { title: 'Delivered', desc: 'Package delivered to customer' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Confirmed': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.orderStatus) : 0;

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400">
            PAN-INDIA REAL-TIME TRACKING
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
            TRACK YOUR DARJA ORDER
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Enter your DARJA Order ID (e.g. DARJA-934812) or courier AWB number to check the live logistics status.
          </p>
        </div>

        {/* Search Input Bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto flex gap-2 bg-white p-2 rounded-xl shadow-subtle border border-stone-200"
        >
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Order ID (e.g. DARJA-934812)"
            className="flex-1 px-4 py-2.5 text-xs font-mono uppercase outline-none text-black"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>TRACK</span>
          </button>
        </form>

        {errorMsg && (
          <div className="max-w-xl mx-auto p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tracking Details View */}
        {searchedOrder && (
          <div className="bg-white rounded-xl shadow-luxury border border-stone-200 overflow-hidden animate-fade-in space-y-8 p-6 sm:p-10">
            {/* Top Status Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase block">
                  ORDER REFERENCE
                </span>
                <span className="text-xl font-extrabold font-mono text-black">
                  {searchedOrder.id}
                </span>
                <p className="text-xs text-stone-500 mt-0.5">
                  Placed on {formatDate(searchedOrder.date)}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold text-stone-400 uppercase block">
                  ESTIMATED DELIVERY
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {searchedOrder.estimatedDelivery}
                </span>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  {searchedOrder.courierName} • AWB: {searchedOrder.trackingNumber}
                </p>
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div>
              <div className="grid grid-cols-5 gap-2 relative">
                {/* Connecting track line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-stone-200 -z-0">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {steps.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-subtle ${
                          isDone
                            ? 'bg-black text-white'
                            : 'bg-white border-2 border-stone-300 text-stone-400'
                        } ${isCurrent ? 'ring-4 ring-stone-200 scale-110' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span className="text-xs font-bold text-black mt-3 uppercase tracking-wider block">
                        {step.title}
                      </span>
                      <span className="text-[10px] text-stone-400 mt-0.5 hidden sm:block">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipment Items & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200 text-xs">
              <div>
                <h4 className="font-bold uppercase tracking-wider text-black mb-3">
                  SHIPMENT DESTINATION
                </h4>
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-100 space-y-1 text-stone-600">
                  <p className="font-bold text-black">{searchedOrder.shippingAddress.fullName}</p>
                  <p>{searchedOrder.shippingAddress.street}</p>
                  {searchedOrder.shippingAddress.apartment && (
                    <p>{searchedOrder.shippingAddress.apartment}</p>
                  )}
                  <p>
                    {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} -{' '}
                    {searchedOrder.shippingAddress.pincode}
                  </p>
                  <p className="text-stone-500 font-mono mt-1">
                    Contact: {searchedOrder.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold uppercase tracking-wider text-black mb-3">
                  ITEMS IN SHIPMENT ({searchedOrder.items.length})
                </h4>
                <div className="space-y-2 border border-stone-200 rounded-lg p-3 bg-stone-50/50">
                  {searchedOrder.items.map((it) => (
                    <div key={it.id} className="flex gap-3 items-center">
                      <div className="relative w-10 h-14 bg-stone-200 rounded overflow-hidden shrink-0 aspect-[3/4]">
                        <Image src={it.image} alt={it.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black truncate">{it.name}</p>
                        <p className="text-[10px] text-stone-500">
                          {it.size} • {it.color} • Qty {it.quantity}
                        </p>
                      </div>
                      <span className="font-mono font-bold">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs">Loading order details...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
