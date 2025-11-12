import { CollectionResponse } from "../../lib/types";
import Image from "next/image";
import Navigation from "../../components/Navbar";
import Footer from "../../components/Footer";
import RelatedCarousel from "./components/RelatedItems";
import CtaButton from "../../components/CtaButtons"; // ✅ Dodan import

async function getCollection(): Promise<CollectionResponse> {
  const baseUrl =
    typeof window === "undefined"
      ? "http://localhost:3000"
      : window.location.origin;
  const res = await fetch(`${baseUrl}/api/pametno-odabrano/collections`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getCollection();
  const item = data.items.find((i) => i.id === id);

  if (!item) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Proizvod nije pronađen.
      </p>
    );
  }

  // 🔹 Pronađi povezane proizvode prema badgevima
  const relatedByTags = data.items.filter(
    (i) =>
      i.id !== item.id &&
      i.badges?.some((badge) => item.badges?.includes(badge))
  );

  // 🔹 Ako nema dovoljno related, dodaj slučajne
  let related = relatedByTags;
  if (related.length < 6) {
    const fillers = data.items
      .filter((i) => i.id !== item.id && !relatedByTags.includes(i))
      .sort(() => 0.5 - Math.random())
      .slice(0, 6 - relatedByTags.length);
    related = [...related, ...fillers];
  }

  return (
    <main data-testid="item-detail" className="bg-white text-gray-900">
      

      <Footer />
    </main>
  );
}
