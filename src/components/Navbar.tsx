'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { getCurrentLocalAccount } from '@/lib/localAuth';
import { ShoppingBag, Search, Menu, X, Globe, PhoneCall, LayoutDashboard, UserRound } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage, t, cartCount, searchQuery, setSearchQuery, setSelectedCategory } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsVendor(getCurrentLocalAccount()?.role === 'vendor');
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== '/products') {
      router.push('/products');
    }
  };

  const handleCategoryClick = (cat: any) => {
    setSelectedCategory(cat);
    setMobileMenuOpen(false);
    if (pathname !== '/products') {
      router.push('/products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Banner (Guinea-Bissau local trust bar) */}
      <div className="bg-brand-dark text-gray-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Bissau Express
            </span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:inline">Entregas rápidas em todos os bairros de Bissau</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://wa.me/245955000000?text=Olá%20BissauStore,%20preciso%20de%20ajuda%20com%20uma%20compra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-400 transition"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: +245 955 00 00</span>
            </a>
            <div className="flex items-center gap-1 border-l border-gray-700 pl-3">
              <Globe className="w-3 h-3 text-brand-orange" />
              <button
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                className="font-medium hover:text-white uppercase transition"
              >
                {language === 'pt' ? 'PT' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-orange via-brand-yellow to-brand-green flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition">
            B
          </div>
          <div className="hidden min-[380px]:block">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-gray-900">
                Bissau<span className="text-brand-orange">Store</span>
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-brand-green/10 text-brand-green font-bold border border-brand-green/20">
                .GW
              </span>
            </div>
          </div>
        </Link>

        {/* SEARCH BAR (Visible on Mobile right before the Cart Icon & on Desktop) */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative mx-1 sm:mx-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-20 py-1.5 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
          />
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute left-2.5 sm:left-3.5 top-2.5 sm:top-3.5" />
          <button
            type="submit"
            className="hidden sm:block absolute right-1.5 top-1.5 px-4 py-1.5 bg-brand-orange hover:bg-orange-600 text-white rounded-full text-xs font-semibold shadow-sm transition"
          >
            Buscar
          </button>
        </form>

        {/* Action Buttons: Cart & Menu */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-2 py-2 text-xs font-semibold text-gray-700 hover:text-brand-orange transition"
            >
              {t.nav.signIn}
            </Link>
            <Link
              href="/sign-up"
              className="px-3 py-2 text-xs font-bold text-white bg-brand-orange hover:bg-orange-600 rounded-lg shadow-sm transition"
            >
              {t.nav.createAccount}
            </Link>
          </div>

          {isVendor && (
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <LayoutDashboard className="w-4 h-4 text-gray-600" />
              <span>{t.nav.admin}</span>
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 p-2 sm:px-3.5 sm:py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-medium text-xs sm:text-sm transition"
          >
            <ShoppingBag className="w-5 h-5 text-brand-green flex-shrink-0" />
            <span className="hidden sm:inline font-semibold">{t.nav.cart}</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-brand-red text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category Bar for Desktop */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-100 text-xs font-medium text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto py-2.5">
          <button onClick={() => handleCategoryClick('all')} className="hover:text-brand-orange whitespace-nowrap transition">
            {t.categories.all}
          </button>
          <button onClick={() => handleCategoryClick('eletronicos')} className="hover:text-brand-orange whitespace-nowrap transition">
            📱 {t.categories.eletronicos}
          </button>
          <button onClick={() => handleCategoryClick('alimentacao')} className="hover:text-brand-orange whitespace-nowrap transition">
            🍚 {t.categories.alimentacao}
          </button>
          <button onClick={() => handleCategoryClick('moda')} className="hover:text-brand-orange whitespace-nowrap transition">
            👗 {t.categories.moda}
          </button>
          <button onClick={() => handleCategoryClick('eletrodomesticos')} className="hover:text-brand-orange whitespace-nowrap transition">
            ☀️ {t.categories.eletrodomesticos}
          </button>
          <button onClick={() => handleCategoryClick('beleza')} className="hover:text-brand-orange whitespace-nowrap transition">
            ✨ {t.categories.beleza}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4 shadow-lg">
          <div className="space-y-1 pt-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">Categorias</p>
            <button onClick={() => handleCategoryClick('all')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              {t.categories.all}
            </button>
            <button onClick={() => handleCategoryClick('eletronicos')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              📱 {t.categories.eletronicos}
            </button>
            <button onClick={() => handleCategoryClick('alimentacao')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              🍚 {t.categories.alimentacao}
            </button>
            <button onClick={() => handleCategoryClick('moda')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              👗 {t.categories.moda}
            </button>
            <button onClick={() => handleCategoryClick('eletrodomesticos')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
              ☀️ {t.categories.eletrodomesticos}
            </button>
          </div>

          <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
            <Link
              href="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <UserRound className="w-4 h-4 text-gray-500" />
              {t.nav.signIn}
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-brand-orange hover:bg-orange-50 rounded-lg"
            >
              {t.nav.createAccount}
            </Link>
            {isVendor && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <LayoutDashboard className="w-4 h-4 text-gray-500" />
                {t.nav.admin}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}