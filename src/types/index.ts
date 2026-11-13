export type ProductCategory = 'shirts' | 't-shirts' | 'bottomwear' | 'kids' | 'collections' | 'best-sellers' | 'sale';

export type ProductSubcategory =
  // Shirts
  | 'plain-shirts'
  | 'checks-shirts'
  | 'printed-shirts'
  | 'striped-shirts'
  | 'casual-shirts'
  | 'formal-shirts'
  | 'oversized-shirts'
  // T-Shirts
  | 'plain-t-shirts'
  | 'oversized-t-shirts'
  | 'graphic-t-shirts'
  | 'printed-t-shirts'
  | 'polo-t-shirts'
  | 'typography-t-shirts'
  // Bottomwear
  | 'jeans'
  | 'trousers'
  | 'cargo-pants'
  | 'joggers'
  | 'shorts'
  // Kids & Youth
  | 'kids-wear'
  | 'kids-shirts'
  | 'kids-t-shirts'
  | 'kids-bottomwear';

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  images: string[];
  stockBySize: {
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  fabric: string;
  careInstructions: string[];
  specifications: {
    fit: string;
    collar?: string;
    neck?: string;
    sleeve: string;
    pattern: string;
    modelHeight: string;
    modelSizeWorn: string;
  };
  variants: ProductVariant[];
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id composed of productId-color-size
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  color: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
  image: string;
  maxStock: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: ShippingAddress;
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
}
