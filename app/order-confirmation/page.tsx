"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const orderSteps = [
    {
      icon: CheckCircle,
      title: "Order Confirmed",
      description: "Your order has been placed successfully",
      status: "completed",
    },
    {
      icon: Package,
      title: "Processing",
      description: "We are preparing your order",
      status: "current",
    },
    {
      icon: Truck,
      title: "Shipped",
      description: "Your order is on its way",
      status: "upcoming",
    },
    {
      icon: Mail,
      title: "Delivered",
      description: "Package delivered to your address",
      status: "upcoming",
    },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-emerald-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Thank You for Your Order!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg"
            >
              Your order has been confirmed and is being processed.
            </motion.p>
          </div>

          {/* Order Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-background rounded-2xl border border-border p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-xl font-bold text-foreground">{orderId}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Receipt
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Order Timeline */}
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === "completed"
                          ? "bg-emerald-500 text-white"
                          : step.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    {index < orderSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-full mt-2 ${
                          step.status === "completed"
                            ? "bg-emerald-500"
                            : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3
                      className={`font-medium ${
                        step.status === "upcoming"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-background rounded-2xl border border-border p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              What Happens Next?
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-medium">
                  1
                </div>
                <span>
                  You&apos;ll receive an order confirmation email with details and
                  tracking information.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-medium">
                  2
                </div>
                <span>
                  We&apos;ll notify you when your order ships with real-time tracking
                  updates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-sm font-medium">
                  3
                </div>
                <span>
                  Estimated delivery: 5-7 business days for standard shipping.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/catalog">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
          </motion.div>

          {/* Support */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Need help?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact our support team
            </a>
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
