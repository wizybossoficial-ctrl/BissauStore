import { Suspense } from 'react';
import OrderStatusClient from './OrderStatusClient';

export default function OrderStatusPage() {
  return (
    <Suspense fallback={null}>
      <OrderStatusClient />
    </Suspense>
  );
}
