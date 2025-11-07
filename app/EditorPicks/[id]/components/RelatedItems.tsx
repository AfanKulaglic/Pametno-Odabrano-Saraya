"use client";

import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Item } from "../../../lib/types";
import { trackEvent } from "../../../lib/analytics";

interface RelatedCarouselProps {
  related: Item[];
}

const RelatedCarousel = ({ related }: RelatedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

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
    setCurrentIndex((prevIndex) =>
      prevIndex >= related.length - itemsPerView ? 0 : prevIndex + 1
    );
  }, [related.length, itemsPerView]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? related.length - itemsPerView : prevIndex - 1
    );
  }, [related.length, itemsPerView]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 6000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const translatePercent = 100 / itemsPerView;

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4 py-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="region"
      aria-label="Srodni proizvodi"
    >
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * translatePercent}%)`,
          }}
        >
          {related.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 px-2 md:px-4 ${
                itemsPerView === 1 ? "w-full" : "w-1/3"
              }`}
            >
              <Link
                href={`/EditorPicks/${item.id}`}
                onClick={() =>
                  trackEvent("related_story_click", {
                    item_id: item.id,
                    concept: "related",
                  })
                }
                className="group relative flex flex-col overflow-hidden rounded-3xl shadow-sm hover:shadow-lg transition border border-gray-200 bg-white h-full"
              >
                {/* 🔹 Logo kompanije u vrhu desno */}
                {item.company?.logo && (
                  <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                    <Image
                      src={item.company.logo}
                      alt={item.company.name}
                      width={40}
                      height={40}
                      className="object-contain rounded-full"
                    />
                  </div>
                )}

                {/* Slika proizvoda */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={item.image?.url || "https://dummyimage.com/720x540"}
                    alt={item.image?.alt || item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badges */}
                  {item.badges?.length ? (
                    <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
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
                </div>

                {/* Magazin opis */}
                <div className="flex flex-col flex-1 p-6 text-gray-800">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-indigo-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed line-clamp-6">
                    {item.long_description ||
                      item.short_description ||
                      "Detalji o ovom proizvodu bit će uskoro dostupni."}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Strelice */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-800 p-3 rounded-full shadow-lg hover:bg-neutral-700 transition-colors"
        aria-label="Prethodni"
      >
        <FaChevronLeft className="text-white text-xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-800 p-3 rounded-full shadow-lg hover:bg-neutral-700 transition-colors"
        aria-label="Sljedeći"
      >
        <FaChevronRight className="text-white text-xl" />
      </button>

      {/* Navigacione tačke */}
      <div className="flex justify-center mt-8 space-x-2">
        {related.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-indigo-600" : "bg-gray-400"
            }`}
            aria-label={`Idi na ${index + 1}. slajd`}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedCarousel;
