"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDate(now.toLocaleDateString("hr-HR", options));
  }, []);

  return (
    <header className="bg-white w-full overflow-hidden">
      <div className="mx-auto">

        {/* Traka sa logotipom sa pozadinskom slikom */}
        <div
          className="h-[10vh] flex items-center justify-center rounded-b-lg bg-cover bg-center"
          style={{ background:'black' }}
        >
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/assets/logosaraya-1.png"
              alt="Logo"
              width={180}
              height={180}
              className="object-contain"
            />
          </Link>
        </div>

        <hr className="border-t border-gray-300 mb-2" />

        <div className="bg-gray-100 overflow-hidden whitespace-nowrap border-t border-gray-200">
          <div className="inline-block animate-marquee text-gray-800 font-medium text-sm py-2">
            🔹 Novo izdanje kolekcije "Pametno odabrano" je dostupno sada! 🔹
            Ekskluzivni savjeti o stilu i dizajnu svakog dana! 🔹
            Istražite naše preporuke urednika i pronađite inspiraciju! 🔹
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </header>
  );
}
