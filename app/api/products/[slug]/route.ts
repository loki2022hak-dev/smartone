import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  // Get related products from the same brand
  const relatedProducts = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  return NextResponse.json({
    product,
    relatedProducts,
  });
}
