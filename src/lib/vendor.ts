import { createContext, useContext } from 'react';
import { DEFAULT_VENDOR_EMAIL } from './data';
import type { Product } from './types';

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

export function filterProductsByVendor(products: Product[], vendorEmail: string): Product[] {
  const email = normalize(vendorEmail);
  return products.filter((p) => getProductVendor(p) === email);
}
