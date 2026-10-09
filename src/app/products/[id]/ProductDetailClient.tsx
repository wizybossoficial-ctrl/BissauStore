'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { formatXOF } from '@/lib/formatters';
import { 
  ShoppingBag, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Star, 
  ArrowLeft, 
  Check, 
  Smartphone,
  MapPin
} from 'lucide-react';

export default function ProductDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { products, language, t, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === params.id);

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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `Olá BissauStore! Quero comprar o artigo: ${title} (${quantity} unidade(s) - Total: ${formatXOF(product.price * quantity)}). Quero entrega em Bissau.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-orange transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

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

          {/* Quantity & Order Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-700">Quantidade:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-900 hover:bg-black text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado ao Carrinho!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-brand-orange hover:bg-orange-600 text-white shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Comprar Agora</span>
              </button>
            </div>

            {/* Direct WhatsApp Order */}
            <a
              href={`https://wa.me/245955000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl font-bold text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Pedir diretamente no WhatsApp (+245)</span>
            </a>
          </div>

          {/* Local Bissau delivery & payment guarantees */}
          <div className="border-t border-gray-100 pt-6 space-y-3">
            <div className="flex items-start gap-3 text-xs text-gray-600">
              <Truck className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Entregas em Bissau:</strong> Entregamos no mesmo dia ou em até 24h em Bandim, Santa Luzia, Bissau Velho, Cupilon, Bairro Militar, etc.
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-gray-600">
              <Smartphone className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Pagamento Flexível:</strong> Pague online com Orange Money (#144#), MTN MoMo, ou em dinheiro ao estafeta.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
