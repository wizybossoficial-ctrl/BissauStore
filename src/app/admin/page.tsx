'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { filterProductsByVendor, useVendorEmail } from '@/lib/vendor';
import VendorAdminGate from '@/components/VendorAdminGate';
import { Package, PlusCircle, Store } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <VendorAdminGate>
      <AdminDashboardContent />
    </VendorAdminGate>
  );
}

function AdminDashboardContent() {
  const { products: allProducts } = useStore();
  const vendorEmail = useVendorEmail() ?? '';
  const products = filterProductsByVendor(allProducts, vendorEmail);
  const inStockCount = products.filter((product) => product.inStock && product.stockCount > 0).length;
  const categoryCount = new Set(products.map((product) => product.category)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Painel do Vendedor</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">Catálogo</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Gira os produtos apresentados na sua montra.</p>
        </div>
        <Link
          href="/admin/products"
          className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Gerir produtos</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Produtos na montra</span>
            <Package className="w-4 h-4 text-brand-orange" />
          </div>
          <p className="text-2xl font-black text-gray-900">{products.length}</p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Produtos disponíveis</span>
            <Store className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-gray-900">{inStockCount}</p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Categorias representadas</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-gray-900">{categoryCount}</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-base text-gray-900">A sua montra pública</h2>
          <p className="text-xs text-gray-500 mt-1">Os visitantes podem explorar os produtos e contactar vendedores pelo WhatsApp.</p>
        </div>
        <Link href="/products" className="text-sm font-semibold text-brand-orange hover:underline">
          Ver catálogo
        </Link>
      </div>
    </div>
  );
}
