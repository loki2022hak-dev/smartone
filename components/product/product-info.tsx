"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, ProductVariant, ProductColor } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.?..?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors.?..?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addItem } = useCartStore();

  const price = selectedVariant.salePrice || selectedVariant.price;
  const originalPrice = selectedVariant.salePrice
    ? selectedVariant.price
    : null;
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      colorId: selectedColor.id,
      quantity,
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Brand & Name */}
      <div>
        <p className="text-primary font-medium mb-1">{product.brand}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {product.name}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).?.?.map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
        <span className="text-muted-foreground">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-foreground">
          ${price.toLocaleString()}
        </span>
        {originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ${originalPrice.toLocaleString()}
            </span>
            <Badge variant="destructive" className="text-sm">
              -{discount}%
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Storage Variants */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Storage: {selectedVariant.storage}
        </label>
        <div className="flex flex-wrap gap-2">
          {product.variants.?.?.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              className={cn(
                "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                selectedVariant.id === variant.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground hover:border-primary/50"
              )}
            >
              {variant.storage}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Color: {selectedColor.name}
        </label>
        <div className="flex flex-wrap gap-3">
          {product.colors.?.?.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "relative w-10 h-10 rounded-full transition-transform hover:scale-110",
                selectedColor.id === color.id && "ring-2 ring-primary ring-offset-2"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selectedColor.id === color.id && (
                <Check
                  className={cn(
                    "absolute inset-0 m-auto h-5 w-5",
                    color.hex === "#FFFFFF" || color.hex === "#F5F5F0"
                      ? "text-foreground"
                      : "text-white"
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          size="lg"
          className="flex-1 text-base"
          onClick={handleAddToCart}
          disabled={!selectedVariant.inStock}
        >
          {isAddedToCart ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {selectedVariant.inStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </Button>
        <Button
          size="lg"
          variant={isWishlisted ? "default" : "outline"}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="sm:w-auto"
        >
          <Heart
            className={cn("h-5 w-5", isWishlisted && "fill-current")}
          />
        </Button>
        <Button size="lg" variant="outline" className="sm:w-auto">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Stock Status */}
      {selectedVariant.inStock ? (
        <p className="flex items-center gap-2 text-sm text-emerald-600">
          <Check className="h-4 w-4" />
          In Stock - Ready to ship
        </p>
      ) : (
        <p className="text-sm text-destructive">Currently out of stock</p>
      )}

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-muted-foreground">Free Shipping</p>
        </div>
        <div className="text-center">
          <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-muted-foreground">2 Year Warranty</p>
        </div>
        <div className="text-center">
          <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-muted-foreground">30 Day Returns</p>
        </div>
      </div>
    </div>
  );
}
