"use client";

import { useEffect, useState } from "react";
import { Item, Brand } from "../../lib/types";
import FeaturedProducts from "./FeaturedProducts";
import ProductGrid from "./ProductGrid";

interface Props {
  items: Item[];
  brand: Brand;
  collectionId?: string;
  category?: string;
}

export default function BrandCards({
  items,
  brand,
  collectionId,
  category,
}: Props) {
  const [loading, setLoading] = useState(true);

  // simulacija loadinga
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const brandItems = items
    .filter((item) => item.company.name === brand.name)
    .sort((a, b) => Math.abs(a.order ?? 0) - Math.abs(b.order ?? 0));

  // 🔹 Dodan data-testid za skeleton
  if (loading) {
    return (
      <section
        data-testid="brandcards-skeleton"
        className="max-w-7xl mx-auto px-6 md:px-10 py-28 bg-white animate-pulse"
      >
        <div className="space-y-40 mb-32">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-1/2 h-[480px] bg-gray-200 rounded-3xl" />
              <div className="md:w-1/2 space-y-4">
                <div className="h-4 bg-gray-200 w-24 rounded"></div>
                <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-200 w-full rounded"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  if (!brandItems.length) {
    return (
      <div className="text-center text-gray-500 py-24">
        Nema proizvoda za brend <strong>{brand.name}</strong>.
      </div>
    );
  }

  const featuredItems = brandItems.slice(0, 2);
  const otherItems = brandItems.slice(2);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 bg-white overflow-hidden">
      <FeaturedProducts items={featuredItems} brand={brand} />
      <ProductGrid
        items={otherItems}
        collectionId={collectionId}
        category={category}
      />
    </section>
  );
}
