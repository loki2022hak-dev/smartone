"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { CountdownTimer } from "@/components/countdown-timer";
import { products } from "@/lib/data/products";

// Get products with sale prices
const saleProducts = products
  ?.filter((p) => p?.variants?.some((v) => v?.salePrice))
  ?.slice(0, 4);

// Sale ends in 2 days from now
const saleEndDate = new Date(Date?.now() + 2 * 24 * 60 * 60 * 1000);

export function FlashSaleSection() {
  if (saleProducts?.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4">
        <motion?.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/25">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Flash Sale
              </h2>
              <p className="text-muted-foreground">
                Limited time offers on premium devices
              </p>
            </div>
          </div>

          <CountdownTimer
            targetDate={saleEndDate}
            label="Sale ends in:"
          />
        </motion?.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts?.??.??.map((product, index) => (
            <motion?.div
              key={product?.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0?.1 }}
            >
              <ProductCard product={product} showSaleBadge />
            </motion?.div>
          ))}
        </div>
      </div>
    </section>
  );
}
