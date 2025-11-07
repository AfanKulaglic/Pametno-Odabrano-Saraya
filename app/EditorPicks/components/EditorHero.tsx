"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryData } from "../../lib/types";

interface Props {
  categories: CategoryData[];
}

export default function EditorHero({ categories }: Props) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setTimeout(() => setLoading(false), 700);
    }
  }, [categories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories.length]);

  if (loading || !categories || categories.length === 0) {
    return (
      <section className="relative flex justify-center items-center w-full bg-white pt-2 overflow-hidden">
        <div className="relative w-full max-w-7xl h-[25rem] grid md:grid-cols-3 gap-4 animate-pulse">
          <div className="relative md:col-span-2 h-full overflow-hidden rounded-2xl bg-gray-200"></div>
          <div className="absolute md:relative top-0 right-0 w-[15rem] h-[15rem] md:w-full md:h-full md:col-span-1 rounded-lg overflow-hidden bg-gray-200 z-20 shadow-lg"></div>
        </div>
      </section>
    );
  }

  // 🔹 Priprema slajdera
  const oddItems = categories.filter((_, i) => i % 2 === 0);
  const evenItems = categories.filter((_, i) => i % 2 !== 0);
  const oddIndex = index % oddItems.length;
  const evenIndex = index % evenItems.length;
  const oddCurrent = oddItems[oddIndex];
  const evenCurrent = evenItems[evenIndex];

  return (
    <section className="relative flex flex-col justify-center items-center w-full bg-white pt-2 overflow-hidden space-y-1">
      {/* 🧩 RED 1 — neparni item + reklama */}
      <div className="relative w-full max-w-7xl grid grid-cols-2 md:grid-cols-3 gap-1 w-[20rem] h-auto">
        {/* Lijevo — neparni item */}
        <div className="relative col-span-1 md:col-span-2 h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`odd-${oddIndex}`}
              initial={{ x: 1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -1000, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={
                {
                  backgroundImage: `url('${oddCurrent?.image || "/assets/wallpaper.jpg"}')`,
                } as React.CSSProperties
              }
            >
              <div className="bg-black/40 h-full flex flex-col justify-end md:justify-center px-6 md:px-8 text-white pb-6">
                <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-md">
                  {oddCurrent?.name}
                </h1>
                <p className="text-sm md:text-lg text-gray-200 italic max-w-xl">
                  {oddCurrent?.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desno — reklama */}
        <div className="relative overflow-hidden shadow-lg">
          <img
            src="/assets/add.jpg"
            alt="Reklama"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 🧩 RED 2 — parni item (širina 100%) */}
      <div className="relative w-full max-w-7xl h-[13rem] md:h-[25rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`even-${evenIndex}`}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1000, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={
              {
                backgroundImage: `url('${evenCurrent?.image || "/assets/wallpaper.jpg"}')`,
              } as React.CSSProperties
            }
          >
            <div className="bg-black/40 h-full flex flex-col justify-end px-6 md:px-8 text-white pb-6">
              <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-md">
                {evenCurrent?.name}
              </h1>
              <p className="text-sm md:text-lg text-gray-200 italic max-w-2xl">
                {evenCurrent?.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
