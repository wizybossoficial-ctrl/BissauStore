import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BissauStore | Catálogo de Produtos da Guiné-Bissau',
  description: 'Explore produtos e lojas da Guiné-Bissau e contacte vendedores diretamente pelo WhatsApp.',
  keywords: 'Bissau, Guiné-Bissau, catálogo de produtos, lojas locais, vendedores, WhatsApp',
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
