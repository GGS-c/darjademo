'use client';

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const isTops = category === 'shirts' || category === 't-shirts';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-luxury overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-black" />
            <h3 className="text-sm font-bold tracking-widest uppercase text-black">
              OFFICIAL DARJA SIZE GUIDE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Unit Switcher */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">
              Measurements shown below are garment dimensions.
            </span>
            <div className="flex border border-stone-300 rounded overflow-hidden">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${
                  unit === 'inches' ? 'bg-black text-white' : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${
                  unit === 'cm' ? 'bg-black text-white' : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-lg">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold tracking-wider uppercase">
                <tr>
                  <th className="p-3">Size</th>
                  {isTops ? (
                    <>
                      <th className="p-3">Chest</th>
                      <th className="p-3">Shoulder</th>
                      <th className="p-3">Length</th>
                      <th className="p-3">Sleeve</th>
                    </>
                  ) : (
                    <>
                      <th className="p-3">Waist</th>
                      <th className="p-3">Hip</th>
                      <th className="p-3">Thigh</th>
                      <th className="p-3">Length</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800 font-mono">
                {isTops ? (
                  <>
                    <tr>
                      <td className="p-3 font-bold text-black font-sans">S</td>
                      <td className="p-3">{unit === 'inches' ? '40"' : '101.6 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '18.5"' : '47.0 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '28.5"' : '72.4 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '9.0"' : '22.8 cm'}</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-bold text-black font-sans">M</td>
                      <td className="p-3">{unit === 'inches' ? '42"' : '106.6 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '19.5"' : '49.5 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '29.5"' : '74.9 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '9.5"' : '24.1 cm'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-black font-sans">L</td>
                      <td className="p-3">{unit === 'inches' ? '44"' : '111.7 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '20.5"' : '52.0 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '30.5"' : '77.5 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '10.0"' : '25.4 cm'}</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-bold text-black font-sans">XL</td>
                      <td className="p-3">{unit === 'inches' ? '46"' : '116.8 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '21.5"' : '54.6 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '31.5"' : '80.0 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '10.5"' : '26.6 cm'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-black font-sans">XXL</td>
                      <td className="p-3">{unit === 'inches' ? '48"' : '121.9 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '22.5"' : '57.1 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '32.5"' : '82.5 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '11.0"' : '27.9 cm'}</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="p-3 font-bold text-black font-sans">S (30)</td>
                      <td className="p-3">{unit === 'inches' ? '30-31"' : '76-79 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '42"' : '106 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '26"' : '66 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '40"' : '101 cm'}</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-bold text-black font-sans">M (32)</td>
                      <td className="p-3">{unit === 'inches' ? '32-33"' : '81-84 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '44"' : '111 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '27"' : '68 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '41"' : '104 cm'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-black font-sans">L (34)</td>
                      <td className="p-3">{unit === 'inches' ? '34-35"' : '86-89 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '46"' : '116 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '28"' : '71 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '42"' : '106 cm'}</td>
                    </tr>
                    <tr className="bg-stone-50/50">
                      <td className="p-3 font-bold text-black font-sans">XL (36)</td>
                      <td className="p-3">{unit === 'inches' ? '36-37"' : '91-94 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '48"' : '122 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '29"' : '73 cm'}</td>
                      <td className="p-3">{unit === 'inches' ? '43"' : '109 cm'}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Sizing Advice */}
          <div className="bg-stone-50 p-4 rounded-lg text-xs text-stone-600 space-y-1">
            <p className="font-bold text-black">FIT ADVICE:</p>
            <p>
              • <strong>Oversized silhouettes</strong> are tailored with intentionally dropped shoulders and generous body volume. For a regular tailored fit, order one size down.
            </p>
            <p>
              • If your chest measurement falls between sizes, we recommend sizing up for an effortless contemporary drape.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
