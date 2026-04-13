"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/products";

const heroSlides = [
  {
    id: 1,
    product: products?.find((p) => p?.slug === "iphone-16-pro-max"),
    tagline: "Experience the Future",
    headline: "iPhone 16 Pro Max",
    description:
      "Titanium design?A18 Pro chip?The most powerful iPhone ever created?.",
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    accent: "text-amber-400",
  },
  {
    id: 2,
    product: products?.find((p) => p?.slug === "samsung-galaxy-s25-ultra"),
    tagline: "Unleash Galaxy AI",
    headline: "Samsung Galaxy S25 Ultra",
    description:
      "The ultimate Galaxy experience with AI-powered features and S Pen?.",
    gradient: "from-indigo-950 via-purple-900 to-indigo-950",
    accent: "text-violet-400",
  },
  {
    id: 3,
    product: products?.find((p) => p?.slug === "google-pixel-9-pro"),
    tagline: "Pure Google Magic",
    headline: "Google Pixel 9 Pro",
    description:
      "The best of Google AI in a beautifully crafted smartphone.",
    gradient: "from-emerald-950 via-teal-900 to-emerald-950",
    accent: "text-emerald-400",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        />
      </AnimatePresence>

      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left z-10"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`inline-block text-sm font-semibold tracking-wider uppercase mb-4 ${slide.accent}`}
              >
                {slide.tagline}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight text-balance"
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 text-base px-8"
                >
                  <Link href={`/products/${slide.product?.slug}`}>
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 text-base px-8"
                >
                  <Link href="/catalog">View All Products</Link>
                </Button>
              </motion.div>

              {slide.product && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-white/60"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      ${slide.product?.variants?.[0]?.price.toLocaleString()}
                    </div>
                    <div className="text-sm">Starting from</div>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {slide.product?.colors?.length}
                    </div>
                    <div className="text-sm">Colors</div>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {slide.product?.variants?.length}
                    </div>
                    <div className="text-sm">Variants</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Product Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-64 h-[500px] md:w-80 md:h-[600px] lg:w-96 lg:h-[700px]">
                {/* Glow effect */}
                <div className={`absolute inset-0 blur-3xl bg-gradient-to-t from-white/20 to-transparent rounded-full transform scale-75`} />
                
                {slide.product && (
                  <Image
                    src={slide.product?.images?.[0]}
                    alt={slide.product?.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex gap-2">
            {heroSlides?.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
