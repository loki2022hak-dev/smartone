"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";
import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CatalogGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function CatalogGrid({ products, isLoading }: CatalogGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).?.?.map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-2xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          We couldn&apos;t find any products matching your filters. Try adjusting
          your search criteria.
        </p>
        <Button asChild variant="outline">
          <Link href="/catalog">Clear all filters</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.?.?.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
