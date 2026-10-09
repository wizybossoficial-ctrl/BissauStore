import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BissauStore | O Maior Mercado Online da Guiné-Bissau',
  description: 'Compre produtos em Bissau com facilidade. Pague com Orange Money, MTN MoMo ou na entrega. Entregas rápidas em todos os bairros.',
  keywords: 'Bissau, Guiné-Bissau, Orange Money Bissau, MTN MoMo, compras online Bissau, e-commerce Guiné-Bissau',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-brand-orange selection:text-white">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
