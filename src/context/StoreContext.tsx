'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Language, Category } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/data';
import ptTranslations from '@/translations/pt.json';
import enTranslations from '@/translations/en.json';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  products: Product[];
  selectedCategory: Category | 'all';
  setSelectedCategory: (cat: Category | 'all') => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (sub: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('bissau_store_lang') as Language;
      if (savedLang === 'pt' || savedLang === 'en') {
        setLanguage(savedLang);
      }

      const savedProducts = localStorage.getItem('bissau_store_products');
      if (savedProducts) {
        const parsed: Product[] = JSON.parse(savedProducts);
        const existingIds = new Set(INITIAL_PRODUCTS.map((product) => product.id));
        const customProducts = parsed.filter((product) => !existingIds.has(product.id));
        setProducts([...INITIAL_PRODUCTS, ...customProducts]);
      }
    } catch (error) {
      console.error('Error loading saved catalog state', error);
      setProducts(INITIAL_PRODUCTS);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('bissau_store_lang', language);
    } catch (error) {
      console.error('Error saving language preference', error);
    }
  }, [language, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('bissau_store_products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving catalog products', error);
    }
  }, [products, isHydrated]);

  const t = language === 'pt' ? ptTranslations : enTranslations;

  const addProduct = (product: Product) => {
    setProducts((currentProducts) => [product, ...currentProducts]);
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        products,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedBrand,
        setSelectedBrand,
        searchQuery,
        setSearchQuery,
        addProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
