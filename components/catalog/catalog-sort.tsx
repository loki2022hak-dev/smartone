"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest";

interface CatalogSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function CatalogSort({ value, onChange }: CatalogSortProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="name-asc">Name: A to Z</SelectItem>
        <SelectItem value="name-desc">Name: Z to A</SelectItem>
      </SelectContent>
    </Select>
  );
}
