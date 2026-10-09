'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { formatXOF, formatDate } from '@/lib/formatters';
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  CheckCheck, 
  MapPin, 
  Phone, 
  Smartphone, 
  MessageCircle, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export default function OrderStatusPage() {
  const params = useParams();
  const { orders, language, t } = useStore();

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Pedido não encontrado</h2>
        <p className="text-xs text-gray-500">Não foi possível encontrar este número de encomenda.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold">
          <ShoppingBag className="w-4 h-4" /> Ir para a Loja
        </Link>
      </div>
    );
  }

  const steps = [
    { id: 'pending', label: 'Pedido Registado', icon: Clock },
    { id: 'paid', label: 'Pagamento Confirmado', icon: CheckCircle2 },
    { id: 'processing', label: 'Em Preparação', icon: Package },
    { id: 'in_delivery', label: 'A Caminho (Bissau)', icon: Truck },
    { id: 'completed', label: 'Entregue', icon: CheckCheck },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'paid': return 1;
      case 'processing': return 2;
      case 'in_delivery': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const currentStep = getStepIndex(order.orderStatus);

  const whatsappMessage = encodeURIComponent(
    `Olá BissauStore! Quero acompanhar o meu pedido #${order.id} em nome de ${order.deliveryAddress.fullName} para o bairro ${order.deliveryAddress.bairro}.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-900 text-white shadow-xl text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-200" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">Obrigado pela sua compra!</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
          O seu pedido <strong className="text-white">#{order.id}</strong> foi registado com sucesso e a nossa equipa em Bissau já está a preparar a entrega.
        </p>
      </div>

      {/* Progress Timeline */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-6">
        <h3 className="font-bold text-sm text-gray-900">Estado da Encomenda em Tempo Real</h3>

        <div className="grid grid-cols-5 gap-2 relative">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={s.id} className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-brand-orange text-white ring-4 ring-orange-100 scale-110 shadow-md'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-semibold line-clamp-2 ${
                    isCompleted ? 'text-gray-900 font-bold' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Address & Customer */}
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-green" />
            <span>Endereço de Entrega (Bissau)</span>
          </h3>

          <div className="space-y-2 text-xs text-gray-600">
            <p>
              <strong className="text-gray-900">Destinatário:</strong> {order.deliveryAddress.fullName}
            </p>
            <p>
              <strong className="text-gray-900">Telefone:</strong> {order.deliveryAddress.phone}
            </p>
            <p>
              <strong className="text-gray-900">Bairro:</strong> {order.deliveryAddress.bairro}
            </p>
            <p>
              <strong className="text-gray-900">Referência:</strong> {order.deliveryAddress.landmark}
            </p>
          </div>

          <div className="pt-2 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <Smartphone className="w-4 h-4 text-brand-orange" />
              <span>
                Forma de Pagamento: <strong className="uppercase">{order.paymentMethod.replace('_', ' ')}</strong>
              </span>
            </div>
            {order.paymentReference && (
              <p className="text-[11px] font-mono text-gray-400 mt-1 pl-6">
                Ref: {order.paymentReference}
              </p>
            )}
          </div>
        </div>

        {/* Order Items & Total */}
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900">Artigos Encomendados</h3>

          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-xs gap-3">
                <span className="text-gray-700 line-clamp-1 flex-1">
                  {quantity}x {product.name}
                </span>
                <span className="font-bold text-gray-900 flex-shrink-0">
                  {formatXOF(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Taxa de Entrega</span>
              <span>{formatXOF(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-gray-900 pt-1">
              <span>Total Pago</span>
              <span className="text-brand-orange">{formatXOF(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          href="/products"
          className="px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition"
        >
          Continuar a Comprar
        </Link>

        <a
          href={`https://wa.me/245955000000?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Acompanhar via WhatsApp (+245)</span>
        </a>
      </div>
    </div>
  );
}
