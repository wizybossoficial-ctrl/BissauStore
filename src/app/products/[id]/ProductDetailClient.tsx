'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { formatXOF } from '@/lib/formatters';
import { MessageCircle, Star, ArrowLeft } from 'lucide-react';

export default function ProductDetailClient({ productId }: { productId?: string }) {
  const params = useParams();
  const { products, language, t } = useStore();

  const routeProductId = params.id;
  const selectedProductId = productId ?? (typeof routeProductId === 'string' ? routeProductId : undefined);
  const product = products.find((p) => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Produto não encontrado</h2>
        <p className="text-gray-500 text-sm">O artigo que procura não existe ou foi removido.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const title = language === 'pt' ? product.name : product.nameEn;
  const description = language === 'pt' ? product.description : product.descriptionEn;

  const whatsappMessage = encodeURIComponent(
    `Olá BissauStore! Tenho interesse em ${title}, anunciado por ${formatXOF(product.price)}. Está disponível?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-orange transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Image */}
        <div className="lg:col-span-6">
          <div className="relative h-80 sm:h-96 md:h-[450px] w-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <Image
              src={product.image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {product.isFlashDeal && (
              <div className="absolute top-4 left-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                ⚡ Promoção Bissau
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-orange">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              {title}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount} {t.products.reviews})</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {t.products.inStock} ({product.stockCount} em armazém Bissau)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-baseline gap-3">
            <span className="text-3xl font-black text-gray-900">
              {formatXOF(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatXOF(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-brand-green font-bold ml-auto">
              Preço final em XOF
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Descrição do Produto</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/245955000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl font-bold text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Inquirir via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
