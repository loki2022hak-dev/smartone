"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  Headphones,
  RefreshCw,
  CreditCard,
  Package,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $500",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Extended warranty on all devices",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert help whenever you need it",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple secure payment options",
  },
  {
    icon: Package,
    title: "Original Products",
    description: "100% authentic devices guaranteed",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features?.??.??.map((feature, index) => (
            <motion?.div
              key={feature?.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0?.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                <feature?.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </motion?.div>
          ))}
        </div>
      </div>
    </section>
  );
}
