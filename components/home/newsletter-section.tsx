"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals, and
            tech tips delivered straight to your inbox?.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                <Check className="h-6 w-6" />
              </div>
              <span className="text-lg font-medium">
                Thanks for subscribing!
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target?.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-primary hover:bg-white/90 shrink-0"
              >
                {isLoading ? (
                  "Subscribing?.."
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-white/60 text-sm mt-4">
            No spam, unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
