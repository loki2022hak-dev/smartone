"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/data/products";

const categories = [
  {
    name: "Apple iPhone",
    slug: "apple",
    description: "Premium iOS devices",
    color: "from-slate-900 to-slate-700",
    products: products.filter((p) => p.brand === "Apple"),
  },
  {
    name: "Samsung Galaxy",
    slug: "samsung",
    description: "Android excellence",
    color: "from-indigo-900 to-indigo-700",
    products: products.filter((p) => p.brand === "Samsung"),
  },
  {
    name: "Google Pixel",
    slug: "google",
    description: "Pure Android experience",
    color: "from-emerald-900 to-emerald-700",
    products: products.filter((p) => p.brand === "Google"),
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    description: "Never settle",
    color: "from-red-900 to-red-700",
    products: products.filter((p) => p.brand === "OnePlus"),
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Brand
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of premium smartphones from the world&apos;s
            leading manufacturers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/catalog?brand=${category.slug}`}>
                <div
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} aspect-[4/5] p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]`}
                >
                  {/* Product preview */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-64 opacity-30 group-hover:opacity-50 transition-opacity">
                    {category.products[0] && (
                      <Image
                        src={category.products[0].images[0]}
                        alt={category.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-2">
                      {category.products.length} products
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-white font-medium group-hover:gap-2 transition-all">
                      <span>Browse</span>
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
