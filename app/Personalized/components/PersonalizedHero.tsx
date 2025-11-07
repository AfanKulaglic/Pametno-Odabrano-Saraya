"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegBookmark,
  FaShareAlt,
} from "react-icons/fa";
import { Item } from "../../lib/types";
import { trackEvent } from "../../lib/analytics";

interface PersonalizedHeroProps {
  items: Item[];
}

export default function PersonalizedHero({ items }: PersonalizedHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const sortedItems = [
    ...items.filter((item) => item.featured),
    ...items
      .filter((item) => !item.featured)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  ];

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else setItemsPerView(3);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedItems.length);
  }, [sortedItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sortedItems.length - 1 : prevIndex - 1
    );
  }, [sortedItems.length]);

  const translatePercent = 100 / itemsPerView;

  const getRating = (ranking_score?: number): number | null => {
    if (!ranking_score) return null;
    return Math.round(ranking_score * 5);
  };

  const SkeletonCard = () => (
    <div
      className={`flex-shrink-0 px-3 ${itemsPerView === 1 ? "w-full" : "w-1/3"
        }`}
    >
      <div className="animate-pulse flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-200 h-full">
        <div className="relative h-64 sm:h-72 w-full bg-gray-200" />
        <div className="flex flex-col flex-1 p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="mt-auto space-y-2">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-5 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-gray-50 pb-5">
      <div className="container mx-auto px-4">

        {/* 🔹 Strelice iznad karusela, centrirane */}
        {!loading && (
          <div className="flex justify-start items-center gap-4 pt-4 mb-4">
            <button
              onClick={prevSlide}
              className="cursor-pointer bg-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
              aria-label="Prethodni"
            >
              <FaChevronLeft className="text-white text-lg" />
            </button>
            <button
              onClick={nextSlide}
              className="cursor-pointer bg-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
              aria-label="Sljedeći"
            >
              <FaChevronRight className="text-white text-lg" />
            </button>
          </div>
        )}

        {/* 🔹 Sam carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * translatePercent}%)`,
            }}
          >
            {loading
              ? Array.from({ length: itemsPerView * 2 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
              : sortedItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 px-3 ${itemsPerView === 1 ? "w-full" : "w-1/3"
                    }`}
                >
                  <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-lg transition h-full border border-gray-200">
                    {item.company?.logo && (
                      <div className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md">
                        <Image
                          src={item.company.logo}
                          alt={item.company.name}
                          width={35}
                          height={35}
                          className="object-contain rounded-full"
                        />
                      </div>
                    )}

                    <Link
                      href={item.cta?.url || "#"}
                      onClick={() =>
                        trackEvent("hero_item_click", {
                          item_id: item.id,
                          concept: "hero_carousel",
                        })
                      }
                      target="_blank"
                      className="relative h-64 sm:h-72 w-full overflow-hidden block"
                    >
                      <Image
                        src={
                          item.image?.url || "https://dummyimage.com/720x540"
                        }
                        alt={item.image?.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {item.badges?.length ? (
                        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                          {item.badges.map((badge) => (
                            <span
                              key={badge}
                              className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </Link>

                    <div className="flex flex-col flex-1 p-6 text-gray-800">
                      <h3 className="text-2xl font-semibold mb-3 group-hover:text-indigo-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-base leading-relaxed line-clamp-4 mb-4">
                        {item.long_description ||
                          item.short_description ||
                          "Detalji o ovom proizvodu bit će uskoro dostupni."}
                      </p>
                      <div className="mt-auto">
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
                          Preporučeno jer korisnik nije prijavljen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 🔹 Dots ispod */}
        {!loading && (
          <div className="flex justify-center mt-8 space-x-2">
            {sortedItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? "bg-indigo-600" : "bg-gray-400"
                  }`}
                aria-label={`Idi na ${index + 1}. slajd`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
