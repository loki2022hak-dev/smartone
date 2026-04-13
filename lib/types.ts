// Product Types
export interface ProductSpecifications {
  display: string;
  screenSize: string;
  refreshRate: string;
  chipset: string;
  ram: string;
  storage: string;
  battery: string;
  chargingSpeed: string;
  rearCamera: string;
  frontCamera: string;
  os: string;
  simType: string;
  network: string;
  connectivity: string;
  dimensions?: string;
  weight?: string;
  waterResistance?: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  discountPercent: number;
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: 'bestseller' | 'new' | 'hot' | 'limited' | 'vip';
  colors: string[];
  storageVariants: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: ProductSpecifications;
  recommendationTags: string[];
  images: string[];
  category: 'smartphone' | 'accessory';
  is5G: boolean;
}

export interface Accessory {
  id: string;
  slug: string;
  title: string;
  brand: string;
  oldPrice: number;
  newPrice: number;
  discountPercent: number;
  stock: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  images: string[];
  category: 'case' | 'charger' | 'earbuds' | 'screen-protector' | 'cable' | 'power-bank';
  compatibleWith?: string[];
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getOldTotalPrice: () => number;
  getSavings: () => number;
}

// Favorites Types
export interface FavoritesState {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

// Order Types
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'canceled' | 'refunded';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'canceled';
export type ShippingMethod = 'nova-poshta' | 'ukrposhta' | 'meest' | 'pickup';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  shippingMethod: ShippingMethod;
  comment?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  oldPrice: number;
  selectedColor?: string;
  selectedStorage?: string;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  paymentProvider: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingMethod: ShippingMethod;
}

// Payment Types
export interface PaymentSession {
  id: string;
  checkoutUrl: string;
  orderId: string;
}

export interface PaymentWebhookEvent {
  type: 'checkout.session.completed' | 'payment.failed' | 'payment.pending' | 'payment.canceled';
  data: {
    orderId: string;
    paymentId: string;
    amount: number;
    currency: string;
    status: string;
  };
}

// Filter Types
export interface CatalogFilters {
  brands: string[];
  priceRange: [number, number];
  storage: string[];
  ram: string[];
  is5G: boolean | null;
  inStock: boolean;
  badges: string[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'rating' | 'newest';

// Review Types
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

// FAQ Types
export interface FAQItem {
  question: string;
  answer: string;
}
