'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/data';
import { useStore } from '@/context/StoreContext';
import { formatXOF } from '@/lib/formatters';
import { Star, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useStore();

  const title = language === 'pt' ? product.name : product.nameEn;
  const description = language === 'pt' ? product.description : product.descriptionEn;
  const hasStaticDetailPage = INITIAL_PRODUCTS.some((item) => item.id === product.id);
  const detailHref = hasStaticDetailPage
    ? `/products/${product.id}`
    : `/products?product=${encodeURIComponent(product.id)}`;

  const whatsappMessage = encodeURIComponent(
    `Olá BissauStore! Tenho interesse em ${title}, anunciado por ${formatXOF(product.price)}. Está disponível?`
  );

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Flash deal or discount tag */}
      {product.isFlashDeal && (
        <div className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
          <span>⚡ Oferta Bissau</span>
        </div>
      )}

      {/* Product Image */}
      <Link href={detailHref} className="relative h-48 sm:h-52 w-full bg-gray-50 overflow-hidden block">
        <Image
          src={product.image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-brand-orange">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={detailHref}>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-brand-orange transition">
              {title}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {/* Pricing & Stock */}
        <div className="pt-2 border-t border-gray-50">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-gray-900">
              {formatXOF(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatXOF(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">
            ● {t.products.inStock} ({product.stockCount} un.)
          </span>
        </div>

        <div className="pt-1">
          <a
            href={`https://wa.me/245955000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Inquirir via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
