"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Item } from "../../lib/types";
import { trackEvent } from "../../lib/analytics";

interface Props {
  items: Item[];
  collectionId: string;
}

export default function EditorialGrid({ items, collectionId }: Props) {
  const [loading, setLoading] = useState(true);

  // Simulacija kratkog loadinga za skeleton (UX efekt)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!items?.length && !loading) return null;

  // ✅ Helper funkcija za sortiranje po order (bliže 0 ima prednost)
  const sortByOrder = (a: Item, b: Item) => {
    const orderA = a.order ?? 9999;
    const orderB = b.order ?? 9999;
    return Math.abs(orderA) - Math.abs(orderB);
  };

  // ✅ Featured i sortiranje po order
  const featuredItems = items
    .filter((item) => item.featured === true)
    .sort(sortByOrder);

  // ✅ Kategorije sortirane po order unutar svake kategorije
  const categories = Array.from(
    new Set(items.map((item) => item.category || "Ostalo"))
  );

  // 🩶 Skeleton tekst linije (imitacija sadržaja)
const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2 mt-4">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-3 bg-gray-300 rounded ${
          i === lines - 1 ? "w-4/5" : "w-full"
        }`}
      ></div>
    ))}
  </div>
);

// 🩶 Skeleton kartica za featured sekciju
const SkeletonCard = ({ large = false }: { large?: boolean }) => (
  <div
    className={`animate-pulse rounded-3xl overflow-hidden flex flex-col md:flex-row ${
      large ? "h-96 md:col-span-2" : "h-80"
    } bg-gray-100`}
  >
    <div className="w-full md:w-1/2 bg-gray-300 h-full"></div>
    <div className="flex flex-col justify-center p-6 md:w-1/2">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
      <SkeletonText lines={4} />
    </div>
  </div>
);

// 🩶 Skeleton kartica za kategorije
const SkeletonCategoryCard = () => (
  <div className="animate-pulse bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-3"></div>
      <SkeletonText lines={3} />
    </div>
  </div>
);


  return (
    <section className="bg-white text-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-4 space-y-24">
        {/* 🔹 FEATURED SEKCIJA */}
        <div className="rounded-3xl text-white">
          <div className="mb-10">
            <h2 className="text-4xl font-bold uppercase border-b-2 border-white inline-block pb-2 text-indigo-900/90">
              Istaknuto
            </h2>
            <p className="text-indigo-700/70 mt-3 text-lg max-w-2xl">
              Odabrani proizvodi koji ističu inovacije i dizajn.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <SkeletonCard large />
              <SkeletonCard />
            </div>
          ) : (
            featuredItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {featuredItems.map((item, index) => {
                  const isFirst = index === 0;
                  return (
                    <Link
                      prefetch={true}
                      key={item.id}
                      href={`/EditorPicks/${item.id}`}
                      onClick={() =>
                        trackEvent("featured_click", {
                          item_id: item.id,
                          collection_id: collectionId,
                          position: index + 1,
                        })
                      }
                      className={`relative group flex flex-col md:flex-row items-center rounded-3xl overflow-hidden bg-indigo-900/60 hover:bg-indigo-800/70 border border-indigo-400/30 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${
                        isFirst ? "md:col-span-2" : ""
                      }`}
                    >
                      {/* ✅ Slika */}
                      <div
                        className={`relative w-full ${
                          isFirst ? "md:w-1/2" : "md:w-full"
                        } h-80 md:h-96 overflow-hidden`}
                      >
                        <Image
                          src={
                            item.image?.url || "https://dummyimage.com/1280x720"
                          }
                          alt={item.image?.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {item.badges?.length ? (
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {item.badges.map((badge) => (
                              <span
                                key={badge}
                                className="bg-indigo-500/90 text-white text-[11px] uppercase font-semibold px-3 py-1 rounded-full tracking-wide shadow-sm border border-white/20"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {/* ✅ Logo firme */}
                      {item.company?.logo && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-md">
                          <Image
                            src={item.company.logo}
                            alt={item.company.name}
                            width={36}
                            height={36}
                            className="rounded-full object-contain"
                          />
                        </div>
                      )}

                      {/* ✅ Tekstualni deo */}
                      <div
                        className={`relative flex flex-col justify-center p-8 text-center md:text-left ${
                          isFirst ? "md:w-1/2" : "md:w-full"
                        }`}
                      >
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-indigo-200 transition-colors">
                          {item.title}
                        </h3>
                        {item.long_description && (
                          <p className="text-indigo-100 text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                            {item.long_description}
                            <br />
                            {item.short_description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* 🔹 KATEGORIJE SEKCIJE */}
        {categories.map((category) => {
          const categoryItems = items
            .filter((i) => (i.category || "Ostalo") === category)
            .sort(sortByOrder);

          if (!categoryItems.length && !loading) return null;

          return (
            <div key={category}>
              <h2 className="text-3xl font-bold uppercase border-b-2 border-gray-900 inline-block mb-10 pb-1">
                {category}
              </h2>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <SkeletonCategoryCard />
                  <SkeletonCategoryCard />
                  <SkeletonCategoryCard />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {categoryItems.map((item, index) => {
                    const layout = index % 4;

                    const LogoOverlay = item.company?.logo ? (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-md">
                        <Image
                          src={item.company.logo}
                          alt={item.company.name}
                          width={32}
                          height={32}
                          className="rounded-full object-contain"
                        />
                      </div>
                    ) : null;

                    // ⚙️ Ostalo netaknuto
                    switch (layout) {
                      // 🔸 Širi horizontalni prikaz
                      case 0:
                        return (
                          <Link
                            prefetch={true}
                            key={item.id}
                            href={`/EditorPicks/${item.id}`}
                            onClick={() =>
                              trackEvent("category_click", {
                                item_id: item.id,
                                collection_id: collectionId,
                                category,
                              })
                            }
                            className="relative col-span-1 md:col-span-2 flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all hover:scale-[1.02]"
                          >
                            <div className="relative w-full md:w-1/1 h-60 md:h-auto">
                              <Image
                                src={
                                  item.image?.url ||
                                  "https://dummyimage.com/720x540"
                                }
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                              {item.badges?.length ? (
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
                              ) : null}
                            </div>
                            <div className="relative p-6 flex flex-col justify-center">
                              {LogoOverlay}
                              <h3 className="text-xl font-semibold mb-2">
                                {item.title}
                              </h3>
                              <p className="text-gray-700 mb-3">
                                {item.long_description}
                                <br />
                              </p>
                            </div>
                          </Link>
                        );

                      // 🔸 Klasična kartica
                      case 1:
                        return (
                          <Link
                            prefetch={true}
                            key={item.id}
                            href={`/EditorPicks/${item.id}`}
                            onClick={() =>
                              trackEvent("category_click", {
                                item_id: item.id,
                                collection_id: collectionId,
                                category,
                              })
                            }
                            className="relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all hover:scale-[1.02]"
                          >
                            <div className="relative h-64">
                              <Image
                                src={
                                  item.image?.url ||
                                  "https://dummyimage.com/720x540"
                                }
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                              {LogoOverlay}
                            </div>
                            <div className="relative p-5">
                              <h3 className="text-lg font-semibold mb-2">
                                {item.title}
                              </h3>
                              <p className="text-gray-700 text-sm line-clamp-4">
                                {item.short_description}
                              </p>
                            </div>
                          </Link>
                        );

                      // 🔸 Sivi tekstualni blok
                      case 2:
                        return (
                          <div
                            key={item.id}
                            className="col-span-1 md:col-span-3 bg-gray-100 border border-gray-200 rounded-2xl p-10 flex flex-col justify-center"
                          >
                            <h3 className="text-3xl font-bold mb-4 text-indigo-700">
                              {category}: Fokus na inovacije
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg max-w-5xl">
                              U ovoj kategoriji istražujemo proizvode koji pomiču
                              granice dizajna i funkcionalnosti. Svaki od njih
                              donosi priču o kreativnosti, tehnologiji i viziji
                              budućnosti.
                            </p>
                          </div>
                        );

                      // 🔸 Vizualna hero kartica
                      default:
                        return (
                          <Link
                            prefetch={true}
                            key={item.id}
                            href={`/EditorPicks/${item.id}`}
                            onClick={() =>
                              trackEvent("category_click", {
                                item_id: item.id,
                                collection_id: collectionId,
                                category,
                              })
                            }
                            className="relative rounded-2xl overflow-hidden h-80 group hover:scale-[1.02] transition-transform duration-500"
                          >
                            <Image
                              src={
                                item.image?.url ||
                                "https://dummyimage.com/720x540"
                              }
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 relative">
                              {LogoOverlay}
                              <h3 className="text-white text-2xl font-bold mb-2">
                                {item.title}
                              </h3>
                              <p className="text-gray-200 text-sm line-clamp-3">
                                {item.short_description}
                              </p>
                            </div>
                          </Link>
                        );
                    }
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
