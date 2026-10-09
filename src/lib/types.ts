export type Category = 'eletronicos' | 'moda' | 'alimentacao' | 'eletrodomesticos' | 'beleza';

export type ElectronicsSubCategory = 'phones' | 'computers' | 'tvs' | 'gaming' | 'audio_wearables';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number; // in XOF (FCFA)
  originalPrice?: number;
  category: Category;
  subCategory?: ElectronicsSubCategory | string; // e.g. 'phones', 'computers', 'tvs', 'gaming'
  brand?: string; // e.g. 'Apple', 'Samsung', 'Sony', 'Tecno', 'Infinix', 'HP', 'Dell', 'Nintendo'
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFlashDeal?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'orange_money' | 'momo' | 'card' | 'cod';

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'in_delivery' | 'completed' | 'cancelled';

export interface DeliveryAddress {
  fullName: string;
  phone: string; // Guinea-Bissau phone (+245)
  secondaryPhone?: string;
  bairro: string; // Neighborhood in Bissau
  landmark: string; // Description/Reference point
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'successful' | 'failed';
  paymentReference?: string;
  orderStatus: OrderStatus;
  createdAt: string;
}

export type Language = 'pt' | 'en';
