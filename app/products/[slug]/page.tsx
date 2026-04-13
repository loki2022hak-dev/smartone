import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductSpecs } from "@/components/product/product-specs";
import { ProductReviews } from "@/components/product/product-reviews";
import { RelatedProducts } from "@/components/product/related-products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | NexusPhone`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/catalog" className="hover:text-foreground transition-colors">
              Catalog
            </a>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* Specs & Reviews */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <ProductSpecs product={product} />
          <div /> {/* Spacer for layout */}
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 py-8 border-t border-border">
        <ProductReviews
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </section>

      {/* Related Products */}
      <section className="container mx-auto px-4 border-t border-border">
        <RelatedProducts
          currentProductId={product.id}
          brand={product.brand}
        />
      </section>
    </main>
  );
}
