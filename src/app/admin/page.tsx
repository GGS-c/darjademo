'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Tag,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  Search,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { MAIN_NAV_CATEGORIES } from '@/data/categories';
import { useOrders } from '@/context/OrderContext';
import { formatPrice, formatDate } from '@/utils/formatters';
import { Product, Order } from '@/types';

type AdminTab = 'overview' | 'products' | 'orders' | 'inventory' | 'discounts' | 'customers';

export default function AdminDashboardPage() {
  const { orders, updateOrderStatus } = useOrders();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'shirts' | 't-shirts' | 'bottomwear'>('shirts');
  const [newProdSubcategory, setNewProdSubcategory] = useState('oversized-shirts');
  const [newProdPrice, setNewProdPrice] = useState(1499);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState(2499);
  const [newProdColor, setNewProdColor] = useState('Obsidian Black');
  const [newProdImage, setNewProdImage] = useState(
    '/images/products/darja-sh-01-black-1.jpg'
  );

  // Discounts state
  const [coupons, setCoupons] = useState([
    { code: 'DARJA10', discount: '10% OFF', type: 'percentage', uses: 842, active: true },
    { code: 'FIRSTDROP', discount: '₹250 FLAT OFF', type: 'fixed', uses: 412, active: true },
    { code: 'FREESHIP', discount: 'FREE EXPRESS SHIPPING', type: 'shipping', uses: 295, active: true },
    { code: 'VIP20', discount: '20% OFF ORDERS > ₹3000', type: 'percentage', uses: 114, active: true },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  // Key metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 1482500;
  const totalOrdersCount = orders.length + 1248;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  // Filtered products for table
  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProd: Product = {
      id: `darja-custom-${Date.now()}`,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newProdName,
      tagline: 'Premium modern silhouette',
      category: newProdCategory,
      subcategory: newProdSubcategory as any,
      price: Number(newProdPrice),
      originalPrice: Number(newProdOriginalPrice),
      discountPercentage: Math.round(((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100),
      isNewArrival: true,
      rating: 5.0,
      reviewCount: 1,
      description: 'Crafted with premium compact cotton and meticulous craftsmanship.',
      fabric: '100% Combed Cotton, 240 GSM',
      careInstructions: ['Machine wash cold', 'Iron low'],
      specifications: {
        fit: 'Contemporary Relaxed',
        collar: 'Standard',
        sleeve: 'Full Sleeve',
        pattern: 'Solid',
        modelHeight: "6'1\"",
        modelSizeWorn: 'L',
      },
      variants: [
        {
          colorName: newProdColor,
          colorHex: '#000000',
          images: [newProdImage],
          stockBySize: { S: 10, M: 20, L: 20, XL: 10, XXL: 5 },
        },
      ],
      tags: ['new-drop', 'admin-created'],
    };

    setProductList([newProd, ...productList]);
    setIsAddProductOpen(false);
    setNewProdName('');
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount) return;
    setCoupons([
      ...coupons,
      {
        code: newCouponCode.toUpperCase().trim(),
        discount: newCouponDiscount,
        type: 'percentage',
        uses: 0,
        active: true,
      },
    ]);
    setNewCouponCode('');
    setNewCouponDiscount('');
  };

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen">
      {/* Admin Top Navigation */}
      <header className="border-b border-stone-800 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-[0.2em] text-white">DARJA</span>
              <span className="text-[10px] bg-white/10 text-stone-300 font-mono px-2 py-0.5 rounded border border-white/10">
                ADMIN CONSOLE
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="text-stone-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Exit to Live Storefront
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-stone-800 pb-4 mb-8">
          {[
            { id: 'overview', label: 'Overview & Reports', icon: BarChart3 },
            { id: 'products', label: 'Products Catalog', icon: Package },
            { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
            { id: 'inventory', label: 'Inventory & Sizes', icon: AlertCircle },
            { id: 'discounts', label: 'Coupons & Discounts', icon: Tag },
            { id: 'customers', label: 'Customer Management', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black shadow-luxury'
                    : 'bg-stone-800/60 text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: OVERVIEW & REVENUE ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/60 shadow-card">
                <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase tracking-wider">
                  <span>Gross Sales</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+28.4% vs last 30 days</span>
                </div>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/60 shadow-card">
                <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase tracking-wider">
                  <span>Orders Dispatched</span>
                  <ShoppingBag className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
                  {totalOrdersCount.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-sky-400 mt-2 font-medium">
                  <span>100% on-time SLA</span>
                </div>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/60 shadow-card">
                <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase tracking-wider">
                  <span>Average Order Value</span>
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
                  {formatPrice(avgOrderValue)}
                </div>
                <div className="text-[11px] text-stone-400 mt-2">Average items/basket: 2.3</div>
              </div>

              <div className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/60 shadow-card">
                <div className="flex items-center justify-between text-stone-400 text-xs font-bold uppercase tracking-wider">
                  <span>Store Conversion</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
                  4.82%
                </div>
                <div className="text-[11px] text-emerald-400 mt-2">Top 5% in Indian Menswear D2C</div>
              </div>
            </div>

            {/* Visual Revenue Performance Chart */}
            <div className="bg-stone-800/80 p-6 rounded-xl border border-stone-700/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-700/60 pb-4">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wider text-white">
                    MONTHLY REVENUE TRAJECTORY (FY 2026)
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Consistent growth propelled by Oversized Drops and Pure Linen capsule releases.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  Current Run Rate: ₹18.5L / Month
                </span>
              </div>

              {/* Bar Chart Representation */}
              <div className="pt-4 grid grid-cols-6 sm:grid-cols-12 gap-2 sm:gap-3 items-end h-52 sm:h-64 border-b border-stone-700/80 pb-2">
                {[
                  { month: 'Jan', val: 45, rev: '₹6.2L' },
                  { month: 'Feb', val: 52, rev: '₹7.1L' },
                  { month: 'Mar', val: 68, rev: '₹9.4L' },
                  { month: 'Apr', val: 60, rev: '₹8.2L' },
                  { month: 'May', val: 74, rev: '₹10.5L' },
                  { month: 'Jun', val: 82, rev: '₹11.8L' },
                  { month: 'Jul', val: 78, rev: '₹11.2L' },
                  { month: 'Aug', val: 88, rev: '₹12.6L' },
                  { month: 'Sep', val: 92, rev: '₹13.4L' },
                  { month: 'Oct', val: 96, rev: '₹14.1L' },
                  { month: 'Nov', val: 100, rev: '₹14.8L' },
                  { month: 'Dec (Proj)', val: 105, rev: '₹15.5L' },
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-[9px] font-mono text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                      {bar.rev}
                    </span>
                    <div
                      className="w-full bg-stone-700 group-hover:bg-white rounded-t transition-all duration-300"
                      style={{ height: `${bar.val}%` }}
                    />
                    <span className="text-[10px] font-mono text-stone-400 mt-2">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS CATALOG ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Search & Add Product Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter products by title or category..."
                  className="w-full pl-9 pr-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-xs text-white placeholder:text-stone-500 outline-none focus:border-white"
                />
              </div>

              <button
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Add Product Modal Form */}
            {isAddProductOpen && (
              <form
                onSubmit={handleCreateProduct}
                className="bg-stone-800/90 p-6 rounded-xl border border-stone-700 space-y-4 text-xs animate-fade-in"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  PUBLISH NEW MENSWEAR SILHOUETTE
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="e.g. Cobalt Silk Cuban Shirt"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Category *
                    </label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white uppercase"
                    >
                      <option value="shirts">Shirts</option>
                      <option value="t-shirts">T-Shirts</option>
                      <option value="bottomwear">Bottomwear</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Color Variant Name
                    </label>
                    <input
                      type="text"
                      value={newProdColor}
                      onChange={(e) => setNewProdColor(e.target.value)}
                      placeholder="e.g. Midnight Onyx"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      MRP Original Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProdOriginalPrice}
                      onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-stone-400 font-bold uppercase tracking-wider block mb-1">
                      Image Path or URL (/images/products/... or CDN)
                    </label>
                    <input
                      type="text"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="/images/products/darja-sh-01-black-1.jpg"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-white text-black font-bold uppercase tracking-wider rounded text-xs hover:bg-stone-200"
                  >
                    Save & Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-5 py-2.5 border border-stone-700 text-stone-400 rounded text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-stone-800/80 rounded-xl border border-stone-700/60 overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/80 border-b border-stone-700 text-stone-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Product Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Selling Price</th>
                      <th className="p-4">Variants / Colors</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60 text-stone-300">
                    {filteredProducts.map((p) => {
                      const totalStock = p.variants.reduce(
                        (sum, v) => sum + Object.values(v.stockBySize).reduce((a, b) => a + b, 0),
                        0
                      );

                      return (
                        <tr key={p.id} className="hover:bg-stone-700/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-16 bg-stone-900 rounded overflow-hidden shrink-0 aspect-[3/4]">
                                <Image
                                  src={p.variants[0]?.images[0] || '/images/fallback.jpg'}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-bold text-white block">{p.name}</span>
                                <span className="text-[10px] text-stone-500 font-mono">
                                  SKU: {p.id.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="uppercase font-semibold text-stone-400">
                              {p.category}
                            </span>
                            <span className="block text-[10px] text-stone-500">
                              {p.subcategory.replace('-', ' ')}
                            </span>
                          </td>

                          <td className="p-4 font-mono font-bold text-white">
                            {formatPrice(p.price)}
                            <span className="block text-[10px] text-stone-500 line-through">
                              {formatPrice(p.originalPrice)}
                            </span>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              {p.variants.map((v) => (
                                <span
                                  key={v.colorName}
                                  className="w-3.5 h-3.5 rounded-full border border-stone-600 block"
                                  style={{ backgroundColor: v.colorHex }}
                                  title={v.colorName}
                                />
                              ))}
                              <span className="text-[10px] text-stone-400 ml-1">
                                ({totalStock} units)
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded uppercase">
                              Active Live
                            </span>
                          </td>

                          <td className="p-4 text-right">
                            <Link
                              href={`/product/${p.slug}`}
                              target="_blank"
                              className="text-stone-400 hover:text-white underline text-[11px] uppercase mr-3"
                            >
                              View
                            </Link>
                            <button
                              onClick={() =>
                                setProductList(productList.filter((item) => item.id !== p.id))
                              }
                              className="text-stone-500 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 inline" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-white">
                  REAL-TIME ORDER FULFILLMENT ({orders.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Update customer order status in real time to reflect on customer tracking pages.
                </p>
              </div>
            </div>

            <div className="bg-stone-800/80 rounded-xl border border-stone-700/60 overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/80 border-b border-stone-700 text-stone-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Items Ordered</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60 text-stone-300">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-700/30 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-bold text-white block">{order.id}</span>
                          <span className="text-[10px] text-stone-500">{formatDate(order.date)}</span>
                        </td>

                        <td className="p-4">
                          <span className="font-bold text-white block">
                            {order.shippingAddress.fullName}
                          </span>
                          <span className="text-[10px] text-stone-400 block font-mono">
                            {order.shippingAddress.phone}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            {order.shippingAddress.city}, {order.shippingAddress.pincode}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((it) => (
                              <div key={it.id} className="text-[11px] text-stone-300">
                                <strong>{it.quantity}x</strong> {it.name} ({it.size})
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-4 font-mono font-bold text-white">
                          {formatPrice(order.total)}
                        </td>

                        <td className="p-4">
                          <span className="uppercase font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-700">
                            {order.paymentMethod} • {order.paymentStatus}
                          </span>
                        </td>

                        <td className="p-4">
                          {/* Live Status Switcher */}
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value as Order['orderStatus'])
                            }
                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase border cursor-pointer ${
                              order.orderStatus === 'Delivered'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : 'bg-stone-900 text-amber-300 border-amber-800'
                            }`}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: INVENTORY & SIZES ================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              INVENTORY MANAGEMENT & STOCK BY SIZES
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((product) => (
                <div
                  key={product.id}
                  className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/60 space-y-4"
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative w-12 h-16 bg-stone-900 rounded overflow-hidden aspect-[3/4]">
                      <Image
                        src={product.variants[0]?.images[0] || '/images/fallback.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{product.name}</h4>
                      <span className="text-[10px] text-stone-400 uppercase">
                        {product.category} • {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-700">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      STOCK PER SIZE (MAIN VARIANT)
                    </span>
                    <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                      {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => {
                        const stock = product.variants[0]?.stockBySize[sz] || 0;
                        return (
                          <div
                            key={sz}
                            className={`p-1.5 rounded border ${
                              stock <= 3
                                ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                                : 'bg-stone-900 border-stone-700 text-stone-200'
                            }`}
                          >
                            <span className="font-bold block text-[10px]">{sz}</span>
                            <span className="font-mono text-xs">{stock}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: COUPONS & DISCOUNTS ================= */}
        {activeTab === 'discounts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                PROMOTIONS & COUPONS MANAGER
              </h3>
            </div>

            {/* Create Coupon Bar */}
            <form
              onSubmit={handleAddCoupon}
              className="bg-stone-800/80 p-4 rounded-xl border border-stone-700 flex flex-wrap gap-3 items-center text-xs"
            >
              <input
                type="text"
                placeholder="Coupon Code (e.g. FLASH30)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white font-mono uppercase"
              />
              <input
                type="text"
                placeholder="Discount Desc (e.g. 30% OFF)"
                value={newCouponDiscount}
                onChange={(e) => setNewCouponDiscount(e.target.value)}
                className="px-3 py-2 bg-stone-900 border border-stone-700 rounded text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black font-bold uppercase rounded hover:bg-stone-200"
              >
                Create Coupon
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="bg-stone-800/80 p-5 rounded-xl border border-stone-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-sm text-white px-2 py-1 rounded bg-stone-900 border border-stone-700">
                      {c.code}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Active</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-300">{c.discount}</p>
                  <div className="text-[11px] text-stone-500 font-mono">
                    Total redemptions: {c.uses} times
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: CUSTOMER MANAGEMENT ================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              REGISTERED CUSTOMERS & SPEND OVERVIEW
            </h3>

            <div className="bg-stone-800/80 rounded-xl border border-stone-700/60 overflow-hidden shadow-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-900/80 border-b border-stone-700 text-stone-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Orders Placed</th>
                    <th className="p-4 font-mono">Lifetime Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-700/60 text-stone-300">
                  {[
                    { name: 'Gaurav Sharma', email: 'gaurav.sharma@example.com', phone: '+91 98765 43210', city: 'Mumbai', orders: 4, ltv: 9890 },
                    { name: 'Aarav Singhania', email: 'aarav.s@gmail.com', phone: '+91 98201 19283', city: 'New Delhi', orders: 3, ltv: 7240 },
                    { name: 'Rohan Mehra', email: 'rohan.m@outlook.com', phone: '+91 99881 23419', city: 'Bengaluru', orders: 5, ltv: 12450 },
                    { name: 'Kabir Vohra', email: 'kabir.v@gmail.com', phone: '+91 97112 00192', city: 'Pune', orders: 2, ltv: 4598 },
                    { name: 'Aditya Chawla', email: 'aditya.c@yahoo.com', phone: '+91 96540 88219', city: 'Chandigarh', orders: 2, ltv: 3998 },
                  ].map((cust, i) => (
                    <tr key={i} className="hover:bg-stone-700/30 transition-colors">
                      <td className="p-4 font-bold text-white">{cust.name}</td>
                      <td className="p-4 font-mono text-stone-400">{cust.email} • {cust.phone}</td>
                      <td className="p-4">{cust.city}</td>
                      <td className="p-4 font-mono">{cust.orders} orders</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">{formatPrice(cust.ltv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
