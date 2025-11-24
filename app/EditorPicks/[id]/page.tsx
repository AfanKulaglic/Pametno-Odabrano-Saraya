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
  const res = await fetch(`https://mocki.io/v1/34fb4328-5523-4758-aaa4-cbc67ab4d806`, {
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
      <Navigation />

      {/* 🔹 HERO SEKCIJA — kao naslovna stranica magazina */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-whit mt-2">
        <div className="max-w-5xl mx-auto px-6 py-5">
          {/* ✅ kategorija i kompanija */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
            {item.company?.name && (
              <div className="flex items-center gap-2">
                {item.company.logo && (
                  <Image
                    src={item.company.logo}
                    alt={item.company.name}
                    width={30}
                    height={30}
                    className="rounded-full border border-gray-200"
                  />
                )}
                <a
                  href={item.company.marketplace_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-indigo-600 transition"
                >
                  {item.company.name}
                </a>
              </div>
            )}

            {item.category && (
              <>
                <span className="text-gray-300">•</span>
                <span className="uppercase tracking-widest text-xs font-semibold text-indigo-600">
                  {item.category}
                </span>
              </>
            )}
          </div>

          {/* ✅ naslov i podnaslov */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight text-gray-900 mb-4">
            {item.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-5 max-w-3xl">
            {item.short_description ||
              "Ekskluzivni pogled na inovativni uređaj koji mijenja način na koji doživljavamo tehnologiju i svakodnevni život."}
          </p>

          {/* ✅ hero slika kao "editorial" */}
          <div className="relative w-full h-[30rem] md:h-[36rem] mt-5 mb-4 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={item.image?.url || "https://dummyimage.com/1280x720"}
              alt={item.image?.alt || item.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* ✅ dodatni elementi ispod slike */}
          {item.badges && item.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 🔹 TEKSTUALNI DIO — kao članak iz magazina */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-16 leading-relaxed text-lg text-gray-800">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-700 first-letter:mr-2">
          {item.long_description ||
            "Ovaj proizvod predstavlja novo poglavlje u svijetu tehnologije i dizajna. Kombinujući sofisticirane materijale i napredne funkcije, donosi iskustvo koje inspiriše svakodnevni život."}
        </p>

        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={item.image?.url || "https://dummyimage.com/1200x700"}
            alt={item.image?.alt || item.title}
            fill
            className="object-cover"
          />
        </div>

        <p>
          Kreiran s fokusom na korisničko iskustvo, {item.title} redefiniše
          granice upotrebljivosti i estetike. Njegova pažljivo izrađena forma
          donosi ravnotežu između snage, udobnosti i intuitivne upotrebe.
        </p>

        <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-gray-600 text-xl">
          “Neki proizvodi ne mijenjaju samo način na koji živimo – već način na
          koji razmišljamo o svakodnevici.”
        </blockquote>

        <p>
          Kroz inovativan pristup i pažnju prema detaljima, ovaj uređaj
          simbolizuje smjer u kojem se moderna tehnologija kreće – prema
          inteligentnijim, efikasnijim i održivijim rješenjima.
        </p>

        {item.key_features && item.key_features.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
              Ključne karakteristike
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {item.key_features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* ✅ CTA dugme */}
        {item.cta?.url && (
          <CtaButton
            url={item.cta.url}
            itemId={item.id}
            companyId={item.company.id}
            collectionId={data.collection.id}
          />
        )}
      </article>

      {/* 🔹 POVEZANI PROIZVODI */}
      <section className="bg-gray-50 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Preporučujemo dalje
          </h2>
          <RelatedCarousel related={related} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
