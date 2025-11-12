"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Item } from "../../lib/types";
import { trackEvent } from "../../lib/analytics";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  category: string;
  categoryItems: Item[];
  collectionId: string;
  loading: boolean;
}

const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2 mt-4">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-3 bg-gray-300 rounded ${i === lines - 1 ? "w-4/5" : "w-full"}`}
      ></div>
    ))}
  </div>
);

const SkeletonCategoryCard = () => (
  <div className="animate-pulse bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-3"></div>
      <SkeletonText lines={3} />
    </div>
  </div>
);


export default function CategoryGrid({
  category,
  categoryItems,
  collectionId,
  loading,
}: Props) {
  const [startIndex, setStartIndex] = useState(0);


  if (!categoryItems.length && !loading) return null;

  // 🔹 Odredi koji itemi će se trenutno prikazati
  const visibleItems =
    categoryItems.length <= 3
      ? categoryItems
      : [
        ...categoryItems.slice(startIndex, startIndex + 3),
        ...(startIndex + 3 > categoryItems.length
          ? categoryItems.slice(0, (startIndex + 3) % categoryItems.length)
          : []),
      ];

  const totalItems = visibleItems.length;

  useEffect(() => {
  if (categoryItems.length <= 3) return;

  const cards = document.querySelectorAll(".category-card");

  const triggerFlip = (direction: "next" | "prev" = "next") => {
  if (categoryItems.length <= 3) return;
  
  const cards = document.querySelectorAll(".category-card");
  
  // Dodaj klasu za animaciju
  cards.forEach((card) => card.classList.add("flip-animate"));
  
  // Promijeni startIndex nakon pola animacije
  setTimeout(() => {
    setStartIndex((prev) =>
      direction === "next"
        ? (prev + 3) % categoryItems.length
        : (prev - 3 + categoryItems.length) % categoryItems.length
    );
  }, 350);
  
  // Ukloni klasu nakon animacije
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip-animate"));
  }, 700);
};


  // Pokreni automatski flip na intervalu
  const interval = setInterval(triggerFlip, 5000);

  return () => clearInterval(interval);
}, [categoryItems.length]);


  return (
    <div>
      <div className="flex items-center justify-between mb-10">
  <h2 className="text-3xl font-bold uppercase border-b-2 border-gray-900 inline-block pb-1">
    {category}
  </h2>

  {/* Strelice */}
  <div className="flex space-x-3">
    <button
      onClick={() =>
        setStartIndex((prev) =>
          (prev - 3 + categoryItems.length) % categoryItems.length
        )
      }
      className="cursor-pointer bg-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
    >
      <FaChevronLeft className="text-white text-lg" />
    </button>
    <button
      onClick={() =>
        setStartIndex((prev) => (prev + 3) % categoryItems.length)
      }
      className="cursor-pointer bg-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
    >
      <FaChevronRight className="text-white text-lg" />
    </button>
  </div>
</div>


      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <SkeletonCategoryCard />
          <SkeletonCategoryCard />
          <SkeletonCategoryCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 transition-all duration-700">
          {visibleItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === totalItems - 1;
            const LogoOverlay = item.company?.logo ? (
              <div data-testid="collection-item" className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-md">
                <Image
                  src={item.company.logo}
                  alt={item.company.name}
                  width={32}
                  height={32}
                  className="rounded-full object-contain"
                />
              </div>
            ) : null;

            // PRVA kartica
            if (isFirst) {
              return (
                <Link
                  key={item.id}
                  prefetch={true}
                  href={`/EditorPicks/${item.id}`}
                  onClick={() =>
                    trackEvent("category_click", {
                      item_id: item.id,
                      collection_id: collectionId,
                      category,
                    })
                  }
                  className="flip-animate relative col-span-1 md:col-span-2 flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <div className="relative w-full md:w-2/3 h-60 md:h-auto">
                    <Image
                      src={item.image?.url || "/assets/logosaraya-1.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {item.badges?.length && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="bg-indigo-600 text-white text-[11px] uppercase font-semibold px-3 py-1 rounded-full border border-white/20"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative p-6 flex flex-col justify-center md:w-1/3">
                    {LogoOverlay}
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-3">{item.long_description}</p>
                  </div>
                </Link>
              );
            }

            // POSLJEDNJA kartica
            if (isLast && totalItems === 3) {
              return (
                <Link
                  key={item.id}
                  prefetch={true}
                  href={`/EditorPicks/${item.id}`}
                  onClick={() =>
                    trackEvent("category_click", {
                      item_id: item.id,
                      collection_id: collectionId,
                      category,
                    })
                  }
                  className="flip-animate relative col-span-1 md:col-span-3 flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <div className="relative w-full h-60 md:h-100">
                    <Image
                      src={item.image?.url || "/assets/logosaraya-1.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    {item.badges?.length && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="bg-indigo-600 text-white text-[11px] uppercase font-semibold px-3 py-1 rounded-full border border-white/20"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                    {LogoOverlay}
                  </div>
                  <div className="relative p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-3">{item.short_description}</p>
                  </div>
                </Link>
              );
            }

            // Ostale kartice
            return (
              <Link
                key={item.id}
                prefetch={true}
                href={`/EditorPicks/${item.id}`}
                onClick={() =>
                  trackEvent("category_click", {
                    item_id: item.id,
                    collection_id: collectionId,
                    category,
                  })
                }
                className="flip-animate relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image?.url || "/assets/logosaraya-1.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                    {item.badges?.length && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="bg-indigo-600 text-white text-[11px] uppercase font-semibold px-3 py-1 rounded-full border border-white/20"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  {LogoOverlay}
                </div>
                <div className="relative p-5">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm line-clamp-4">
                    {item.short_description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
