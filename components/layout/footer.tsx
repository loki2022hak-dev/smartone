import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
} from 'lucide-react';

const footerLinks = {
  catalog: {
    title: 'Каталог',
    links: [
      { name: 'iPhone', href: '/catalog?brand=Apple' },
      { name: 'Samsung', href: '/catalog?brand=Samsung' },
      { name: 'Xiaomi', href: '/catalog?brand=Xiaomi' },
      { name: 'Google Pixel', href: '/catalog?brand=Google' },
      { name: 'OnePlus', href: '/catalog?brand=OnePlus' },
      { name: 'Аксесуари', href: '/catalog?category=accessory' },
    ],
  },
  info: {
    title: 'Інформація',
    links: [
      { name: 'Про нас', href: '/about' },
      { name: 'Доставка та оплата', href: '/delivery' },
      { name: 'Гарантія', href: '/warranty' },
      { name: 'Повернення', href: '/returns' },
      { name: 'Контакти', href: '/contacts' },
    ],
  },
  support: {
    title: 'Підтримка',
    links: [
      { name: 'Часті питання', href: '/faq' },
      { name: 'Як замовити', href: '/how-to-order' },
      { name: 'Статус замовлення', href: '/order-status' },
      { name: 'Політика конфіденційності', href: '/privacy' },
      { name: 'Умови використання', href: '/terms' },
    ],
  },
};

const trustBadges = [
  {
    icon: ShieldCheck,
    title: 'Офіційна гарантія',
    description: '12-24 місяці',
  },
  {
    icon: Truck,
    title: 'Безкоштовна доставка',
    description: 'Від 10 000 грн',
  },
  {
    icon: CreditCard,
    title: 'Безпечна оплата',
    description: '100% захист',
  },
  {
    icon: RotateCcw,
    title: 'Повернення',
    description: '14 днів',
  },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Trust badges */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges?.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{badge.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-gradient-gold tracking-tight">
                LUXPHONE
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Преміум смартфони для вибагливих. Офіційна гарантія, безкоштовна
              доставка та найкращі ціни в Україні.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+380991234567"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>+38 (099) 123-45-67</span>
              </a>
              <a
                href="mailto:info@luxphone.ua"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>info@luxphone.ua</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Київ, вул. Хрещатик 1</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Пн-Нд: 9:00 - 21:00</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks)?.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links?.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LUXPHONE. Всі права захищено.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-sm text-muted-foreground">
                Приймаємо до оплати:
              </span>
              <div className="flex items-center gap-3">
                <div className="h-8 w-12 rounded bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                  VISA
                </div>
                <div className="h-8 w-12 rounded bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                  MC
                </div>
                <div className="h-8 w-12 rounded bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                  GPay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
