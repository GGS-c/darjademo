'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser, ShippingAddress } from '@/types';

interface AuthContextType {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string, phone: string) => void;
  addAddress: (address: ShippingAddress) => void;
  removeAddress: (index: number) => void;
}

const DEFAULT_USER: CustomerUser = {
  id: 'usr-darja-01',
  name: 'Gaurav Sharma',
  email: 'gaurav.sharma@example.com',
  phone: '+91 98765 43210',
  addresses: [
    {
      fullName: 'Gaurav Sharma',
      phone: '+91 98765 43210',
      email: 'gaurav.sharma@example.com',
      street: '402, High Street Residences, Worli Sea Face',
      apartment: 'Tower B, 4th Floor',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      isDefault: true,
    },
    {
      fullName: 'Gaurav Sharma (Office)',
      phone: '+91 98765 43210',
      email: 'gaurav.sharma@example.com',
      street: '12th Floor, One International Center, Senapati Bapat Marg',
      apartment: 'Prabhadevi',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400013',
      isDefault: false,
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(DEFAULT_USER);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('darja_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore
    }
  }, []);

  const login = (email: string) => {
    const newUser: CustomerUser = {
      ...DEFAULT_USER,
      email: email,
    };
    setUser(newUser);
    try {
      localStorage.setItem('darja_user', JSON.stringify(newUser));
    } catch {
      // Ignore
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('darja_user');
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: CustomerUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      addresses: [],
    };
    setUser(newUser);
    localStorage.setItem('darja_user', JSON.stringify(newUser));
  };

  const addAddress = (address: ShippingAddress) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: [...user.addresses, address],
    };
    setUser(updated);
    localStorage.setItem('darja_user', JSON.stringify(updated));
  };

  const removeAddress = (index: number) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter((_, i) => i !== index),
    };
    setUser(updated);
    localStorage.setItem('darja_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
