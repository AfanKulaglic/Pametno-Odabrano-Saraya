"use client";

import Image from "next/image";
import Link from "next/link";
import { Item } from "../../lib/types";
import { trackEvent } from "../../lib/analytics";

interface Props {
  featuredItems: Item[];
  collectionId: string;
  loading: boolean;
}

export default function FeaturedGrid({ featuredItems, collectionId, loading }: Props) {
  return (
    <div className="rounded-3xl text-white">
      <div className="mb-10">
        <h2 className="text-4xl text-indigo-700/80 font-bold uppercase border-b-2 border-indigo-900 inline-block pb-2">
          Istaknuto
        </h2>
        <p className="text-indigo-700/80 mt-3 text-lg max-w-2xl">
          Odabrani proizvodi koji ističu inovacije i dizajn.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          <div className="animate-pulse bg-gray-200 rounded-3xl md:row-span-2 md:col-span-2 h-206" />
          <div className="animate-pulse bg-gray-200 rounded-3xl h-99" />
          <div className="animate-pulse bg-gray-200 rounded-3xl h-99" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {featuredItems.slice(0, 3).map((item, index) => {
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
                className={`
                  relative group rounded-3xl overflow-hidden shadow-2xl
                  transition-transform duration-500 hover:scale-105
                  ${isFirst ? "md:row-span-2 md:col-span-2 h-80 md:h-206" : "h-64 md:h-full"}
                `}
              >
                {/* SLIKA */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image?.url || "/assets/logosaraya-1.png"}
                    alt={item.image?.alt || item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay za tekst */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/80">
                      {item.short_description}
                    </p>
                  </div>
                </div>

                {/* Badge-i */}
                {item.badges?.length && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.badges.map(badge => (
                      <span
                        key={badge}
                        className="bg-indigo-600/90 text-white text-[11px] uppercase font-semibold px-3 py-1 rounded-full shadow-sm border border-white/20"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Logo kompanije */}
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
