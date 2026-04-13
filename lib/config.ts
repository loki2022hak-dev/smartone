// Easter Campaign Configuration
// Change this date to adjust when the Easter sale ends
export const EASTER_END_DATE = new Date('2025-04-21T23:59:59');

// Site Configuration
export const SITE_CONFIG = {
  name: 'LUXPHONE',
  tagline: 'Преміум смартфони для вибагливих',
  currency: 'UAH',
  currencySymbol: 'грн',
  freeShippingThreshold: 10000,
  discountPercent: 50,
};

// Shipping Methods
export const SHIPPING_METHODS = [
  {
    id: 'nova-poshta',
    name: 'Нова Пошта',
    description: 'Доставка 1-3 дні',
    price: 0,
    icon: 'truck',
  },
  {
    id: 'ukrposhta',
    name: 'Укрпошта',
    description: 'Доставка 3-7 днів',
    price: 0,
    icon: 'mail',
  },
  {
    id: 'meest',
    name: 'Meest Express',
    description: 'Доставка 2-4 дні',
    price: 0,
    icon: 'package',
  },
  {
    id: 'pickup',
    name: 'Самовивіз',
    description: 'Київ, вул. Хрещатик 1',
    price: 0,
    icon: 'map-pin',
  },
] as const;

// Trust Badges
export const TRUST_BADGES = [
  {
    icon: 'shield-check',
    title: 'Офіційна гарантія',
    description: '12-24 місяці',
  },
  {
    icon: 'truck',
    title: 'Безкоштовна доставка',
    description: 'Від 10 000 грн',
  },
  {
    icon: 'refresh-cw',
    title: 'Повернення 14 днів',
    description: 'Без питань',
  },
  {
    icon: 'credit-card',
    title: 'Безпечна оплата',
    description: '100% захист',
  },
];

// FAQ Data
export const FAQ_DATA = [
  {
    question: 'Чи оригінальні смартфони у вашому магазині?',
    answer: 'Так, ми продаємо виключно оригінальні смартфони від офіційних дистриб\'юторів. Кожен пристрій має офіційну гарантію виробника та всі необхідні сертифікати.',
  },
  {
    question: 'Як працює Великодня знижка -50%?',
    answer: 'Великодня VIP-знижка автоматично застосовується до всіх товарів у каталозі. Ви бачите стару ціну закреслену та нову святкову ціну. Акція діє до кінця Великодня.',
  },
  {
    question: 'Які способи доставки доступні?',
    answer: 'Ми доставляємо по всій Україні через Нову Пошту, Укрпошту та Meest Express. При замовленні від 10 000 грн доставка безкоштовна. Також доступний самовивіз з нашого салону в Києві.',
  },
  {
    question: 'Чи можна повернути товар?',
    answer: 'Так, ви можете повернути товар протягом 14 днів з моменту отримання, якщо він не був у використанні та зберіг товарний вигляд. Повернення коштів здійснюється протягом 3-5 робочих днів.',
  },
  {
    question: 'Як оформити замовлення?',
    answer: 'Додайте товари в кошик, перейдіть до оформлення, заповніть контактні дані та оберіть спосіб доставки. Оплата здійснюється онлайн або при отриманні.',
  },
  {
    question: 'Чи є гарантія на смартфони?',
    answer: 'Всі смартфони мають офіційну гарантію від 12 до 24 місяців залежно від виробника. Гарантійне обслуговування здійснюється в авторизованих сервісних центрах.',
  },
];
