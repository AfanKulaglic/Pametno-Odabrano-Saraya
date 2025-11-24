"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const handleOpen = (type) => {
    if (type === "privacy") {
      setModalTitle("Politika privatnosti");
      setModalContent(`
Saraya – Pametno Odabrano posvećena je zaštiti privatnosti svojih korisnika. 
Sve informacije koje prikupljamo koriste se isključivo radi unapređenja 
kvaliteta usluge, sigurnosti platforme i pružanja relevantnih sadržaja 
u skladu s vašim interesima.

Podaci koje možemo prikupljati uključuju osnovne tehničke informacije 
(podaci o uređaju, pregledniku, IP adresi), informacije o interakciji 
s platformom (posjećene lokacije, kategorije, poslovnice, oglasi), kao i 
dobrovoljno dostavljene informacije kroz forme, prijave i komunikaciju.

Podaci se koriste za:
• poboljšanje funkcionalnosti i stabilnosti platforme  
• prikaz relevantnog i personalizovanog sadržaja  
• analitiku i mjerenje performansi  
• prevenciju zloupotreba i sigurnosne provjere  
• tehničku podršku korisnicima  

Saraya ne prodaje, ne iznajmljuje i ne dijeli vaše podatke trećim stranama 
osim u slučajevima kada je to neophodno za rad platforme 
(hosting partneri, sigurnosne usluge, sistemske integracije), 
i to uvijek pod ugovorima koji osiguravaju potpunu zaštitu podataka.

Korištenjem platforme potvrđujete da ste upoznati i saglasni s navedenim 
načinom prikupljanja i upotrebe podataka. Platforma zadržava pravo izmjene 
ove politike radi usklađivanja s tehničkim i zakonskim zahtjevima.
      `);
    }

    if (type === "terms") {
      setModalTitle("Uslovi korištenja");
      setModalContent(`
Korištenjem platforme Saraya – Pametno Odabrano prihvatate sljedeće uslove 
korištenja, koji osiguravaju sigurno i pouzdano iskustvo svim korisnicima.

1. KORIŠTENJE PLATFORME  
Platforma je namijenjena za pronalazak poslovnica, brendova, proizvoda, 
usluga i iskustava dostupnih na području Sarajeva. Zabranjeno je svako 
korištenje servisa koje može dovesti do narušavanja sigurnosti sistema, 
ometanja rada platforme, unošenja netačnih ili obmanjujućih informacija 
ili iskorištavanja platforme u nezakonite svrhe.

2. INTELEKTUALNO VLASNIŠTVO  
Svi prikazani brendovi, logotipi, opisi, fotografije i drugi sadržaji 
ostaju vlasništvo njihovih autora i korišteni su uz dozvolu ili u skladu 
s javno dostupnim informacijama. Kopiranje, distribucija ili neovlašteno 
korištenje sadržaja nije dozvoljeno.

3. ODGOVORNOST I TAČNOST INFORMACIJA  
Saraya se trudi da sve informacije budu tačne i ažurne, ali ne može garantovati 
potpunu preciznost podataka koji potiču od partnera i poslovnica. Korisnici su 
dužni provjeriti sve ključne informacije direktno kod pružaoca usluge.

4. IZMJENE I AŽURIRANJA  
Saraya zadržava pravo izmjene sadržaja, funkcionalnosti i uslova korištenja 
bez prethodne najave radi unapređenja platforme i sigurnosti korisnika.

Korištenjem platforme potvrđujete da ste razumjeli i prihvatili navedene uslove.
      `);
    }

    if (type === "contact") {
      setModalTitle("Kontaktirajte nas");
      setModalContent(`
Inovacije ne čekaju. Kontaktirajte nas.

Saraya je nastala kao inovativna platforma iz temelja Best Solution Company d.o.o. (BSC), 
lidera u oblasti grafičkog dizajna i digitalnog štampanja na tržištu BiH. 

Saraya predstavlja proširenje poslovanja BSC-a u smjeru implementacije naprednih tehnoloških 
rješenja. Kao prirodan nastavak stručnosti u pružanju visokokvalitetnih usluga, Saraya 
omogućava istraživanje i primjenu inovacija koje transformiraju svakodnevicu.

📩 Podrška i informacije  
support@sarayasolutions.com  
marketing@sarayasolutions.com  
info@sarayasolutions.com  

⏱ Radno vrijeme: 10:00 – 17:00
      `);
    }

    setOpenModal(true);
  };

  return (
    <>
      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-[5vh] md:w-[40vh] w-full relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-white"
              aria-label="Zatvori modal"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {modalTitle}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm mb-6">
              {modalContent}
            </p>

            {/* Umjesto forme: Google Maps iframe (responsivan) */}
            {modalTitle === "Kontaktirajte nas" && (
              <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="relative" style={{ paddingTop: "56.25%" /* 16:9 */ }}>
                  <iframe
                    title="Lokacija - Saraya Solutions (Sarajevo)"
                    src="https://maps.google.com/maps?q=43.8563,18.4131&z=15&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-medium mb-1">Kontakt informacije</p>
                  <p className="text-xs">E-mail: support@sarayasolutions.com • marketing@sarayasolutions.com • info@sarayasolutions.com</p>
                  <p className="text-xs mt-2">Radno vrijeme: 10:00 – 17:00</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo */}
            <div className="col-span-1">
              <img
                src="/assets/logosaraya-1.png"
                alt="Saraya Logo"
                className="w-[18vh] mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Saraya Pametno Odabrano je platforma koja povezuje najbolje brendove,
                poslovnice i iskustva u Sarajevu — na jednom mjestu.
              </p>

              <div className="flex items-center gap-4 mt-5">
                <a href="https://www.facebook.com/sarayasolution/" target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition" rel="noreferrer">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/saraya_solutions/" target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition" rel="noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.youtube.com/@SarayaSolutions" target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition" rel="noreferrer">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://ba.linkedin.com/in/saraya-solutions-20917b27a" target="_blank" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition" rel="noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigacija */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Istraži</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/explore" className="hover:text-gray-900 dark:hover:text-white">Explore Sarajevo</Link>
                </li>
                <li>
                  <Link href="https://sarayasolutions.com/" className="hover:text-gray-900 dark:hover:text-white">
                    Saraya Solutions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Pomoć */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Pomoć</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <button
                    onClick={() => handleOpen("contact")}
                    className="hover:text-gray-900 dark:hover:text-white"
                  >
                    Kontakt
                  </button>
                </li>
              </ul>
            </div>

            {/* Pravne stvari */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Pravno</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <button onClick={() => handleOpen("privacy")} className="hover:text-gray-900 dark:hover:text-white">
                    Politika privatnosti
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpen("terms")} className="hover:text-gray-900 dark:hover:text-white">
                    Uslovi korištenja
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2025 Saraya Solutions. Sva prava zadržana.</p>
            <p className="mt-3 sm:mt-0">
              Dizajn & razvoj:{" "}
              <a
                href="https://sarayasolutions.com/"
                target="_blank"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                rel="noreferrer"
              >
                Saraya Team
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
