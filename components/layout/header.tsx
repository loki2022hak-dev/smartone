'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  Phone,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useFavoritesStore, useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { SearchModal } from '@/components/search-modal';
import { CartDrawer } from '@/components/cart-drawer';

const navigation = [
  { name: 'Головна', href: '/' },
  { name: 'Каталог', href: '/catalog' },
  { name: 'iPhone', href: '/catalog?brand=Apple' },
  { name: 'Samsung', href: '/catalog?brand=Samsung' },
  { name: 'Xiaomi', href: '/catalog?brand=Xiaomi' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useCartStore((state) => state.getTotalItems());
  const favoriteItems = useFavoritesStore((state) => state.items.length);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        {/* Top bar */}
        <div className="border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="hidden md:flex items-center gap-6 text-muted-foreground">
                <span>Безкоштовна доставка від 10 000 грн</span>
                <span className="text-primary">|</span>
                <span>Офіційна гарантія</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground ml-auto">
                <a
                  href="tel:+380991234567"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden sm:inline">+38 (099) 123-45-67</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl lg:text-3xl font-bold text-gradient-gold tracking-tight">
                LUXPHONE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation?.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href.split('?')?.[0]));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Пошук"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Favorites */}
              <Link href="/favorites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground relative"
                  aria-label="Обране"
                >
                  <Heart className="h-5 w-5" />
                  {favoriteItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                      {favoriteItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative"
                onClick={() => setIsCartOpen(true)}
                aria-label="Кошик"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                  >
                    {cartItems}
                  </motion.span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Меню"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/50"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navigation?.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href.split('?')?.[0]));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-[104px] lg:h-[120px]" />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
