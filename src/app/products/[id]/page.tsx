import { INITIAL_PRODUCTS } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
