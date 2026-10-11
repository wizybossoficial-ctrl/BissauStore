'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatXOF } from '@/lib/formatters';
import { Product, Category } from '@/lib/types';
import VendorAdminGate from '@/components/VendorAdminGate';
import { ArrowLeft, Plus, Package, Trash2, X, Check, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, addProduct } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new product
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState<Category>('eletronicos');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stockCount, setStockCount] = useState('10');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      nameEn: nameEn || name,
      description,
      descriptionEn: description,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stockCount: Number(stockCount),
      inStock: Number(stockCount) > 0,
      image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 1,
      isFlashDeal,
    };

    addProduct(newProd);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsModalOpen(false);
      // Reset
      setName('');
      setNameEn('');
      setPrice('');
      setOriginalPrice('');
      setDescription('');
      setImage('');
    }, 1200);
  };

  return (
    <VendorAdminGate>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-orange font-semibold mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Gestão de Inventário</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {products.length} artigos registados no armazém em Bissau
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Novo Produto</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-2">Artigo</th>
                <th className="pb-3 px-2">Categoria</th>
                <th className="pb-3 px-2">Preço (XOF)</th>
                <th className="pb-3 px-2">Stock em Armazém</th>
                <th className="pb-3 px-2">Destaque</th>
                <th className="pb-3 px-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition">
                  {/* Item Image & Title */}
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 line-clamp-1">{p.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">ID: {p.id}</div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-2 uppercase font-bold text-brand-orange text-[10px]">
                    {p.category}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-2 font-black text-gray-900 whitespace-nowrap">
                    {formatXOF(p.price)}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                      {p.stockCount} unidades
                    </span>
                  </td>

                  {/* Flash Deal */}
                  <td className="py-3 px-2">
                    {p.isFlashDeal ? (
                      <span className="px-2 py-0.5 rounded bg-red-100 text-brand-red font-bold text-[10px]">
                        ⚡ Oferta
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* Link */}
                  <td className="py-3 px-2 text-right">
                    <Link
                      href={`/products/${p.id}`}
                      className="text-brand-orange hover:underline font-semibold"
                    >
                      Ver na Loja
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-orange" />
                <span>Adicionar Novo Produto a Bissau</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Produto Cadastrado com Sucesso!</h4>
                <p className="text-xs text-gray-500">O artigo já está visível na loja e pronto para venda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nome do Produto (Português) *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ventoinha Solar Recarregável"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Categoria *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange font-medium"
                    >
                      <option value="eletronicos">Eletrónicos & Tech</option>
                      <option value="alimentacao">Alimentação & Básicos</option>
                      <option value="moda">Moda & Panos</option>
                      <option value="eletrodomesticos">Eletrodomésticos & Solar</option>
                      <option value="beleza">Beleza & Cuidados</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Stock (Quantidade) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={stockCount}
                      onChange={(e) => setStockCount(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Preço em FCFA (XOF) *</label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Ex: 25000"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Preço Original (Opcional)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Ex: 30000"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">URL da Imagem (Unsplash ou Direta)</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Descrição do Produto *</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detalhes, especificações e garantia..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="flashDeal"
                    checked={isFlashDeal}
                    onChange={(e) => setIsFlashDeal(e.target.checked)}
                    className="text-brand-orange focus:ring-brand-orange rounded"
                  />
                  <label htmlFor="flashDeal" className="font-semibold text-gray-700 cursor-pointer">
                    Marcar como Oferta Relâmpago ⚡
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold shadow-md transition"
                  >
                    Guardar Produto
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      </div>
    </VendorAdminGate>
  );
}
