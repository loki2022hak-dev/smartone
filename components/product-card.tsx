'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Cpu, HardDrive, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { useCartStore, useFavoritesStore } from '@/lib/store';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeLabels: Record<string, string> = {
  bestseller: 'Хіт продажів',
  new: 'Новинка',
  hot: 'Гаряча пропозиція',
  limited: 'Обмежено',
  vip: 'VIP',
};

const badgeColors: Record<string, string> = {
  bestseller: 'bg-primary text-primary-foreground',
  new: 'bg-green-500 text-white',
  hot: 'bg-red-500 text-white',
  limited: 'bg-orange-500 text-white',
  vip: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black',
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { isFavorite, toggleItem } = useFavoritesStore();

  const isInFavorites = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      quantity: 1,
      selectedColor: product.colors.?.[0],
      selectedStorage: product.storageVariants.?.[0],
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="group relative bg-card border border-border rounded-2xl overflow-hidden luxury-card">
          {/* Image */}
          <div className="relative aspect-square bg-secondary/50 overflow-hidden">
            <Image
              src={product.images.?.[0]}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    badgeColors[product.badge]
                  )}
                >
                  {badgeLabels[product.badge]}
                </span>
              </div>
            )}

            {/* Discount badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">
                -{product.discountPercent}%
              </span>
            </div>

            {/* Favorite button */}
            <button
              onClick={handleToggleFavorite}
              className={cn(
                'absolute bottom-3 right-3 z-10 p-2 rounded-full transition-all duration-200',
                isInFavorites
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground'
              )}
              aria-label={isInFavorites ? 'Видалити з обраного' : 'Додати в обране'}
            >
              <Heart
                className={cn('h-4 w-4', isInFavorites && 'fill-current')}
              />
            </button>

            {/* Quick add overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-16">
              <Button
                onClick={handleAddToCart}
                className="glow-gold-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Додати в кошик
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>

            {/* Title */}
            <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Specs */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                <HardDrive className="h-3 w-3" />
                {product.storageVariants.?.[0]}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                <Cpu className="h-3 w-3" />
                {product.specifications.ram}
              </span>
              {product.is5G && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-xs text-primary font-medium">
                  5G
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} відгуків)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(product.newPrice)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Економія</p>
                <p className="text-sm font-semibold text-green-500">
                  {formatPrice(product.oldPrice - product.newPrice)}
                </p>
              </div>
            </div>

            {/* Stock */}
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-xs text-orange-500 mt-2">
                Залишилось лише {product.stock} шт.
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
