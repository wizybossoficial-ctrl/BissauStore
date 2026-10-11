'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { formatXOF, formatDate } from '@/lib/formatters';
import { OrderStatus } from '@/lib/types';
import VendorAdminGate from '@/components/VendorAdminGate';
import { 
  TrendingUp, 
  ShoppingBag, 
  Smartphone, 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  PlusCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { orders, products, updateOrderStatus } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'successful' || o.orderStatus === 'completed')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const orangeMoneyCount = orders.filter((o) => o.paymentMethod === 'orange_money').length;
  const inDeliveryCount = orders.filter((o) => o.orderStatus === 'in_delivery').length;

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.orderStatus === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <VendorAdminGate>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Painel do Gestor (Bissau)</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              Live GW
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Gestão de vendas, encomendas em Bissau e inventário de produtos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition"
          >
            <Package className="w-4 h-4" />
            <span>Gerir Inventário ({products.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Faturação Total</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{formatXOF(totalRevenue)}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">● Vendas processadas em XOF</p>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Total Encomendas</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{orders.length}</p>
          <p className="text-[11px] text-gray-500">Registadas no sistema</p>
        </div>

        {/* Orange Money & MoMo Share */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Mobile Money</span>
            <div className="p-2 rounded-xl bg-orange-50 text-brand-orange">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{orangeMoneyCount} pedidos</p>
          <p className="text-[11px] text-brand-orange font-semibold">Orange Money / MoMo</p>
        </div>

        {/* Deliveries in Progress */}
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Em Entrega em Bissau</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-gray-900">{inDeliveryCount}</p>
          <p className="text-[11px] text-amber-600 font-semibold">Estafetas em rota</p>
        </div>
      </div>

      {/* Orders Management Table */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-gray-900">Encomendas Recentes</h3>
            <p className="text-xs text-gray-500">Altere o estado da entrega e acompanhe os pagamentos</p>
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Filtrar:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-brand-orange font-medium"
            >
              <option value="all">Todos os Estados</option>
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="processing">Em Preparação</option>
              <option value="in_delivery">A Caminho</option>
              <option value="completed">Entregue</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-2">ID & Data</th>
                <th className="pb-3 px-2">Cliente & Bairro</th>
                <th className="pb-3 px-2">Itens</th>
                <th className="pb-3 px-2">Valor Total</th>
                <th className="pb-3 px-2">Pagamento</th>
                <th className="pb-3 px-2">Estado da Entrega</th>
                <th className="pb-3 px-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition">
                  {/* ID & Date */}
                  <td className="py-4 px-2 font-mono font-bold text-gray-900">
                    <div>#{order.id}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{formatDate(order.createdAt)}</div>
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-2">
                    <div className="font-bold text-gray-900">{order.deliveryAddress.fullName}</div>
                    <div className="text-gray-500 font-mono">{order.deliveryAddress.phone}</div>
                    <div className="text-[11px] text-brand-green font-medium">📍 {order.deliveryAddress.bairro}</div>
                  </td>

                  {/* Items */}
                  <td className="py-4 px-2 text-gray-700">
                    {order.items.map((i) => (
                      <div key={i.product.id} className="line-clamp-1">
                        {i.quantity}x {i.product.name}
                      </div>
                    ))}
                  </td>

                  {/* Total */}
                  <td className="py-4 px-2 font-black text-gray-900 whitespace-nowrap">
                    {formatXOF(order.totalAmount)}
                  </td>

                  {/* Payment */}
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.paymentMethod === 'orange_money'
                          ? 'bg-orange-100 text-orange-800'
                          : order.paymentMethod === 'momo'
                          ? 'bg-amber-100 text-amber-800'
                          : order.paymentMethod === 'card'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.paymentMethod === 'orange_money' && '🟠 Orange'}
                      {order.paymentMethod === 'momo' && '🟡 MoMo'}
                      {order.paymentMethod === 'card' && '💳 Cartão'}
                      {order.paymentMethod === 'cod' && '💵 Entrega'}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-2">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-bold rounded-xl px-2.5 py-1 border focus:outline-none ${
                        order.orderStatus === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : order.orderStatus === 'in_delivery'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : order.orderStatus === 'processing'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      <option value="pending">⏳ Pendente</option>
                      <option value="paid">✅ Pago</option>
                      <option value="processing">📦 Em Preparação</option>
                      <option value="in_delivery">🚚 A Caminho</option>
                      <option value="completed">🎉 Entregue</option>
                    </select>
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-2 text-right">
                    <Link
                      href={`/order?id=${order.id}`}
                      className="p-1.5 inline-block text-gray-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition"
                      title="Ver página de rastreio"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </VendorAdminGate>
  );
}
