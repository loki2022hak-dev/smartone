"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/data/products";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </main>
    );
  }

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    const color = product?.colors.find((c) => c.id === item.colorId);
    return { ...item, product, variant, color };
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 29.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
              Start shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link href="/catalog">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => {
                if (!item.product || !item.variant || !item.color) return null;
                const price = item.variant.salePrice || item.variant.price;

                return (
                  <motion.div
                    key={`${item.productId}-${item.variantId}-${item.colorId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                  >
                    {/* Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl bg-muted overflow-hidden shrink-0"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.variant.storage} / {item.color.name}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeItem(
                              item.productId,
                              item.variantId,
                              item.colorId
                            )
                          }
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.colorId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.colorId,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            ${(price * item.quantity).toLocaleString()}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-muted-foreground">
                              ${price.toLocaleString()} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-4">
              <Button variant="ghost" onClick={clearCart} className="text-destructive">
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link href="/catalog">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9"
                      disabled={promoApplied}
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-emerald-600 mt-2">
                    10% discount applied!
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Try &quot;SAVE10&quot; for 10% off
                </p>
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $500
                  </p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full mt-6">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center text-xs text-muted-foreground">
                  <div>
                    <div className="font-medium text-foreground">Secure</div>
                    <div>256-bit SSL</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Trusted</div>
                    <div>100k+ customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
