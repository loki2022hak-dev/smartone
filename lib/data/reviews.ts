import { Review } from '@/lib/types';

export const reviews: Review[] = [
  {
    id: 'review-1',
    productId: 'iphone-16-pro-max',
    author: 'Олександр К.',
    rating: 5,
    text: 'Неймовірний телефон! Камера просто вражає, особливо нічна зйомка. Титановий корпус дуже преміальний на дотик. Швидкість роботи блискавична. Рекомендую всім!',
    date: '2024-03-15',
    verified: true,
  },
  {
    id: 'review-2',
    productId: 'iphone-16-pro-max',
    author: 'Марія П.',
    rating: 5,
    text: 'Перейшла з iPhone 13 Pro і не шкодую! Екран став ще кращим, батарея тримає весь день активного використання. Дуже задоволена покупкою.',
    date: '2024-03-12',
    verified: true,
  },
  {
    id: 'review-3',
    productId: 'samsung-s24-ultra',
    author: 'Дмитро В.',
    rating: 5,
    text: 'S Pen - це справжня знахідка для роботи. AI функції працюють чудово, особливо переклад в реальному часі. Камера 200МП дає неймовірну деталізацію.',
    date: '2024-03-10',
    verified: true,
  },
  {
    id: 'review-4',
    productId: 'samsung-s24-ultra',
    author: 'Анна С.',
    rating: 4,
    text: 'Чудовий телефон, але трохи важкуватий. Зате екран найкращий на ринку і камера просто топ. Швидка зарядка економить багато часу.',
    date: '2024-03-08',
    verified: true,
  },
  {
    id: 'review-5',
    productId: 'xiaomi-14-ultra',
    author: 'Петро М.',
    rating: 5,
    text: 'Камера Leica - це щось неймовірне! Фото виходять як з професійного фотоапарата. Зарядка 90W заряджає телефон за 30 хвилин. Дуже задоволений!',
    date: '2024-03-05',
    verified: true,
  },
  {
    id: 'review-6',
    productId: 'pixel-8-pro',
    author: 'Ірина Л.',
    rating: 5,
    text: 'AI можливості Pixel вражають! Магічна гумка, покращення фото, транскрибування - все працює бездоганно. Найчистіший Android.',
    date: '2024-03-03',
    verified: true,
  },
  {
    id: 'review-7',
    productId: 'oneplus-12',
    author: 'Сергій Т.',
    rating: 5,
    text: 'Найшвидша зарядка, яку я бачив! 100W за 25 хвилин заряджає повністю. Hasselblad камера робить приголомшливі фото. Ціна-якість на топі.',
    date: '2024-02-28',
    verified: true,
  },
  {
    id: 'review-8',
    productId: 'poco-f6-pro',
    author: 'Андрій Н.',
    rating: 5,
    text: 'Справжній флагман-кілер! Snapdragon 8 Gen 2 за таку ціну - це неймовірно. Ігри йдуть на максималках без проблем.',
    date: '2024-02-25',
    verified: true,
  },
];

export const getProductReviews = (productId: string): Review[] => {
  return reviews.filter((r) => r.productId === productId);
};

export const getLatestReviews = (limit: number = 6): Review[] => {
  return [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Testimonials for homepage
export const testimonials = [
  {
    id: 't-1',
    author: 'Олександр К.',
    role: 'Підприємець',
    avatar: 'О',
    rating: 5,
    text: 'Замовляю вже втретє в LUXPHONE. Завжди оригінальна техніка, швидка доставка та відмінний сервіс. Рекомендую всім!',
  },
  {
    id: 't-2',
    author: 'Марія С.',
    role: 'Дизайнер',
    avatar: 'М',
    rating: 5,
    text: 'Великодня знижка допомогла зекономити майже половину вартості iPhone 16 Pro. Дуже вдячна за таку можливість!',
  },
  {
    id: 't-3',
    author: 'Дмитро В.',
    role: 'IT спеціаліст',
    avatar: 'Д',
    rating: 5,
    text: 'Нарешті знайшов магазин з адекватними цінами та справжньою гарантією. Samsung S24 Ultra працює бездоганно.',
  },
  {
    id: 't-4',
    author: 'Анна П.',
    role: 'Маркетолог',
    avatar: 'А',
    rating: 5,
    text: 'Консультант допоміг обрати ідеальний телефон під мої потреби. Сервіс на найвищому рівні!',
  },
  {
    id: 't-5',
    author: 'Петро М.',
    role: 'Фотограф',
    avatar: 'П',
    rating: 5,
    text: 'Xiaomi 14 Ultra з камерою Leica - найкраща покупка року. Якість фото вражає навіть професіоналів.',
  },
  {
    id: 't-6',
    author: 'Ірина Л.',
    role: 'Менеджер',
    avatar: 'І',
    rating: 5,
    text: 'Доставка Новою Поштою за 1 день. Телефон прийшов у ідеальному стані з усіма документами. Дякую!',
  },
];
