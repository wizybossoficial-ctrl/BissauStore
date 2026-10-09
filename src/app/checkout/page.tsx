'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { BISSAU_BAIRROS } from '@/lib/data';
import { PaymentMethod, Order } from '@/lib/types';
import { formatXOF, generateOrderId } from '@/lib/formatters';
import PaymentModal from '@/components/PaymentModal';
import { 
  Truck, 
  Smartphone, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, addOrder, clearCart, t, language } = useStore();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+245 955 ');
  const [bairro, setBairro] = useState(BISSAU_BAIRROS[0]);
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('orange_money');

  // Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deliveryFee = 1500; // 1,500 FCFA
  const finalTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">O seu carrinho está vazio</h2>
        <p className="text-xs text-gray-500">Adicione produtos antes de finalizar a sua compra.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold">
          <ArrowLeft className="w-4 h-4" /> Ir às Compras
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Por favor, introduza o seu nome completo.');
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Por favor, introduza um número de telefone válido da Guiné-Bissau (+245).');
      return;
    }
    if (!landmark.trim()) {
      setErrorMessage('Por favor, indique um ponto de referência para a entrega no seu bairro.');
      return;
    }

    if (paymentMethod === 'orange_money' || paymentMethod === 'momo') {
      // Open interactive USSD / Push prompt modal
      setIsPaymentModalOpen(true);
    } else {
      // For COD or Card
      completeOrder(paymentMethod === 'cod' ? undefined : 'CARD-UEMOA-OK');
    }
  };

  const completeOrder = (paymentRef?: string) => {
    const newOrder: Order = {
      id: generateOrderId(),
      items: [...cart],
      totalAmount: finalTotal,
      deliveryFee,
      deliveryAddress: {
        fullName,
        phone,
        bairro,
        landmark,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'successful',
      paymentReference: paymentRef,
      orderStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);
    clearCart();
    setIsPaymentModalOpen(false);
    router.push(`/order/${newOrder.id}`);
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
                  <p className="text-xs text-gray-500">Entregamos na sua casa, loja ou escritório</p>
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

            {/* Payment Method Selector Box */}
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-orange-50 text-brand-orange">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-gray-900">{t.checkout.paymentMethod}</h2>
                  <p className="text-xs text-gray-500">Escolha como prefere pagar na Guiné-Bissau</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* 1. Orange Money */}
                <label
                  onClick={() => setPaymentMethod('orange_money')}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                    paymentMethod === 'orange_money'
                      ? 'border-brand-orange bg-orange-50/50 ring-2 ring-brand-orange/20'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'orange_money'}
                    onChange={() => setPaymentMethod('orange_money')}
                    className="mt-1 text-brand-orange focus:ring-brand-orange"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-brand-orange"></span>
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        {t.checkout.orangeMoney}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-brand-orange text-white font-bold ml-auto">
                        Popular
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t.checkout.orangeMoneyHint} (#144#)</p>
                  </div>
                </label>

                {/* 2. MTN MoMo */}
                <label
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                    paymentMethod === 'momo'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="mt-1 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span className="font-bold text-xs sm:text-sm text-gray-900">{t.checkout.momo}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t.checkout.momoHint}</p>
                  </div>
                </label>

                {/* 3. Bank Cards / GIM-UEMOA */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-800/20'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 text-slate-900 focus:ring-slate-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-700" />
                      <span className="font-bold text-xs sm:text-sm text-gray-900">{t.checkout.card}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Visa, Mastercard e cartões regionais GIM-UEMOA</p>
                  </div>
                </label>

                {/* 4. Cash on Delivery (COD) */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-emerald-600 focus:ring-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-xs sm:text-sm text-gray-900">{t.checkout.cod}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Pague em dinheiro ou envie MoMo ao estafeta na entrega</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-orange hover:bg-orange-600 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-900/20 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{t.checkout.confirmOrder} ({formatXOF(finalTotal)})</span>
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

            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Garantia de entrega rápida e segura em Bissau</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mobile Money Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={(ref) => completeOrder(ref)}
        paymentMethod={paymentMethod}
        amount={finalTotal}
        phoneNumber={phone}
      />
    </div>
  );
}
