'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, formatDate } from '@/utils/formatters';

type AccountTab = 'orders' | 'addresses' | 'profile';

export default function AccountPage() {
  const { user, login, logout, addAddress, removeAddress } = useAuth();
  const { orders } = useOrders();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<AccountTab>('orders');
  const [loginEmail, setLoginEmail] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // New Address State
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  if (!user) {
    return (
      <div className="min-h-[75vh] bg-stone-50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-luxury max-w-md w-full border border-stone-200 space-y-6">
          <div className="text-center space-y-2">
            <span className="font-extrabold text-2xl tracking-[0.25em] text-black">DARJA</span>
            <span className="text-[9px] tracking-[0.45em] text-stone-500 font-semibold block uppercase">
              MENS WEAR
            </span>
            <h1 className="text-xl font-bold uppercase tracking-tight text-black pt-2">
              SIGN IN TO YOUR ACCOUNT
            </h1>
            <p className="text-xs text-stone-500">
              Manage your orders, track shipments, and access your saved addresses.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (loginEmail) login(loginEmail);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="gaurav.sharma@example.com"
                className="w-full px-3 py-2.5 border border-stone-300 rounded text-xs outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-stone-800 transition-colors shadow-subtle"
            >
              CONTINUE TO ACCOUNT
            </button>
          </form>

          <div className="text-center text-[11px] text-stone-400">
            For demo purposes, enter any email or click continue to sign in instantly.
          </div>
        </div>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPincode) return;

    addAddress({
      fullName: user.name,
      phone: user.phone,
      email: user.email,
      street: newStreet,
      city: newCity,
      state: newState || 'Maharashtra',
      pincode: newPincode,
    });

    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
    setIsAddingAddress(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Welcome Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-900 text-white font-extrabold text-xl flex items-center justify-center font-display">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-black">
                  {user.name}
                </h1>
                <span className="bg-black text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                  VIP MEMBER
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 font-mono">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-red-600 px-3 py-1.5 rounded border border-stone-200 hover:border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Tabs Nav */}
          <aside className="lg:col-span-3 bg-white rounded-lg border border-stone-200 shadow-subtle p-2 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'orders'
                  ? 'bg-black text-white'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </span>
              <span className="font-mono text-[11px]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-black text-white'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </span>
              <span className="font-mono text-[11px]">{user.addresses.length}</span>
            </button>

            <Link
              href="/wishlist"
              className="w-full flex items-center justify-between px-4 py-3 rounded text-xs font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-100 hover:text-black transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </span>
              <span className="font-mono text-[11px]">{wishlistCount}</span>
            </Link>

            <Link
              href="/track-order"
              className="w-full flex items-center justify-between px-4 py-3 rounded text-xs font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-100 hover:text-black transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Truck className="w-4 h-4" />
                <span>Track Order</span>
              </span>
            </Link>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-subtle min-h-[450px]">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-black">
                    ORDER HISTORY ({orders.length})
                  </h2>
                  <span className="text-xs text-stone-500">Reverse pickup eligible on all items</span>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16 text-stone-500">
                    <p className="text-sm">You have not placed any orders yet.</p>
                    <Link
                      href="/category/new-arrivals"
                      className="mt-4 inline-block px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-stone-200 rounded-lg overflow-hidden transition-all hover:border-stone-400"
                      >
                        {/* Order Header */}
                        <div className="bg-stone-50 p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              ORDER NUMBER
                            </span>
                            <span className="font-mono font-bold text-black text-sm">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              DATE PLACED
                            </span>
                            <span className="text-stone-700 font-mono">{formatDate(order.date)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              TOTAL AMOUNT
                            </span>
                            <span className="font-mono font-bold text-black">{formatPrice(order.total)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              STATUS
                            </span>
                            <span
                              className={`inline-block px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 divide-y divide-stone-100">
                          {order.items.map((item) => (
                            <div key={item.id} className="py-3 flex gap-4 items-center text-xs">
                              <div className="relative w-14 h-18 bg-stone-100 rounded overflow-hidden shrink-0 aspect-[3/4]">
                                <Image src={item.image || '/images/fallback.jpg'} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-black truncate">{item.name}</h4>
                                <div className="text-stone-500 text-[11px] mt-0.5">
                                  Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                </div>
                              </div>
                              <div className="text-right font-mono font-bold">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer with Tracking link */}
                        <div className="bg-stone-50/50 p-3 px-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <span className="text-stone-500 text-[11px]">
                            Shipped via <strong>{order.courierName}</strong> (AWB: {order.trackingNumber})
                          </span>
                          <Link
                            href={`/track-order?orderId=${order.id}`}
                            className="inline-flex items-center gap-1 font-bold text-black hover:underline uppercase text-[11px]"
                          >
                            <span>Track Package</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-black">
                    SAVED ADDRESSES ({user.addresses.length})
                  </h2>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form
                    onSubmit={handleSaveAddress}
                    className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3 text-xs animate-fade-in"
                  >
                    <span className="font-bold uppercase tracking-wider text-black block">
                      NEW SHIPPING ADDRESS
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Street address / Flat number / Colony"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded bg-white"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="px-3 py-2 border border-stone-300 rounded bg-white"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="px-3 py-2 border border-stone-300 rounded bg-white"
                      />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="PIN code"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="px-3 py-2 border border-stone-300 rounded bg-white font-mono"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black text-white font-bold rounded uppercase text-xs"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 border border-stone-300 rounded text-stone-600 uppercase text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-stone-200 rounded-lg relative space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-black">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="bg-stone-100 text-stone-700 text-[9px] uppercase font-bold px-1.5 py-0.2 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600">{addr.street}</p>
                      {addr.apartment && <p className="text-stone-600">{addr.apartment}</p>}
                      <p className="text-stone-600">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-stone-500 font-mono mt-1">Phone: {addr.phone}</p>
                      <button
                        onClick={() => removeAddress(idx)}
                        className="text-stone-400 hover:text-red-600 pt-2 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
