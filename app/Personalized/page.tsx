"use client";

import { useState, useEffect } from "react";
import PersonalizedHero from "./components/PersonalizedHero";
import EditorCards from "../EditorPicks/components/EditorialGrid";
import { CollectionResponse } from "../lib/types";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ErrorFallback from "../components/ErrorFallback";

async function getCollection(isLoggedIn: boolean): Promise<CollectionResponse> {
  const endpoint = isLoggedIn
    ? "http://localhost:3000/api/pametno-odabrano/loggedin"
    : "https://mocki.io/v1/4c30025f-7f69-421b-8c42-4259106713d4";

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Greška pri dohvaćanju kolekcije");
  return res.json();
}

export default function Personalized() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [data, setData] = useState<CollectionResponse | null>(null);
  const [hasError, setHasError] = useState(false);

  const isLoggedIn = false;

  useEffect(() => {
    getCollection(isLoggedIn)
      .then(setData)
      .catch(() => setHasError(true));
  }, [isLoggedIn]);

  // prikaži fallback
  if (hasError) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <ErrorFallback />
        <Footer />
      </main>
    );
  }

  // Skeleton
  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="py-32 container mx-auto animate-pulse">
          <div className="h-6 bg-gray-200 w-1/3 mb-6 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-60 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const label = isLoggedIn
    ? "Preporučeno za tebe"
    : "Popularno — prikazano jer nisi prijavljen";

  const tooltipText = isLoggedIn
    ? "Ove preporuke su generisane na osnovu tvojih pregleda i interesa."
    : "Prikazani su popularni proizvodi jer nisi prijavljen.";

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />

      {/* Info ikonica */}
      <div className="absolute top-[170px] left-0 w-full z-50">
        <div className="container mx-auto px-4 flex justify-end">
          <div className="relative">
            <button
              onClick={() => setTooltipVisible((prev) => !prev)}
              className="cursor-pointer text-gray-600 hover:text-gray-800 text-sm font-bold border border-gray-400 rounded-full w-6 h-6 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-sm z-50"
              aria-label="Informacije o preporukama"
            >
              i
            </button>

            {tooltipVisible && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setTooltipVisible(false)}
                />
                <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded-md px-3 py-2 whitespace-nowrap z-50 shadow-lg transition-all duration-300">
                  {tooltipText}
                  <div className="absolute right-3 -top-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero sekcija */}
      <PersonalizedHero items={data.items} />

      {/* Grid sekcija */}
      <section id="grid" className="mx-auto pb-16 bg-white">
        <EditorCards items={data.items} collectionId={data.collection.id} />
      </section>

      <Footer />
    </main>
  );
}
