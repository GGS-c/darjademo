import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { OrderProvider } from '@/context/OrderContext';
import { AnnouncementBar } from '@/components/header/AnnouncementBar';
import { Header } from '@/components/header/Header';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Toast } from '@/components/ui/Toast';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'DARJA MENS WEAR | Define Your Style. Own Your Presence.',
  description:
    'Premium modern menswear brand. Heavyweight oversized tees, luxury linen and formal shirts, tactical utility cargos, and tailored trousers.',
  keywords: 'menswear, fashion, luxury shirts, oversized t-shirts, snitch, cargo pants, linen shirts, men fashion india',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <OrderProvider>
                <AnnouncementBar />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <Toast />
              </OrderProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
