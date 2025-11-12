import BrandHero from "./components/BrandHero";
import EditorCards from "./components/BrandCards";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CollectionResponse } from "../lib/types";
import ErrorFallback from "../components/ErrorFallback";
import FixedBanner from "../components/FixedBanner";

async function getCollection(): Promise<CollectionResponse> {
  const res = await fetch("https://mocki.io/v1/1f204200-7e0b-47fa-8a76-3ce97a3ecfd8", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Greška pri dohvaćanju kolekcije");
  return res.json();
}

export default async function EditorsPicksPage() {
  try {
    const data = await getCollection();
    const activeBrand = data.brands?.[0];

    const adImage = "/assets/verticalBanner1.jpg";

    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        {activeBrand && <BrandHero brand={activeBrand} />}
        {activeBrand && (
          <section id="grid" className="mx-auto pb-16 bg-white">
            <EditorCards items={data.items} brand={activeBrand} />
            <FixedBanner imgUrl={adImage} showAt={800} hideAt={2200} />
          </section>
        )}
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
