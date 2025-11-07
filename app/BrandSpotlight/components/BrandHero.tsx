"use client";

import Image from "next/image";
import { Brand } from "../../lib/types";

interface Props {
  brand: Brand;
}

export default function BrandHero({ brand }: Props) {
  if (!brand) {
    return (
      <div className="bg-white text-gray-900 text-center py-32">
        <p>Učitavanje brenda...</p>
      </div>
    );
  }

  return (
    <section className="relative bg-white w-full py-16 lg:pl-4 md:pl-4 pb-0 overflow-hidden">
      {/* POZADINSKI LOGO */}
      <div
        id="brand-bg-logo"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${brand.logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          opacity: 0.08,
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* RESPONSIVE STILOVI */}
      <style>{`
        @media (max-width: 768px) {
          #brand-bg-logo {
            background-size: 50vh;
            background-position: right center;
            margin-right: -35%;
          }
        }
        @media (min-width: 768px) {
          #brand-bg-logo {
            background-size: 30%;
          }
        }
      `}</style>

      {/* SADRŽAJ */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 gap-8">
        {/* TEKST */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {brand.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            {brand.description}
          </p>

          <a
            href={brand.marketplace_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block lg:mb-16 bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
            >
            Posjeti brend na Saraya
          </a>
        </div>
      </div>
    </section>
  );
}
