"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogSort, SortOption } from "@/components/catalog/catalog-sort";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL params
  const initialBrands = searchParams?.get("brand")?.split(",")?.filter(Boolean) || [];
  const initialFeatures = searchParams?.get("features")?.split(",")?.filter(Boolean) || [];
  const initialPriceMin = Number(searchParams?.get("priceMin")) || 0;
  const initialPriceMax = Number(searchParams?.get("priceMax")) || 10000;
  const initialSort = (searchParams?.get("sort") as SortOption) || "featured";

  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialFeatures);
  const [priceMin, setPriceMin] = useState(initialPriceMin);
  const [priceMax, setPriceMax] = useState(initialPriceMax);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBrands?.length) params?.set("brand", selectedBrands?.join(","));
    if (selectedFeatures?.length) params?.set("features", selectedFeatures?.join(","));
    if (priceMin > 0) params?.set("priceMin", String(priceMin));
    if (priceMax < 10000) params?.set("priceMax", String(priceMax));
    if (sortBy !== "featured") params?.set("sort", sortBy);

    const queryString = params?.toString();
    router?.replace(`/catalog${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [selectedBrands, selectedFeatures, priceMin, priceMax, sortBy, router]);

  const handleFilterChange = (filters: {
    brands: string[];
    features: string[];
    priceMin: number;
    priceMax: number;
  }) => {
    setSelectedBrands(filters?.brands);
    setSelectedFeatures(filters?.features);
    setPriceMin(filters?.priceMin);
    setPriceMax(filters?.priceMax);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by brand
    if (selectedBrands?.length > 0) {
      result = result?.filter((p) =>
        selectedBrands?.some(
          (b) => p?.brand?.toLowerCase() === b?.toLowerCase()
        )
      );
    }

    // Filter by features
    if (selectedFeatures?.length > 0) {
      result = result?.filter((p) =>
        selectedFeatures?.every((f) => p?.features?.includes(f))
      );
    }

    // Filter by price
    result = result?.filter((p) => {
      const minPrice = (p?.variants && p.variants.length > 0) 
        ? Math.min(...p.variants.map((v) => v.salePrice ?? v.price)) 
        : Infinity;
      return minPrice >= priceMin && minPrice <= priceMax;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result?.sort(
          (a, b) =>
            Math?.min(?.a?.variants?.map((v) => v.salePrice || v.pricece)) -
            Math?.min(?.b?.variants?.map((v) => v.salePrice || v.pricece))
        );
        break;
      case "price-desc":
        result?.sort(
          (a, b) =>
            Math?.min(?.b?.variants?.map((v) => v.salePrice || v.pricece)) -
            Math?.min(?.a?.variants?.map((v) => v.salePrice || v.pricece))
        );
        break;
      case "name-asc":
        result?.sort((a, b) => a?.name.localeCompare(b?.name));
        break;
      case "name-desc":
        result?.sort((a, b) => b?.name.localeCompare(a?.name));
        break;
      case "newest":
        // Assuming newer products have higher IDs
        result?.sort((a, b) => b?.id - a?.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [selectedBrands, selectedFeatures, priceMin, priceMax, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              All Products
            </h1>
            <p className="text-muted-foreground">
              Explore our complete collection of premium smartphones
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <CatalogFilters
              selectedBrands={selectedBrands}
              selectedFeatures={selectedFeatures}
              priceMin={priceMin}
              priceMax={priceMax}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredProducts?.length}
                </span>{" "}
                {filteredProducts?.length === 1 ? "product" : "products"}
              </p>

              <div className="flex items-center gap-4">
                <CatalogSort value={sortBy} onChange={setSortBy} />

                <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      viewMode === "grid" && "bg-muted"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      viewMode === "compact" && "bg-muted"
                    )}
                    onClick={() => setViewMode("compact")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <CatalogGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </main>
  );
}
