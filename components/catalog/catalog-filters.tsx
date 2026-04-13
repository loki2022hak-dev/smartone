"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

// Get unique values from products
const brands = [...new Set(products.map((p) => p.brand))];
const allFeatures = [...new Set(products.flatMap((p) => p.features))];
const priceRange = {
  min: Math.min(...products.flatMap((p) => p.variants.map((v) => v.price))),
  max: Math.max(...products.flatMap((p) => p.variants.map((v) => v.price))),
};

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium text-foreground hover:text-primary transition-colors">
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface CatalogFiltersProps {
  selectedBrands: string[];
  selectedFeatures: string[];
  priceMin: number;
  priceMax: number;
  onFilterChange: (filters: {
    brands: string[];
    features: string[];
    priceMin: number;
    priceMax: number;
  }) => void;
}

export function CatalogFilters({
  selectedBrands,
  selectedFeatures,
  priceMin,
  priceMax,
  onFilterChange,
}: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localPriceRange, setLocalPriceRange] = useState([priceMin, priceMax]);

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onFilterChange({
      brands: newBrands,
      features: selectedFeatures,
      priceMin: localPriceRange[0],
      priceMax: localPriceRange[1],
    });
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];
    onFilterChange({
      brands: selectedBrands,
      features: newFeatures,
      priceMin: localPriceRange[0],
      priceMax: localPriceRange[1],
    });
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange(value);
  };

  const handlePriceCommit = () => {
    onFilterChange({
      brands: selectedBrands,
      features: selectedFeatures,
      priceMin: localPriceRange[0],
      priceMax: localPriceRange[1],
    });
  };

  const clearAllFilters = () => {
    setLocalPriceRange([priceRange.min, priceRange.max]);
    onFilterChange({
      brands: [],
      features: [],
      priceMin: priceRange.min,
      priceMax: priceRange.max,
    });
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedFeatures.length > 0 ||
    priceMin !== priceRange.min ||
    priceMax !== priceRange.max;

  const FilterContent = () => (
    <div className="space-y-4">
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Active filters</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-primary hover:text-primary/80"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandToggle(brand)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              {brand}
              <X className="h-3 w-3" />
            </button>
          ))}
          {selectedFeatures.map((feature) => (
            <button
              key={feature}
              onClick={() => handleFeatureToggle(feature)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              {feature}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      <FilterSection title="Brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <span className="text-sm text-foreground">{brand}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                ({products.filter((p) => p.brand === brand).length})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="px-2 pt-4 pb-2">
          <Slider
            min={priceRange.min}
            max={priceRange.max}
            step={50}
            value={localPriceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ${localPriceRange[0].toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              ${localPriceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Features" defaultOpen={false}>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allFeatures.slice(0, 15).map((feature) => (
            <label
              key={feature}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => handleFeatureToggle(feature)}
              />
              <span className="text-sm text-foreground">{feature}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <h2 className="text-lg font-semibold text-foreground mb-4">Filters</h2>
        <FilterContent />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                  {selectedBrands.length + selectedFeatures.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
