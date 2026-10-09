'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatXOF } from '@/lib/formatters';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck, Smartphone } from 'lucide-react';

export default function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart, language, t } = useStore();

  const deliveryFee = cart.length > 0 ? 1500 : 0; // 1,500 FCFA delivery in Bissau
  const finalTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900">{t.cart.empty}</h1>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            {t.cart.emptySubtitle}
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.cart.continueShopping}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Title & Clear Cart */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{t.cart.title}</h1>
          <p className="text-xs text-gray-500 mt-1">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} {t.cart.itemsCount} no seu pedido
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-semibold"
        >
          Esvaziar Carrinho
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => {
            const title = language === 'pt' ? product.name : product.nameEn;
            return (
              <div
                key={product.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 transition hover:border-gray-200"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <span className="text-[10px] uppercase font-bold text-brand-orange">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{title}</h3>
                  <p className="text-xs font-black text-gray-900">{formatXOF(product.price)} un.</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 text-xs font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-gray-900 bg-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 text-xs font-bold transition"
                  >
                    +
                  </button>
                </div>

                {/* Item Total & Remove */}
                <div className="flex items-center gap-4 text-right">
                  <span className="font-extrabold text-sm text-gray-900">
                    {formatXOF(product.price * quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition"
                    title="Remover produto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.cart.continueShopping}</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Checkout Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-md space-y-5">
            <h3 className="font-black text-base text-gray-900">{t.cart.summary}</h3>

            <div className="space-y-3 text-xs text-gray-600 border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-bold text-gray-900">{formatXOF(cartTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-brand-green" />
                  <span>{t.cart.deliveryFee}</span>
                </span>
                <span className="font-bold text-gray-900">{formatXOF(deliveryFee)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-sm text-gray-900">{t.cart.total}</span>
              <span className="font-black text-xl text-brand-orange">{formatXOF(finalTotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>{t.cart.checkout}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Payment security info */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pagamento 100% Seguro em Bissau</span>
              </div>
              <p>Pague com Orange Money (#144#), MTN MoMo ou diretamente ao estafeta na entrega.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
