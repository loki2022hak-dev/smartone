import { OrderItem, CustomerInfo, ShippingMethod } from '@/lib/types';

export interface CheckoutRequest {
  customer: CustomerInfo;
  items: CheckoutItem[];
  shippingMethod: ShippingMethod;
}

export interface CheckoutItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface CheckoutSession {
  id: string;
  orderId: string;
  checkoutUrl: string;
  expiresAt: string;
}

export interface PaymentProvider {
  name: string;
  createCheckoutSession(data: CreateSessionData): Promise<CheckoutSession>;
  verifyWebhookSignature(payload: string, signature: string): boolean;
  parseWebhookEvent(payload: string): WebhookEvent;
}

export interface CreateSessionData {
  orderId: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
}

export interface WebhookEvent {
  type: 'checkout.session.completed' | 'payment.failed' | 'payment.pending' | 'payment.canceled';
  data: {
    orderId: string;
    paymentId: string;
    amount: number;
    currency: string;
    status: string;
    metadata?: Record<string, string>;
  };
}

export interface PaymentConfig {
  provider: string;
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
  currency: string;
  successUrl: string;
  cancelUrl: string;
}
