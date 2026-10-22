'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { BISSAU_BAIRROS } from '@/lib/data';
import { Order } from '@/lib/types';
import { formatXOF, generateOrderId } from '@/lib/formatters';
import { getProductVendor } from '@/lib/vendor';
import { 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  ArrowLeft, 
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Clock
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, addOrder, clearCart, t, language } = useStore();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+245 955 ');
  const [bairro, setBairro] = useState(BISSAU_BAIRROS[0]);
  const [landmark, setLandmark] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 1500; // 1,500 FCFA
  const finalTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">{t.cart.empty}</h2>
        <p className="text-xs text-gray-500">{t.cart.emptySubtitle}</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold shadow-sm">
          <ArrowLeft className="w-4 h-4" /> {t.cart.continueShopping}
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage(language === 'pt' ? 'Por favor, introduza o seu nome completo.' : 'Please enter your full name.');
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage(language === 'pt' ? 'Por favor, introduza um número de telefone válido da Guiné-Bissau (+245).' : 'Please enter a valid Guinea-Bissau phone number (+245).');
      return;
    }
    if (!landmark.trim()) {
      setErrorMessage(language === 'pt' ? 'Por favor, indique um ponto de referência para a entrega no seu bairro.' : 'Please enter a landmark or location reference.');
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      totalAmount: finalTotal,
      deliveryFee,
      deliveryAddress: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        bairro,
        landmark: landmark.trim(),
      },
      paymentMethod: 'whatsapp',
      paymentStatus: 'pending',
      orderStatus: 'pending',
      createdAt: new Date().toISOString(),
      vendorEmails: Array.from(new Set(cart.map((i) => getProductVendor(i.product)))),
    };

    // Format WhatsApp prefilled message
    const itemsList = cart
      .map(({ product, quantity }) => {
        const title = language === 'pt' ? product.name : product.nameEn;
        return `• ${quantity}x ${title} - ${formatXOF(product.price * quantity)}`;
      })
      .join('\n');

    const message =
      `🛍️ *NOVO PEDIDO - BISSAUSTORE* 🇬🇼\n` +
      `*ID do Pedido:* #${orderId}\n\n` +
      `👤 *Cliente:* ${fullName.trim()}\n` +
      `📞 *Contacto:* ${phone.trim()}\n` +
      `📍 *Bairro:* ${bairro}\n` +
      `🧭 *Ponto de Referência:* ${landmark.trim()}\n\n` +
      `📦 *Artigos Encomendados:*\n${itemsList}\n\n` +
      `🚚 *Taxa de Entrega:* ${formatXOF(deliveryFee)}\n` +
      `💰 *TOTAL A PAGAR:* ${formatXOF(finalTotal)}\n\n` +
      `💬 Olá BissauStore! Acabei de registar o meu pedido no site. Podem confirmar a disponibilidade e o envio para o meu bairro?`;

    // Save to local store and clear cart
    addOrder(newOrder);
    clearCart();

    // Open WhatsApp link in new tab
    const whatsappUrl = `https://wa.me/245955000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Route to confirmation / tracking page
    router.push(`/order?id=${orderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-brand-orange transition"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao Carrinho
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Delivery Info Box */}
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-emerald-50 text-brand-green">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-gray-900">{t.checkout.deliveryInfo}</h2>
                  <p className="text-xs text-gray-500">Entregamos na sua casa, loja ou escritório em Bissau</p>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t.checkout.fullName} *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Bacari Sanhá"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange text-xs sm:text-sm"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {t.checkout.phone} * <span className="text-gray-400 font-normal">({t.checkout.phoneHint})</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+245 955 XXX XXX"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange font-mono text-xs sm:text-sm"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Bissau Bairro Dropdown */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t.checkout.bairro} *</label>
                  <select
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange text-xs sm:text-sm font-medium"
                  >
                    {BISSAU_BAIRROS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Landmark description */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t.checkout.landmark} *</label>
                  <input
                    type="text"
                    required
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder={t.checkout.landmarkPlaceholder}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Order Information Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-gray-900">{t.checkout.title}</h2>
                  <p className="text-xs text-gray-600">{t.checkout.whatsappNotice}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-emerald-100/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Pagamento na Entrega</span>
                  </div>
                  <p className="text-gray-500 text-[11px]">
                    {t.checkout.paymentHint}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-emerald-100/80 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Confirmação Imediata</span>
                  </div>
                  <p className="text-gray-500 text-[11px]">
                    A nossa equipa responde pelo WhatsApp para validar o pedido e combinar a hora de entrega.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isSubmitting ? t.checkout.processing : `${t.checkout.confirmOrder} (${formatXOF(finalTotal)})`}</span>
            </button>
          </form>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4 sticky top-24">
            <h3 className="font-bold text-sm text-gray-900">{t.cart.summary}</h3>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => {
                const title = language === 'pt' ? product.name : product.nameEn;
                return (
                  <div key={product.id} className="flex items-center justify-between text-xs gap-3">
                    <span className="text-gray-700 line-clamp-1 flex-1">
                      {quantity}x {title}
                    </span>
                    <span className="font-bold text-gray-900 flex-shrink-0">
                      {formatXOF(product.price * quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-bold text-gray-900">{formatXOF(cartTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t.cart.deliveryFee}</span>
                <span className="font-bold text-gray-900">{formatXOF(deliveryFee)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-sm text-gray-900">{t.cart.total}</span>
              <span className="font-black text-xl text-brand-orange">{formatXOF(finalTotal)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-900 text-[11px] flex items-center gap-2 border border-emerald-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Garantia de entrega no mesmo dia ou até 24h em Bissau</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
