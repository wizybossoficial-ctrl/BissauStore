'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useStore } from '@/context/StoreContext';
import { formatXOF } from '@/lib/formatters';
import { ShoppingBag, Star, MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t, addToCart } = useStore();
  const [added, setAdded] = useState(false);

  const title = language === 'pt' ? product.name : product.nameEn;
  const description = language === 'pt' ? product.description : product.descriptionEn;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá BissauStore! Quero encomendar este produto: ${title} (${formatXOF(product.price)}). Como posso receber no meu bairro em Bissau?`
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
      <Link href={`/products/${product.id}`} className="relative h-48 sm:h-52 w-full bg-gray-50 overflow-hidden block">
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
          <Link href={`/products/${product.id}`}>
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

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-orange hover:bg-orange-600 text-white shadow-sm'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Carrinho</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Order */}
          <a
            href={`https://wa.me/245955000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="py-2 px-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center gap-1 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px]">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
