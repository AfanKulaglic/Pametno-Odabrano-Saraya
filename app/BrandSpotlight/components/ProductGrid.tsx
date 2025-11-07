"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Item } from "../../lib/types";
import { trackEvent } from "../../lib/analytics";

interface Props {
  items: Item[];
  collectionId?: string;
  category?: string;
}

export default function ProductGrid({ items, collectionId, category }: Props) {
  const categories = Array.from(new Set(items.map((i) => i.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? items.filter((i) => i.category === selectedCategory)
    : items;

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              selectedCategory === null
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } transition`}
          >
            Sve
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredItems.map((item, index) => {
          const pairIndex = Math.floor(index / 2);
          const isEvenRow = pairIndex % 2 === 0;
          const isWide =
            (isEvenRow && index % 2 === 0) ||
            (!isEvenRow && index % 2 === 1);

          const LogoOverlay = item.company?.logo ? (
            <div className="absolute top-3 right-3 bg-white/90 p-1 rounded-full shadow-md">
              <Image
                src={item.company.logo}
                alt={item.company.name}
                width={32}
                height={32}
                className="rounded-full object-contain"
              />
            </div>
          ) : null;

          return (
            <Link
              key={item.id}
              href={`/EditorPicks/${item.id}`}
              onClick={() =>
                trackEvent("category_click", {
                  item_id: item.id,
                  collection_id: collectionId,
                  category,
                })
              }
              className={`relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all hover:scale-[1.02]
              ${isWide ? "md:col-span-2 md:flex-row" : "md:col-span-1"}`}
            >
              <div
                className={`relative ${
                  isWide ? "md:w-2/3" : "h-auto"
                } aspect-[16/10]`}
              >
                <Image
                  src={item.image?.url || "https://dummyimage.com/720x540"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {LogoOverlay}
              </div>

              <div
                className={`relative p-6 flex flex-col justify-center ${
                  isWide ? "md:w-1/3" : ""
                }`}
              >
                <h3 className="text-xl font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-3">
                  {item.long_description || item.short_description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
