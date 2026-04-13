import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data/products";
import { accessories } from "@/lib/data/accessories";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Search products
  const productResults = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.features.some((f) => f.toLowerCase().includes(query))
    )
    .slice(0, limit)
    .map((p) => ({
      type: "product" as const,
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand,
      image: p.images[0],
      price: Math.min(...p.variants.map((v) => v.salePrice || v.price)),
      originalPrice: p.variants.some((v) => v.salePrice)
        ? Math.min(...p.variants.map((v) => v.price))
        : undefined,
    }));

  // Search accessories
  const accessoryResults = accessories
    .filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
    )
    .slice(0, Math.max(0, limit - productResults.length))
    .map((a) => ({
      type: "accessory" as const,
      id: a.id,
      name: a.name,
      slug: a.slug,
      category: a.category,
      image: a.image,
      price: a.salePrice || a.price,
      originalPrice: a.salePrice ? a.price : undefined,
    }));

  // Combine results
  const results = [...productResults, ...accessoryResults];

  return NextResponse.json({
    results,
    query,
    total: results.length,
  });
}
