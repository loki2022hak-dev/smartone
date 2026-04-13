import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'LUXPHONE | Преміум смартфони в Україні',
    template: '%s | LUXPHONE',
  },
  description:
    'Інтернет-магазин преміум смартфонів в Україні. iPhone, Samsung, Xiaomi та інші флагмани з офіційною гарантією. Великодня знижка -50% на всі моделі!',
  keywords: [
    'смартфони',
    'iPhone',
    'Samsung',
    'Xiaomi',
    'купити смартфон',
    'телефони Україна',
    'преміум телефони',
    'флагман',
  ],
  authors: [{ name: 'LUXPHONE' }],
  creator: 'LUXPHONE',
  publisher: 'LUXPHONE',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://luxphone.ua',
    siteName: 'LUXPHONE',
    title: 'LUXPHONE | Преміум смартфони в Україні',
    description:
      'Інтернет-магазин преміум смартфонів з офіційною гарантією. Великодня знижка -50% на всі моделі!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LUXPHONE - Преміум смартфони',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXPHONE | Преміум смартфони в Україні',
    description: 'Великодня знижка -50% на всі смартфони!',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a1f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
