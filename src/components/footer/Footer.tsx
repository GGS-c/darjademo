'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-stone-900">
      {/* Brand Pillars Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-lg text-white shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase">FREE EXPRESS SHIPPING</h4>
              <p className="text-xs text-stone-400 mt-1">On all domestic prepaid & COD orders over ₹999 across India.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-lg text-white shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase">7-DAY DOORSTEP RETURNS</h4>
              <p className="text-xs text-stone-400 mt-1">Hassle-free size exchanges and returns with doorstep reverse pickup.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-lg text-white shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase">100% COMBED COTTON</h4>
              <p className="text-xs text-stone-400 mt-1">Pre-shrunk, heavyweight 240+ GSM fabrics built for longevity.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-stone-900 rounded-lg text-white shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase">SECURE TRANSACTIONS</h4>
              <p className="text-xs text-stone-400 mt-1">256-bit encrypted payments via UPI, Cards, NetBanking & COD.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="inline-block">
              <span className="font-extrabold text-3xl tracking-[0.25em] text-white">DARJA</span>
              <span className="text-[9px] tracking-[0.45em] text-stone-400 font-semibold block uppercase">
                MENS WEAR
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              DEFINE YOUR STYLE. OWN YOUR PRESENCE. DARJA MENS WEAR crafts contemporary silhouettes, 
              heavyweight oversized essentials, and refined bespoke tailoring for modern men across India.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold tracking-wider uppercase block text-stone-300 mb-2">
                JOIN THE DARJA VIP CLUB
              </span>
              <p className="text-xs text-stone-400 mb-3">
                Unlock 10% off your first drop and get early access to limited capsule releases.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You&apos;re on the VIP list! Use code <strong>DARJA10</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-stone-900 border border-stone-800 text-xs px-4 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-500 rounded-l"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors rounded-r flex items-center justify-center shrink-0"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shirts Column */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase text-white mb-4">SHIRTS</h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/category/plain-shirts" className="hover:text-white transition-colors">Plain Shirts</Link></li>
              <li><Link href="/category/checks-shirts" className="hover:text-white transition-colors">Checks Shirts</Link></li>
              <li><Link href="/category/printed-shirts" className="hover:text-white transition-colors">Printed Shirts</Link></li>
              <li><Link href="/category/striped-shirts" className="hover:text-white transition-colors">Striped Shirts</Link></li>
              <li><Link href="/category/casual-shirts" className="hover:text-white transition-colors">Casual Shirts</Link></li>
              <li><Link href="/category/formal-shirts" className="hover:text-white transition-colors">Formal Shirts</Link></li>
              <li><Link href="/category/oversized-shirts" className="hover:text-white transition-colors">Oversized Shirts</Link></li>
            </ul>
          </div>

          {/* T-Shirts & Bottomwear */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase text-white mb-4">TEES & BOTTOMS</h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/category/plain-t-shirts" className="hover:text-white transition-colors">Plain T-Shirts</Link></li>
              <li><Link href="/category/oversized-t-shirts" className="hover:text-white transition-colors">Oversized T-Shirts</Link></li>
              <li><Link href="/category/graphic-t-shirts" className="hover:text-white transition-colors">Graphic T-Shirts</Link></li>
              <li><Link href="/category/polo-t-shirts" className="hover:text-white transition-colors">Polo T-Shirts</Link></li>
              <li><Link href="/category/jeans" className="hover:text-white transition-colors">Baggy Jeans</Link></li>
              <li><Link href="/category/trousers" className="hover:text-white transition-colors">Pleated Trousers</Link></li>
              <li><Link href="/category/cargo-pants" className="hover:text-white transition-colors">Cargo Pants</Link></li>
              <li><Link href="/category/kids" className="text-stone-300 font-semibold hover:text-white transition-colors">Kids & Youth Drop</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="text-xs font-bold tracking-widest uppercase text-white mb-4">CUSTOMER CARE</h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
              <li><Link href="/admin" className="text-stone-500 hover:text-white transition-colors">Admin Dashboard</Link></li>
              <li><span className="text-stone-500">Contact: support@darjawear.com</span></li>
              <li><span className="text-stone-500">Mon - Sat: 10:00 AM - 7:00 PM</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Payments & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div>
          © 2026 DARJA MENS WEAR. ALL RIGHTS RESERVED. DEFINE YOUR STYLE. OWN YOUR PRESENCE.
        </div>

        {/* Accepted Payment Icons */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-stone-400 text-[10px] sm:text-[11px] font-mono">
          <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">UPI / GPAY</span>
          <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">VISA</span>
          <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">MASTERCARD</span>
          <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">RUPAY</span>
          <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">COD</span>
        </div>
      </div>
    </footer>
  );
}
