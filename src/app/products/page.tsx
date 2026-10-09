'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import { Category } from '@/lib/types';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

// Electronics Subcategories & Brands
const ELECTRONICS_SUBCATEGORIES = [
  { id: 'all', label: 'Todos', icon: '⚡' },
  { id: 'telefones', label: 'Telemóveis', icon: '📱' },
  { id: 'computadores', label: 'Computadores', icon: '💻' },
  { id: 'tvs', label: 'TVs & Som', icon: '📺' },
  { id: 'consolas', label: 'Consolas & Gaming', icon: '🎮' },
];

const POPULAR_BRANDS: Record<string, string[]> = {
  telefones: ['Apple', 'Samsung', 'Xiaomi', 'Tecno', 'Infinix'],
  computadores: ['HP', 'Dell', 'Lenovo', 'Apple', 'Asus'],
  tvs: ['Samsung', 'LG', 'Sony', 'Hisense'],
  consolas: ['Sony PlayStation', 'Microsoft Xbox', 'Nintendo'],
};

export default function ProductsPage() {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, t } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Subcategory and Brand states
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'eletronicos', label: t.categories.eletronicos },
    { id: 'alimentacao', label: t.categories.alimentacao },
    { id: 'moda', label: t.categories.moda },
    { id: 'eletrodomesticos', label: t.categories.eletrodomesticos },
    { id: 'beleza', label: t.categories.beleza },
  ];

  // Filtering (Category + Subcategory + Brand + Search Query)
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    const matchesSubCategory =
      selectedCategory !== 'eletronicos' ||
      selectedSubCategory === 'all' ||
      (product as any).subCategory === selectedSubCategory;

    const matchesBrand =
      selectedCategory !== 'eletronicos' ||
      selectedBrand === 'all' ||
      (product as any).brand === selectedBrand;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.nameEn.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    return matchesCategory && matchesSubCategory && matchesBrand && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{t.nav.products}</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {sortedProducts.length} artigos disponíveis com entrega rápida em Bissau
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-brand-orange"
            >
              <option value="featured">Mais Populares</option>
              <option value="price-asc">Preço: Mais Baixo</option>
              <option value="price-desc">Preço: Mais Alto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedSubCategory('all');
              setSelectedBrand('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${selectedCategory === cat.id
              ? 'bg-brand-orange text-white shadow-sm'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Electronics Subcategories & Brand Filter Selector */}
      {selectedCategory === 'eletronicos' && (
        <div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Tipo de Equipamento Eletrónico:
            </h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {ELECTRONICS_SUBCATEGORIES.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubCategory(sub.id);
                    setSelectedBrand('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${selectedSubCategory === sub.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {sub.icon} {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter Pills */}
          {selectedSubCategory !== 'all' && POPULAR_BRANDS[selectedSubCategory] && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Selecionar Marca:
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedBrand('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${selectedBrand === 'all'
                    ? 'bg-brand-orange text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  Todas as Marcas
                </button>
                {POPULAR_BRANDS[selectedSubCategory].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${selectedBrand === brand
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-orange hover:text-brand-orange'
                      }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Nenhum produto encontrado</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Não encontramos produtos para esta pesquisa ou categoria. Tente limpar os filtros.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubCategory('all');
              setSelectedBrand('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold shadow-sm"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
}