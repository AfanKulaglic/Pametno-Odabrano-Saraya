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
  const [screenType, setScreenType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // ✅ Provjera širine ekrana
  useEffect(() => {
    const checkScreenSize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setScreenType("desktop");
      else if (w >= 768) setScreenType("tablet");
      else setScreenType("mobile");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Scroll logika samo za desktop
  useEffect(() => {
    if (screenType !== "desktop") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY >= showAt && scrollY <= hideAt);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [screenType, showAt, hideAt]);

  // 🔹 Mobile / Tablet prikaz (inline)
  if (screenType !== "desktop") {
    return (
      <div className="w-full flex justify-center my-6 px-4">
        <img
          src={imgUrl}
          alt="Ad Banner"
          className={`rounded-xl shadow-lg border border-gray-200 object-cover ${
            screenType === "tablet" ? "w-[25vh] max-w-lg" : "w-[19vh] max-w-md"
          }`}
        />
      </div>
    );
  }

  // 🔹 Desktop prikaz (fixed)
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
