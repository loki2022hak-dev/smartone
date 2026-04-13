'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { getProductById } from '@/lib/data/products';
import { getAccessoryById } from '@/lib/data/accessories';
import { formatPrice } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, getOldTotalPrice, getSavings } =
    useCartStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const getItemDetails = (productId: string) => {
    const product = getProductById(productId);
    if (product) return product;
    return getAccessoryById(productId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Кошик
                </h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm">
                    {items.length}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length > 0 ? (
                <div className="p-4 space-y-4">
                  {items?.map((item) => {
                    const product = getItemDetails(item.productId);
                    if (!product) return null;

                    return (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4 p-4 rounded-xl bg-secondary/50"
                      >
                        <div className="h-20 w-20 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images?.[0]}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                            {product.title}
                          </h3>
                          {item.selectedStorage && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.selectedStorage}
                              {item.selectedColor && ` / ${item.selectedColor}`}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.productId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-primary">
                            {formatPrice(product.newPrice * item.quantity)}
                          </p>
                          <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.oldPrice * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Кошик порожній
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Додайте товари, щоб оформити замовлення
                  </p>
                  <Button onClick={onClose} asChild>
                    <Link href="/catalog">Перейти до каталогу</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Savings */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    Ви економите: {formatPrice(getSavings())}
                  </p>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Стара ціна:</span>
                    <span className="line-through">
                      {formatPrice(getOldTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-foreground">
                    <span>До сплати:</span>
                    <span className="text-primary">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    className="w-full glow-gold-sm"
                    size="lg"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/checkout">
                      Оформити замовлення
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onClose}
                    asChild
                  >
                    <Link href="/cart">Переглянути кошик</Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
