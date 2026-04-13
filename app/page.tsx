import { HeroSection } from "@/components/home/hero-section";
import { FlashSaleSection } from "@/components/home/flash-sale-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <FlashSaleSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}
