'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  originalSubtotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  totalItemCount: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('darja_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('darja_coupon');
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('darja_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (
    product: Product,
    variant: ProductVariant,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    quantity: number = 1
  ) => {
    const maxStock = variant.stockBySize[size] || 10;
    if (maxStock <= 0) {
      showToast(`Size ${size} is currently out of stock`);
      return;
    }

    const itemId = `${product.id}-${variant.colorName.replace(/\s+/g, '-').toLowerCase()}-${size}`;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === itemId);

      if (existingItemIndex > -1) {
        const currentQty = prevCart[existingItemIndex].quantity;
        const newQty = Math.min(currentQty + quantity, maxStock);
        const updated = [...prevCart];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          color: variant.colorName,
          size: size,
          quantity: Math.min(quantity, maxStock),
          image: variant.images[0] || '/images/fallback.jpg',
          maxStock: maxStock,
        };
        return [newItem, ...prevCart];
      }
    });

    showToast(`Added ${product.name} (${size}) to Bag!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from Bag');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const clamped = Math.min(newQty, item.maxStock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    localStorage.removeItem('darja_cart');
    localStorage.removeItem('darja_coupon');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalSubtotal = cart.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Coupon application logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DARJA10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedCoupon('DARJA10');
      setCouponDiscount(disc);
      localStorage.setItem('darja_coupon', 'DARJA10');
      showToast('DARJA10 applied! 10% off bag total');
      return { success: true, message: 'Coupon applied! 10% off' };
    } else if (cleanCode === 'FIRSTDROP') {
      const disc = Math.min(250, subtotal);
      setAppliedCoupon('FIRSTDROP');
      setCouponDiscount(disc);
      localStorage.setItem('darja_coupon', 'FIRSTDROP');
      showToast('FIRSTDROP applied! ₹250 instant off');
      return { success: true, message: '₹250 off on your first order' };
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      setCouponDiscount(0);
      localStorage.setItem('darja_coupon', 'FREESHIP');
      showToast('FREESHIP applied! Free shipping unlocked');
      return { success: true, message: 'Free Shipping unlocked' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    localStorage.removeItem('darja_coupon');
    showToast('Coupon removed');
  };

  const effectiveShipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon === 'FREESHIP'
      ? 0
      : STANDARD_SHIPPING_FEE;

  const finalTotal = Math.max(0, subtotal - couponDiscount + effectiveShipping);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        subtotal,
        originalSubtotal,
        discount: couponDiscount,
        shippingFee: effectiveShipping,
        finalTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        totalItemCount,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
