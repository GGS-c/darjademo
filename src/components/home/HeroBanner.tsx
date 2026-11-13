'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEMO_IMAGES } from '@/config/images';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    title: 'THE MONOCHROME STATEMENT',
    subtitle: 'NEW SEASON DROP / SS26',
    tagline: 'DEFINE YOUR STYLE. OWN YOUR PRESENCE.',
    image: DEMO_IMAGES.banner,
    ctaText: 'EXPLORE NEW DROPS',
    ctaLink: '/category/new-arrivals',
    secondaryCtaText: 'SHOP BEST SELLERS',
    secondaryCtaLink: '/category/best-sellers',
  },
  {
    id: 'slide-2',
    title: 'HEAVYWEIGHT OVERSIZED TEES',
    subtitle: '260 GSM FRENCH TERRY ESSENTIALS',
    tagline: 'ARCHITECTURAL BOX-CUT SILHOUETTES THAT HOLD FORM',
    image: DEMO_IMAGES.tshirt,
    ctaText: 'DISCOVER TEES',
    ctaLink: '/category/oversized-t-shirts',
    secondaryCtaText: 'VIEW LOOKBOOK',
    secondaryCtaLink: '/category/t-shirts',
  },
  {
    id: 'slide-3',
    title: 'THE REFINED LINEN EDIT',
    subtitle: '100% PURE EUROPEAN FLAX',
    tagline: 'EFFORTLESS LUXURY FOR ELEVATED LIVING',
    image: DEMO_IMAGES.shirt,
    ctaText: 'SHOP LINEN SHIRTS',
    ctaLink: '/category/shirts',
    secondaryCtaText: 'EXPLORE ALL',
    secondaryCtaLink: '/category/plain-shirts',
  },
  {
    id: 'slide-4',
    title: "MEN'S ATELIER COLLECTION",
    subtitle: 'BESPOKE TAILORING & PRECISION CUTS',
    tagline: 'COMMANDING ELEGANCE FOR MODERN GENTLEMEN',
    image: DEMO_IMAGES.pants,
    ctaText: "EXPLORE MEN'S EDIT",
    ctaLink: '/category/shirts',
    secondaryCtaText: 'VIEW ALL SUITS & SHIRTS',
    secondaryCtaLink: '/category/formal-shirts',
  },
  {
    id: 'slide-5',
    title: 'KIDS & YOUTH STREET DROP',
    subtitle: 'CONTEMPORARY RAW ATTITUDE',
    tagline: 'BAGGY SILHOUETTES & RELAXED TAILORING',
    image: DEMO_IMAGES.kids,
    ctaText: 'SHOP KIDS EDIT',
    ctaLink: '/category/kids',
    secondaryCtaText: 'EXPLORE BOTTOMWEAR',
    secondaryCtaLink: '/category/bottomwear',
  },
  {
    id: 'slide-6',
    title: 'T-SHIRT SIGNATURE CAPSULE',
    subtitle: 'PREMIUM SUPIMA & PUFF PRINTS',
    tagline: 'EVERYDAY REFINEMENT IN PURE COTTON',
    image: DEMO_IMAGES.tshirt,
    ctaText: 'SHOP T-SHIRTS',
    ctaLink: '/category/t-shirts',
    secondaryCtaText: 'GRAPHIC CAPSULE',
    secondaryCtaLink: '/category/graphic-t-shirts',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[90vh] bg-black overflow-hidden">
      {/* Background Slides */}
      {HERO_SLIDES.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover object-top filter brightness-[0.78]"
          />
          {/* Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-end pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl space-y-4 animate-fade-in">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold tracking-[0.25em] text-stone-200 border border-white/15 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {slide.subtitle}
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
            {slide.title}
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-sm lg:text-base text-stone-300 font-medium tracking-[0.15em] max-w-xl uppercase">
            {slide.tagline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href={slide.ctaLink}
              className="px-6 sm:px-8 py-3.5 bg-white text-black hover:bg-stone-200 text-xs font-bold tracking-[0.2em] uppercase rounded transition-all shadow-luxury flex items-center gap-2 group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={slide.secondaryCtaLink}
              className="px-6 sm:px-8 py-3.5 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/30 hover:border-white text-xs font-bold tracking-[0.2em] uppercase rounded transition-all flex items-center gap-2"
            >
              <span>{slide.secondaryCtaText}</span>
            </Link>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 right-6 sm:right-10 z-30 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-3">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
