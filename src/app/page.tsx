'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import { formatXOF } from '@/lib/formatters';
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Smartphone, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const { products, t, setSelectedCategory } = useStore();

  const flashDeals = products.filter((p) => p.isFlashDeal);
  const featured = products.slice(0, 8);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-emerald-950 text-white py-12 md:py-20">
        {/* Background glow & accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hero.tag}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Compre em <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Bissau</span> com rapidez e confiança.
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>

              {/* Payment badges pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 pt-1">
                <span className="font-semibold text-white">Pagamentos suportados:</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-orange text-white font-bold">Orange Money</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-400 text-gray-900 font-bold">MTN MoMo</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white">Cartões UEMOA</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-medium">Na Entrega</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-3.5 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-900/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.hero.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/245955000000?text=Olá%20BissauStore,%20gostaria%20de%20fazer%20um%20pedido%20direto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.hero.whatsappCta}</span>
                </a>
              </div>
            </div>

            {/* Hero Feature Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">🔥 Destaque em Bissau</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">Pronta Entrega</span>
                </div>

                <div className="relative h-56 rounded-2xl overflow-hidden bg-white/5">
                  <Image
                    src={products[1]?.image || 'https://images.unsplash.com/photo-1618941716939-553df3c6c278?auto=format&fit=crop&w=800&q=80'}
                    alt="Ventilador Solar Bissau"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-bold text-sm line-clamp-1">{products[1]?.name}</p>
                    <p className="text-xs text-amber-300 font-extrabold">{formatXOF(products[1]?.price || 28000)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>Entrega no mesmo dia</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-brand-orange" />
                    <span>Pague com #144#</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-gray-900">{t.trust.orangeMoney}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{t.trust.orangeMoneyDesc}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-gray-900">{t.trust.delivery}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{t.trust.deliveryDesc}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-gray-900">{t.trust.quality}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{t.trust.qualityDesc}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-gray-900">{t.trust.support}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{t.trust.supportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      {flashDeals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-orange-200/60 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-brand-red text-white">
                  <Zap className="w-5 h-5 fill-current animate-pulse" />
                </div>
                <div>
                  <h2 className="font-black text-xl text-gray-900">{t.products.flashTitle}</h2>
                  <p className="text-xs text-gray-600">Preços promocionais por tempo limitado em Bissau</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-red text-white text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Termina em breve</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Shortcuts */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-xl text-gray-900">{t.categories.all}</h2>
          <Link href="/products" className="text-xs font-semibold text-brand-orange hover:underline flex items-center gap-1">
            <span>Ver catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { id: 'eletronicos', label: '📱 Telemóveis & Tech', bg: 'hover:bg-blue-50' },
            { id: 'alimentacao', label: '🍚 Alimentos Básicos', bg: 'hover:bg-amber-50' },
            { id: 'moda', label: '👗 Moda & Panos', bg: 'hover:bg-rose-50' },
            { id: 'eletrodomesticos', label: '☀️ Solar & Casa', bg: 'hover:bg-emerald-50' },
            { id: 'beleza', label: '✨ Manteiga & Beleza', bg: 'hover:bg-purple-50' },
          ].map((cat) => (
            <Link
              key={cat.id}
              href="/products"
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-center font-bold text-xs sm:text-sm text-gray-800 hover:border-brand-orange/40 hover:shadow-md transition ${cat.bg}`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-black text-2xl text-gray-900">{t.products.featuredTitle}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Os artigos mais procurados na Guiné-Bissau</p>
          </div>
          <Link
            href="/products"
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition flex items-center gap-1"
          >
            <span>Ver Tudo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WhatsApp Help Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-900 text-white p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-extrabold text-2xl">Prefere fazer o seu pedido diretamente pelo WhatsApp?</h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Fale com um dos nossos agentes em Bissau. Aceitamos pagamentos diretos por Orange Money ou na entrega da encomenda.
            </p>
          </div>
          <a
            href="https://wa.me/245955000000?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20pelo%20WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-2xl bg-white hover:bg-gray-100 text-emerald-900 font-extrabold text-sm shadow-lg flex items-center gap-2 transition flex-shrink-0"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>Conversar no WhatsApp (+245)</span>
          </a>
        </div>
      </section>
    </div>
  );
}
