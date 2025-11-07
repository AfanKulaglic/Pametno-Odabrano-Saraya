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

export default function Featured({ featuredItems, collectionId, loading }: Props) {
  return (
    <div className="rounded-3xl text-gray-900">
      {/* NASLOV BLOKA */}
      <div className="mb-10">
        <h2 className="text-4xl text-indigo-800 font-extrabold uppercase border-b-2 border-indigo-900 inline-block pb-2">
          Istaknuto
        </h2>
        <p className="text-indigo-700/80 mt-3 text-lg max-w-2xl">
          Najnoviji izbor inovativnih proizvoda — urednički odabir.
        </p>
      </div>

      {/* LOADING PLACEHOLDER */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
          <div className="animate-pulse bg-gray-200 rounded-3xl md:row-span-2 md:col-span-2 h-206" />
          <div className="animate-pulse bg-gray-200 rounded-3xl md:col-span-2 h-44" />
          <div className="animate-pulse bg-gray-200 rounded-3xl md:col-span-1 h-44" />
          <div className="animate-pulse bg-gray-200 rounded-3xl md:col-span-1 h-44" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
          {featuredItems.slice(0, 4).map((item, index) => {
            const layoutClass =
              index === 0
                ? "md:row-span-2 md:col-span-2 h-206" // glavna vijest
                : index === 1
                ? "md:col-span-2 h-44" // široka gornja
                : "md:col-span-1 h-44"; // manje priče

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
                className={`relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:scale-[1.03] ${layoutClass}`}
              >
                {/* SLIKA */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image?.url || "/assets/logosaraya-1.png"}
                    alt={item.image?.alt || item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay za tekst */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3
                      className={`${
                        index === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                      } font-bold text-white drop-shadow-lg mb-2`}
                    >
                      {item.title}
                    </h3>
                    {index === 0 && (
                      <p className="text-base md:text-lg text-white/80 line-clamp-2">
                        {item.short_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Badge-i */}
                {item.badges?.length && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="bg-indigo-700/90 text-white text-[11px] uppercase font-semibold px-3 py-1 rounded-full shadow-sm border border-white/20"
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
