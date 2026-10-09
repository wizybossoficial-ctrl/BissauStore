'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Language, Category, OrderStatus } from '@/lib/types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '@/lib/data';
import ptTranslations from '@/translations/pt.json';
import enTranslations from '@/translations/en.json';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  selectedCategory: Category | 'all';
  setSelectedCategory: (cat: Category | 'all') => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (sub: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount & safely merge with new INITIAL_PRODUCTS
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('bissau_store_lang') as Language;
      if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
        setLanguage(savedLang);
      }
      const savedCart = localStorage.getItem('bissau_store_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedOrders = localStorage.getItem('bissau_store_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      // Safe product hydration: merge INITIAL_PRODUCTS with any user-added products
      const savedProducts = localStorage.getItem('bissau_store_products');
      if (savedProducts) {
        const parsed: Product[] = JSON.parse(savedProducts);
        const existingIds = new Set(INITIAL_PRODUCTS.map((p) => p.id));
        const customAdded = parsed.filter((p) => !existingIds.has(p.id));
        setProducts([...INITIAL_PRODUCTS, ...customAdded]);
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
    } catch (e) {
      console.error('Error loading saved state', e);
      setProducts(INITIAL_PRODUCTS);
    }
    setIsHydrated(true);
  }, []);

  // Save changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('bissau_store_lang', language);
    } catch (e) { }
  }, [language, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('bissau_store_cart', JSON.stringify(cart));
    } catch (e) { }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('bissau_store_orders', JSON.stringify(orders));
    } catch (e) { }
  }, [orders, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('bissau_store_products', JSON.stringify(products));
    } catch (e) { }
  }, [products, isHydrated]);

  const t = language === 'pt' ? ptTranslations : enTranslations;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        products,
        orders,
        cart,
        cartCount,
        cartTotal,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        selectedBrand,
        setSelectedBrand,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addOrder,
        updateOrderStatus,
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