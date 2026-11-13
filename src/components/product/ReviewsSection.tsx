'use client';

import React from 'react';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  productName: string;
}

const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Vikramaditya S.',
    location: 'Mumbai',
    date: '3 days ago',
    rating: 5,
    title: 'The fabric weight and drape is unmatched!',
    comment:
      'I was hesitant at first ordering online, but this exceeded all my expectations. The 260 GSM fabric holds its boxy structure throughout the day without creasing. It looks like a high-end designer piece costing 4x as much.',
    sizePurchased: 'Size L',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Aakash Verma',
    location: 'Bengaluru',
    date: '1 week ago',
    rating: 5,
    title: 'True to size, sleek collar that stays crisp',
    comment:
      'Collar does not sag even after 2 machine washes. Sits beautifully over wide-leg trousers. Fast delivery to Indiranagar within 24 hours too!',
    sizePurchased: 'Size M',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Sameer Khan',
    location: 'New Delhi',
    date: '2 weeks ago',
    rating: 4,
    title: 'Premium stitching and minimal branding',
    comment:
      'Love the subtle tone-on-tone details. Not covered in loud logos like typical brands. Very clean minimalist aesthetic.',
    sizePurchased: 'Size XL',
    verified: true,
  },
];

export function ReviewsSection({ rating, reviewCount, productName }: ReviewsSectionProps) {
  return (
    <div className="pt-12 border-t border-stone-200">
      <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-black mb-8">
        CUSTOMER RATINGS & REVIEWS
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Score Summary */}
        <div className="lg:col-span-4 bg-stone-50 p-6 rounded-lg border border-stone-200 text-center sm:text-left">
          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-4xl font-extrabold font-mono text-black">{rating.toFixed(1)}</span>
            <span className="text-stone-400 text-sm">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 text-stone-200'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-stone-500">Based on {reviewCount} verified purchases</p>

          {/* Rating Bars */}
          <div className="mt-5 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 text-stone-500">5 ★</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: '82%' }} />
              </div>
              <span className="w-8 text-right font-mono text-stone-500">82%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 text-stone-500">4 ★</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: '14%' }} />
              </div>
              <span className="w-8 text-right font-mono text-stone-500">14%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 text-stone-500">3 ★</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-stone-400 rounded-full" style={{ width: '3%' }} />
              </div>
              <span className="w-8 text-right font-mono text-stone-500">3%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 text-stone-500">2 ★</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-stone-300 rounded-full" style={{ width: '1%' }} />
              </div>
              <span className="w-8 text-right font-mono text-stone-500">1%</span>
            </div>
          </div>
        </div>

        {/* Right Individual Reviews */}
        <div className="lg:col-span-8 space-y-6">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="border-b border-stone-100 pb-6 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-stone-200 text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-black">{review.title}</span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">{review.date}</span>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed mb-3">{review.comment}</p>

              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900">{review.author}</span>
                  <span>({review.location})</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.2 rounded">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Buyer
                    </span>
                  )}
                  <span className="bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded font-medium">
                    {review.sizePurchased}
                  </span>
                </div>

                <button className="flex items-center gap-1 hover:text-black transition-colors">
                  <ThumbsUp className="w-3 h-3" /> Helpful (12)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
