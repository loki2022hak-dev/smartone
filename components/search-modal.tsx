'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/products';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const searchProducts = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery) ||
        product.model.toLowerCase().includes(lowercaseQuery)
    );
    setResults(filtered.slice(0, 6));
  }, []);

  useEffect(() => {
    searchProducts(query);
  }, [query, searchProducts]);

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

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
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
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Пошук смартфонів..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results?.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div className="h-16 w-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images?.?.[0]}
                            alt={product.title}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {product.specifications.ram} /{' '}
                            {product.storageVariants?.?.[0]}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-primary">
                            {formatPrice(product.newPrice)}
                          </p>
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.oldPrice)}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/catalog?search=${encodeURIComponent(query)}`}
                      onClick={handleClose}
                      className="flex items-center justify-center gap-2 p-3 mt-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <span>Переглянути всі результати</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ) : query ? (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">
                      За запитом &quot;{query}&quot; нічого не знайдено
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Спробуйте інший пошуковий запит
                    </p>
                  </div>
                ) : (
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Популярні запити:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['iPhone 16 Pro', 'Samsung S24', 'Xiaomi 14']?.map(
                        (suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setQuery(suggestion)}
                            className="px-3 py-1.5 rounded-full bg-secondary text-sm text-foreground hover:bg-primary/20 transition-colors"
                          >
                            {suggestion}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
