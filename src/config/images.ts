/**
 * DARJA MENS WEAR - Centralized Demo Image Configuration
 * 
 * Reusable high-resolution WebP images stored locally in public/images/demo/
 * Keeps total image footprint under 300 KB across the entire site.
 */

export const DEMO_IMAGES = {
  shirt: '/images/demo/mens-shirt.webp',
  tshirt: '/images/demo/mens-tshirt.webp',
  pants: '/images/demo/mens-pants.webp',
  kids: '/images/demo/kids-fashion.webp',
  banner: '/images/demo/fashion-banner.webp',
  fallback: '/images/demo/fallback.webp',
} as const;

export type DemoImageKey = keyof typeof DEMO_IMAGES;

/**
 * Returns the primary demo image matching a product's category or name.
 */
export function getProductImage(category?: string, subcategory?: string, name?: string): string {
  const cat = (category || '').toLowerCase();
  const sub = (subcategory || '').toLowerCase();
  const title = (name || '').toLowerCase();

  if (cat.includes('kid') || sub.includes('kid') || title.includes('kid') || title.includes('junior') || title.includes('youth')) {
    return DEMO_IMAGES.kids;
  }
  if (
    cat.includes('t-shirt') ||
    cat.includes('tee') ||
    sub.includes('t-shirt') ||
    sub.includes('tee') ||
    title.includes('t-shirt') ||
    title.includes('tee') ||
    title.includes('polo')
  ) {
    return DEMO_IMAGES.tshirt;
  }
  if (
    cat.includes('bottom') ||
    cat.includes('pant') ||
    cat.includes('jean') ||
    cat.includes('trouser') ||
    cat.includes('cargo') ||
    cat.includes('jogger') ||
    cat.includes('short') ||
    sub.includes('pant') ||
    sub.includes('jean') ||
    sub.includes('cargo')
  ) {
    return DEMO_IMAGES.pants;
  }
  // Default to shirts
  return DEMO_IMAGES.shirt;
}

/**
 * Returns secondary hover/crossfade image for product card.
 */
export function getSecondaryImage(category?: string, subcategory?: string, name?: string): string {
  const primary = getProductImage(category, subcategory, name);
  if (primary === DEMO_IMAGES.shirt) return DEMO_IMAGES.banner;
  if (primary === DEMO_IMAGES.tshirt) return DEMO_IMAGES.banner;
  if (primary === DEMO_IMAGES.pants) return DEMO_IMAGES.shirt;
  if (primary === DEMO_IMAGES.kids) return DEMO_IMAGES.banner;
  return DEMO_IMAGES.banner;
}

/**
 * Returns image gallery for product detail view.
 */
export function getProductGalleryImages(category?: string, subcategory?: string, name?: string): string[] {
  const primary = getProductImage(category, subcategory, name);
  const secondary = getSecondaryImage(category, subcategory, name);
  return [primary, secondary, DEMO_IMAGES.banner];
}

/**
 * Safe image fallback helper: guarantees an existing local image path.
 */
export function getSafeImage(src?: string | null): string {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return DEMO_IMAGES.fallback;
  }
  if (src.startsWith('http://') || src.startsWith('https://') || src.includes('unsplash') || src.includes('cloudinary')) {
    return DEMO_IMAGES.fallback;
  }
  return src;
}
