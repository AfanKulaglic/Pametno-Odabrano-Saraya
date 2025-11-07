"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FixedBannerProps {
  imgUrl: string;
  showAt?: number; // scrollY kada počinje
  hideAt?: number; // scrollY kada nestaje
}

export default function FixedBanner({
  imgUrl,
  showAt = 800,
  hideAt = 2000,
}: FixedBannerProps) {
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // ✅ Provjera širine ekrana — desktop vs mobilni
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Scroll logika — samo za desktop prikaz
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY >= showAt && scrollY <= hideAt);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop, showAt, hideAt]);

  // 🔹 MOBILNI / TABLET prikaz (inline)
  if (!isDesktop) {
    return (
      <div className="w-full flex justify-center my-6 px-4">
        <img
          src={imgUrl}
          alt="Ad Banner"
          className="w-full max-w-md rounded-xl shadow-lg border border-gray-200 object-cover"
        />
      </div>
    );
  }

  // 🔹 DESKTOP prikaz (fixed)
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="fixed-banner"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-1/2 right-4 -translate-y-1/2 z-50"
        >
          <img
            src={imgUrl}
            alt="Ad Banner"
            className="w-72 h-auto rounded-xl shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
