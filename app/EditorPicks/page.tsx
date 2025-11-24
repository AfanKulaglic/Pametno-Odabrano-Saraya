import EditorHero from "./components/EditorHero";
import EditorCards from "./components/EditorialGrid";
import { CollectionResponse } from "../lib/types";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ErrorFallback from "../components/ErrorFallback";
import FixedBanner from "../components/FixedBanner"; 

async function getCollection(): Promise<CollectionResponse> {
  const res = await fetch("https://mocki.io/v1/34fb4328-5523-4758-aaa4-cbc67ab4d806", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Greška pri dohvaćanju kolekcije");
  return res.json();
}

export default async function EditorsPicksPage() {
  try {
    const data = await getCollection();

    // Banner oglas
    const adImage = "/assets/verticalBanner.jpg";

    return (
      <main className="min-h-screen bg-white relative">
        <Navbar />
        <EditorHero categories={data.categories?.flat() || []} />

        {/* 🆕 Banner koji se prikazuje između 800px i 2000px scrolla */}
        <FixedBanner imgUrl={adImage} showAt={800} hideAt={2200} />

        <section className="mx-auto pb-16 bg-white">
          <EditorCards items={data.items} collectionId={data.collection.id} />
        </section>

        <Footer />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <ErrorFallback />
        <Footer />
      </main>
    );
  }
}
