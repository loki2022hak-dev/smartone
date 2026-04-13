import { PaymentConfig } from './types';

export const getPaymentConfig = (): PaymentConfig => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    provider: process.env.PAYMENT_PROVIDER || 'default',
    publicKey: process.env.PAYMENT_PUBLIC_KEY || '',
    secretKey: process.env.PAYMENT_SECRET_KEY || '',
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || '',
    currency: process.env.PAYMENT_CURRENCY || 'UAH',
    successUrl: process.env.PAYMENT_SUCCESS_URL || `${baseUrl}/order/success`,
    cancelUrl: process.env.PAYMENT_CANCEL_URL || `${baseUrl}/order/canceled`,
  };
};

export const isPaymentConfigured = (): boolean => {
  const config = getPaymentConfig();
  return Boolean(config.secretKey && config.publicKey);
};

export const paymentConfig = {
  merchantId: process.env.MERCHANT_ID,
  secret: process.env.SECRET_KEY
};
