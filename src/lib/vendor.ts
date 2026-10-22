import { DEFAULT_VENDOR_EMAIL } from './data';
import { createContext, useContext } from 'react';
import type { CartItem, Order, Product } from './types';

// Provided by VendorAdminGate once a vendor session has been verified.
export const VendorEmailContext = createContext<string | null>(null);

export function useVendorEmail(): string | null {
  return useContext(VendorEmailContext);
}

const normalize = (email: string) => email.trim().toLowerCase();

// Records saved before multi-vendor support have no owner and belong to the main seller.
export function getProductVendor(product: Product): string {
  return normalize(product.vendorEmail ?? DEFAULT_VENDOR_EMAIL);
}

export function getOrderVendors(order: Order): string[] {
  return Array.from(new Set(order.items.map((item) => getProductVendor(item.product))));
}

export function filterProductsByVendor(products: Product[], vendorEmail: string): Product[] {
  const email = normalize(vendorEmail);
  return products.filter((p) => getProductVendor(p) === email);
}

export function getVendorItems(order: Order, vendorEmail: string): CartItem[] {
  const email = normalize(vendorEmail);
  return order.items.filter((item) => getProductVendor(item.product) === email);
}

export function filterOrdersByVendor(orders: Order[], vendorEmail: string): Order[] {
  const email = normalize(vendorEmail);
  return orders.filter((o) => getOrderVendors(o).includes(email));
}

export function getVendorSubtotal(order: Order, vendorEmail: string): number {
  return getVendorItems(order, vendorEmail).reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}
