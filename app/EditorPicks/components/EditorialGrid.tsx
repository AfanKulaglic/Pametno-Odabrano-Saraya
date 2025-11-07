"use client";

import { useState, useEffect } from "react";
import { Item } from "../../lib/types";
import FeaturedGrid from "./Featured";
import CategoryGrid from "./Category";

interface Props {
  items: Item[];
  collectionId: string;
}

export default function EditorialGrid({ items, collectionId }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!items?.length && !loading) return null;

  const sortByOrder = (a: Item, b: Item) => {
    const orderA = a.order ?? 9999;
    const orderB = b.order ?? 9999;
    return Math.abs(orderA) - Math.abs(orderB);
  };

  const featuredItems = items
    .filter((item) => item.featured === true)
    .sort(sortByOrder);

  const categories = Array.from(
    new Set(items.map((item) => item.category || "Ostalo"))
  );

  return (
    <section className="bg-white text-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-4 space-y-24">
        <FeaturedGrid
          featuredItems={featuredItems}
          collectionId={collectionId}
          loading={loading}
        />

        {categories.map((category) => {
          const categoryItems = items
            .filter((i) => (i.category || "Ostalo") === category)
            .sort(sortByOrder);

          return (
            <CategoryGrid
              key={category}
              category={category}
              categoryItems={categoryItems}
              collectionId={collectionId}
              loading={loading}
            />
          );
        })}
      </div>
    </section>
  );
}
