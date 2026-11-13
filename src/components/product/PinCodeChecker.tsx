'use client';

import React, { useState } from 'react';
import { Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export function PinCodeChecker() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    deliveryDate?: string;
    codAvailable?: boolean;
    message?: string;
  } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code',
      });
      return;
    }

    // Realistic simulation based on first digits
    let city = 'Metro Region';
    let days = 2;

    if (cleanPin.startsWith('40') || cleanPin.startsWith('41')) {
      city = 'Mumbai / Pune Metro';
      days = 1;
    } else if (cleanPin.startsWith('11') || cleanPin.startsWith('12')) {
      city = 'Delhi NCR';
      days = 1;
    } else if (cleanPin.startsWith('56')) {
      city = 'Bengaluru Urban';
      days = 1;
    } else if (cleanPin.startsWith('60')) {
      city = 'Chennai';
      days = 2;
    } else if (cleanPin.startsWith('70')) {
      city = 'Kolkata';
      days = 2;
    } else if (cleanPin.startsWith('50')) {
      city = 'Hyderabad';
      days = 2;
    } else {
      city = 'Standard Pincode Area';
      days = 3;
    }

    const today = new Date();
    today.setDate(today.getDate() + days);
    const dateFormatted = today.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    setResult({
      valid: true,
      city: city,
      deliveryDate: days === 1 ? 'Tomorrow by 8 PM' : `By ${dateFormatted}`,
      codAvailable: true,
    });
  };

  return (
    <div className="border border-stone-200 rounded-lg p-4 bg-stone-50/50">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
        <Truck className="w-4 h-4 text-black" />
        <span>CHECK DELIVERY & CASH ON DELIVERY</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-Digit PIN code"
          className="flex-1 px-3 py-2 text-xs font-mono border border-stone-300 rounded bg-white outline-none focus:border-black tracking-wider"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-800 transition-colors"
        >
          CHECK
        </button>
      </form>

      {result && (
        <div className="mt-3 text-xs animate-fade-in">
          {result.valid ? (
            <div className="space-y-1.5 text-stone-700 bg-white p-3 rounded border border-stone-200">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Express Delivery to {result.city}: {result.deliveryDate}</span>
              </div>
              <p className="text-[11px] text-stone-500 pl-5">
                • Cash on Delivery is eligible for this address
              </p>
              <p className="text-[11px] text-stone-500 pl-5">
                • Free express doorstep reverse pickup on returns
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
              <AlertCircle className="w-4 h-4" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
