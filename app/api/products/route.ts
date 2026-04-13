import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Parse query parameters
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const features = searchParams.get("features")?.split(",").filter(Boolean);
  const sort = searchParams.get("sort") || "featured";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  let filteredProducts = [...products];

  // Filter by brand
  if (brand) {
    const brands = brand.split(",").map((b) => b.toLowerCase());
    filteredProducts = filteredProducts.filter((p) =>
      brands.includes(p.brand.toLowerCase())
    );
  }

  // Filter by price
  if (minPrice) {
    const min = parseFloat(minPrice);
    filteredProducts = filteredProducts.filter((p) =>
      p.variants.some((v) => (v.salePrice || v.price) >= min)
    );
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    filteredProducts = filteredProducts.filter((p) =>
      p.variants.some((v) => (v.salePrice || v.price) <= max)
    );
  }

  // Filter by features
  if (features && features.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      features.every((f) => p.features.includes(f))
    );
  }

  // Sort
  switch (sort) {
    case "price-asc":
      filteredProducts.sort(
        (a, b) =>
          Math.min(...a.variants.map((v) => v.salePrice || v.price)) -
          Math.min(...b.variants.map((v) => v.salePrice || v.price))
      );
      break;
    case "price-desc":
      filteredProducts.sort(
        (a, b) =>
          Math.min(...b.variants.map((v) => v.salePrice || v.price)) -
          Math.min(...a.variants.map((v) => v.salePrice || v.price))
      );
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // featured - keep original order
      break;
  }

  // Pagination
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);

  return NextResponse.json({
    products: paginatedProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
}
