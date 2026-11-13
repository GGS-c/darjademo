export interface CategoryNavigationItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    description: string;
    tag?: string;
  }[];
}

export const MAIN_NAV_CATEGORIES: CategoryNavigationItem[] = [
  {
    id: 'shirts',
    name: 'SHIRTS',
    slug: 'shirts',
    description: 'Bespoke tailoring, breathable natural linens, and modern oversized silhouettes designed for the discerning gentleman.',
    bannerImage: '/images/categories/shirts.jpg',
    subcategories: [
      { id: 'plain-shirts', name: 'Plain Shirts', slug: 'plain-shirts', description: 'Timeless single-tone classics crafted from compact cotton & linen.' },
      { id: 'checks-shirts', name: 'Checks Shirts', slug: 'checks-shirts', description: 'Micro-houndstooth, buffalo, and windowpane checks.' },
      { id: 'printed-shirts', name: 'Printed Shirts', slug: 'printed-shirts', description: 'Editorial abstract, botanical, and resort prints.' },
      { id: 'striped-shirts', name: 'Striped Shirts', slug: 'striped-shirts', description: 'Crisp Bengal, banker, and Cuban relaxed stripes.' },
      { id: 'casual-shirts', name: 'Casual Shirts', slug: 'casual-shirts', description: 'Relaxed button-downs and textured waffle weaves.' },
      { id: 'formal-shirts', name: 'Formal Shirts', slug: 'formal-shirts', description: 'Impeccable Egyptian cotton double-ply business shirts.' },
      { id: 'oversized-shirts', name: 'Oversized Shirts', slug: 'oversized-shirts', description: 'Modern drop-shoulder street silhouettes.', tag: 'HOT' },
    ],
  },
  {
    id: 't-shirts',
    name: 'T-SHIRTS',
    slug: 't-shirts',
    description: 'Heavyweight 240+ GSM cotton, bio-washed finishes, and bold graphic typography engineered for effortless presence.',
    bannerImage: '/images/categories/t-shirts.jpg',
    subcategories: [
      { id: 'plain-t-shirts', name: 'Plain T-Shirts', slug: 'plain-t-shirts', description: 'Understated luxury crewnecks in essential neutral tones.' },
      { id: 'oversized-t-shirts', name: 'Oversized T-Shirts', slug: 'oversized-t-shirts', description: 'Structured drop-shoulder street fits in 260 GSM French Terry.', tag: 'BESTSELLER' },
      { id: 'graphic-t-shirts', name: 'Graphic T-Shirts', slug: 'graphic-t-shirts', description: 'Curated artistic visuals and high-density screenprints.' },
      { id: 'printed-t-shirts', name: 'Printed T-Shirts', slug: 'printed-t-shirts', description: 'Subtle all-over tonal textures and contemporary motifs.' },
      { id: 'polo-t-shirts', name: 'Polo T-Shirts', slug: 'polo-t-shirts', description: 'Knit waffle and mercerized pique polos with sleek zip or button collars.' },
      { id: 'typography-t-shirts', name: 'Typography T-Shirts', slug: 'typography-t-shirts', description: 'Bold statement lettering and minimalist editorial quotes.' },
    ],
  },
  {
    id: 'bottomwear',
    name: 'BOTTOMWEAR',
    slug: 'bottomwear',
    description: 'Engineered for comfort and commanding silhouettes. From Japanese-inspired wide-leg trousers to utilitarian multi-pocket cargos.',
    bannerImage: '/images/categories/bottomwear.jpg',
    subcategories: [
      { id: 'jeans', name: 'Jeans', slug: 'jeans', description: 'Premium selvedge, relaxed straight, and washed wide-leg denim.', tag: 'TRENDING' },
      { id: 'trousers', name: 'Trousers', slug: 'trousers', description: 'Korean pleated wide-leg and tailored smart formal trousers.' },
      { id: 'cargo-pants', name: 'Cargo Pants', slug: 'cargo-pants', description: 'Tactical multi-pocket and parachute utility pants.', tag: 'POPULAR' },
      { id: 'joggers', name: 'Joggers', slug: 'joggers', description: 'Heavyweight terry lounge and sleek tapered street joggers.' },
      { id: 'shorts', name: 'Shorts', slug: 'shorts', description: 'Linen resort and structured cotton utility shorts.' },
    ],
  },
];

export const HIGHLIGHT_COLLECTIONS = [
  {
    name: 'THE NOIR MONOCHROME',
    slug: 'noir-monochrome',
    tagline: 'Deep Obsidian & Stark Chalk Contrasts',
    image: '/images/categories/collection-noir.jpg',
    count: '18 Pieces',
  },
  {
    name: 'OVERSIZED ESSENTIALS',
    slug: 'oversized-essentials',
    tagline: '260 GSM Heavyweight French Terry',
    image: '/images/categories/collection-oversized.jpg',
    count: '24 Pieces',
  },
  {
    name: 'REFINED LINEN EDIT',
    slug: 'refined-linen',
    tagline: '100% Pure Breathable European Flax',
    image: '/images/categories/collection-linen.jpg',
    count: '14 Pieces',
  },
  {
    name: 'TACTICAL CARGO & UTILITY',
    slug: 'tactical-cargo',
    tagline: 'Functional Hardware & Fluid Parachute Cuts',
    image: '/images/categories/collection-tactical.jpg',
    count: '16 Pieces',
  },
];
