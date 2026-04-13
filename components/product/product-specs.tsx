"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Camera, Battery, Smartphone, Ruler, Droplets } from "lucide-react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductSpecsProps {
  product: Product;
}

const specIcons: Record<string, React.ElementType> = {
  chipset: Cpu,
  camera: Camera,
  battery: Battery,
  display: Smartphone,
  dimensions: Ruler,
  waterResistance: Droplets,
};

export function ProductSpecs({ product }: ProductSpecsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const specs = product.specifications;

  const specGroups = [
    {
      title: "Display",
      items: [
        { label: "Screen Size", value: specs.display.size },
        { label: "Resolution", value: specs.display.resolution },
        { label: "Type", value: specs.display.type },
        { label: "Refresh Rate", value: specs.display.refreshRate },
      ],
    },
    {
      title: "Performance",
      items: [
        { label: "Chipset", value: specs.chipset },
        { label: "RAM", value: specs.ram },
        { label: "Operating System", value: specs.os },
      ],
    },
    {
      title: "Camera",
      items: [
        { label: "Main Camera", value: specs.camera.main },
        { label: "Front Camera", value: specs.camera.front },
        ...(specs.camera.ultrawide
          ? [{ label: "Ultra Wide", value: specs.camera.ultrawide }]
          : []),
        ...(specs.camera.telephoto
          ? [{ label: "Telephoto", value: specs.camera.telephoto }]
          : []),
      ],
    },
    {
      title: "Battery & Charging",
      items: [
        { label: "Battery Capacity", value: specs.battery.capacity },
        { label: "Wired Charging", value: specs.battery.wiredCharging },
        ...(specs.battery.wirelessCharging
          ? [{ label: "Wireless Charging", value: specs.battery.wirelessCharging }]
          : []),
      ],
    },
    {
      title: "Design & Build",
      items: [
        { label: "Dimensions", value: specs.dimensions },
        { label: "Weight", value: specs.weight },
        ...(specs.waterResistance
          ? [{ label: "Water Resistance", value: specs.waterResistance }]
          : []),
      ],
    },
    {
      title: "Connectivity",
      items: specs.connectivity.map((item) => ({
        label: item,
        value: "Supported",
      })),
    },
  ];

  const visibleGroups = isExpanded ? specGroups : specGroups.slice(0, 3);

  return (
    <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Specifications
      </h2>

      <div className="space-y-6">
        {visibleGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.05 }}
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex justify-between items-start py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-medium text-right max-w-[60%]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {specGroups.length > 3 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 w-full mt-6 py-3 text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
        >
          {isExpanded ? "Show Less" : "Show All Specifications"}
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isExpanded && "rotate-180"
            )}
          />
        </button>
      )}
    </div>
  );
}
