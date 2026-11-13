'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/types';
import { DEMO_IMAGES, getSafeImage } from '@/config/images';

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'courierName' | 'estimatedDelivery' | 'orderStatus'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'DARJA-934812',
    date: '2026-11-10T14:30:00Z',
    items: [
      {
        id: 'darja-sh-01-obsidian-black-L',
        productId: 'darja-sh-01',
        slug: 'minimalist-obsidian-oxford-shirt',
        name: 'Minimalist Obsidian Oxford Shirt',
        price: 1599,
        originalPrice: 2799,
        color: 'Obsidian Black',
        size: 'L',
        quantity: 1,
        image: DEMO_IMAGES.shirt,
        maxStock: 15,
      },
      {
        id: 'darja-ts-01-pitch-black-L',
        productId: 'darja-ts-01',
        slug: 'phantom-heavyweight-boxy-tee',
        name: 'Phantom 260 GSM Oversized Heavy Tee',
        price: 999,
        originalPrice: 1999,
        color: 'Pitch Black',
        size: 'L',
        quantity: 1,
        image: DEMO_IMAGES.tshirt,
        maxStock: 25,
      },
    ],
    subtotal: 2598,
    discount: 250,
    couponCode: 'FIRSTDROP',
    shippingFee: 0,
    total: 2348,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'Out for Delivery',
    shippingAddress: {
      fullName: 'Gaurav Sharma',
      phone: '+91 98765 43210',
      email: 'gaurav.sharma@example.com',
      street: '402, High Street Residences, Worli Sea Face',
      apartment: 'Tower B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
    },
    trackingNumber: 'BLUEDART-889210492',
    courierName: 'Blue Dart Express',
    estimatedDelivery: 'Tomorrow by 8:00 PM',
  },
  {
    id: 'DARJA-871203',
    date: '2026-11-04T10:15:00Z',
    items: [
      {
        id: 'darja-bw-01-vapour-grey-wash-L',
        productId: 'darja-bw-01',
        slug: 'vapour-wash-baggy-selvedge-jeans',
        name: 'Vapour Wash Wide-Leg Baggy Jeans',
        price: 2499,
        originalPrice: 4499,
        color: 'Vapour Grey Wash',
        size: 'L',
        quantity: 1,
        image: DEMO_IMAGES.pants,
        maxStock: 20,
      },
    ],
    subtotal: 2499,
    discount: 249,
    couponCode: 'DARJA10',
    shippingFee: 0,
    total: 2250,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'Delivered',
    shippingAddress: {
      fullName: 'Gaurav Sharma',
      phone: '+91 98765 43210',
      email: 'gaurav.sharma@example.com',
      street: '402, High Street Residences, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
    },
    trackingNumber: 'DELHIVERY-774019283',
    courierName: 'Delhivery Surface',
    estimatedDelivery: 'Delivered on Nov 7',
  },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('darja_orders');
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        const sanitized = parsed.map((ord) => ({
          ...ord,
          items: ord.items.map((it) => ({
            ...it,
            image: getSafeImage(it.image),
          })),
        }));
        setOrders(sanitized);
      }
    } catch {
      // Ignore
    }
  }, []);

  const createOrder = (
    orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'courierName' | 'estimatedDelivery' | 'orderStatus'>
  ): Order => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: `DARJA-${randomSuffix}`,
      date: new Date().toISOString(),
      orderStatus: 'Confirmed',
      trackingNumber: `EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      courierName: 'Blue Dart Air Express',
      estimatedDelivery: 'Expected delivery in 2-3 business days',
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem('darja_orders', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });

    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.id.toLowerCase() === orderId.toLowerCase() || o.trackingNumber.toLowerCase() === orderId.toLowerCase()
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord));
      try {
        localStorage.setItem('darja_orders', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderById, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
