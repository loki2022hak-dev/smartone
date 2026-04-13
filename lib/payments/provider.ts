import { PaymentProvider } from './types';
import { getPaymentConfig } from './config';
import { DefaultPaymentProvider } from './providers/default-provider';

// Provider registry
const providers: Record<string, () => PaymentProvider> = {
  default: () => new DefaultPaymentProvider(),
  // Add more providers here:
  // stripe: () => new StripeProvider(),
  // liqpay: () => new LiqPayProvider(),
  // fondy: () => new FondyProvider(),
  // wayforpay: () => new WayForPayProvider(),
};

let providerInstance: PaymentProvider | null = null;

export const getPaymentProvider = (): PaymentProvider => {
  if (providerInstance) {
    return providerInstance;
  }

  const config = getPaymentConfig();
  const providerFactory = providers[config.provider] || providers.default;

  providerInstance = providerFactory();
  return providerInstance;
};

export const resetProvider = (): void => {
  providerInstance = null;
};
