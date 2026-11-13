import { DEMO_IMAGES } from '@/config/images';

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
    bannerImage: DEMO_IMAGES.shirt,
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
    bannerImage: DEMO_IMAGES.tshirt,
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
    bannerImage: DEMO_IMAGES.pants,
    subcategories: [
      { id: 'jeans', name: 'Jeans', slug: 'jeans', description: 'Premium selvedge, relaxed straight, and washed wide-leg denim.', tag: 'TRENDING' },
      { id: 'trousers', name: 'Trousers', slug: 'trousers', description: 'Korean pleated wide-leg and tailored smart formal trousers.' },
      { id: 'cargo-pants', name: 'Cargo Pants', slug: 'cargo-pants', description: 'Tactical multi-pocket and parachute utility pants.', tag: 'POPULAR' },
      { id: 'joggers', name: 'Joggers', slug: 'joggers', description: 'Heavyweight terry lounge and sleek tapered street joggers.' },
      { id: 'shorts', name: 'Shorts', slug: 'shorts', description: 'Linen resort and structured cotton utility shorts.' },
    ],
  },
  {
    id: 'kids',
    name: 'KIDS & YOUTH',
    slug: 'kids',
    description: 'Youth and junior street apparel designed with relaxed boxy cuts and premium soft-touch cotton.',
    bannerImage: DEMO_IMAGES.kids,
    subcategories: [
      { id: 'kids-shirts', name: 'Junior Shirts', slug: 'kids-shirts', description: 'Tailored casual button-downs crafted for comfortable movement.' },
      { id: 'kids-t-shirts', name: 'Junior Graphic & Boxy Tees', slug: 'kids-t-shirts', description: 'Bio-washed 220 GSM breathable crewnecks with bold streetwear prints.', tag: 'POPULAR' },
      { id: 'kids-bottomwear', name: 'Youth Cargo & Joggers', slug: 'kids-bottomwear', description: 'Functional utility pockets and elasticated comfort waistbands.' },
    ],
  },
];

export const HIGHLIGHT_COLLECTIONS = [
  {
    name: 'THE NOIR MONOCHROME',
    slug: 'noir-monochrome',
    tagline: 'Deep Obsidian & Stark Chalk Contrasts',
    image: DEMO_IMAGES.shirt,
    count: '18 Pieces',
  },
  {
    name: 'OVERSIZED ESSENTIALS',
    slug: 'oversized-essentials',
    tagline: '260 GSM Heavyweight French Terry',
    image: DEMO_IMAGES.tshirt,
    count: '24 Pieces',
  },
  {
    name: 'REFINED LINEN EDIT',
    slug: 'refined-linen',
    tagline: '100% Pure Breathable European Flax',
    image: DEMO_IMAGES.banner,
    count: '14 Pieces',
  },
  {
    name: 'TACTICAL CARGO & UTILITY',
    slug: 'tactical-cargo',
    tagline: 'Functional Hardware & Fluid Parachute Cuts',
    image: DEMO_IMAGES.pants,
    count: '16 Pieces',
  },
];
