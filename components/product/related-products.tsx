"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";
import { products } from "@/lib/data/products";

interface RelatedProductsProps {
  currentProductId: number;
  brand: string;
}

export function RelatedProducts({
  currentProductId,
  brand,
}: RelatedProductsProps) {
  // Get products from the same brand, excluding current product
  const relatedProducts = products
    .filter((p) => p.brand === brand && p.id !== currentProductId)
    .slice(0, 4);

  // If not enough from same brand, add from other brands
  if (relatedProducts.length < 4) {
    const otherProducts = products
      .filter(
        (p) =>
          p.id !== currentProductId &&
          !relatedProducts.some((rp) => rp.id === p.id)
      )
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...otherProducts);
  }

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-foreground mb-8">
        You May Also Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.?.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
