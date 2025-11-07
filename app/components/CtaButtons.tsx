"use client";

import { trackEvent } from "../lib/analytics";

interface Props {
  url: string;
  itemId: string;
  companyId: string;
  collectionId: string;
}

export default function CtaButton({
  url,
  itemId,
  companyId,
  collectionId,
}: Props) {
  return (
    <a
      data-testid="cta-button"
      href={`${url}?utm_source=pametno_odabrano&utm_medium=promo&utm_campaign=${collectionId}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("cta_click", {
          item_id: itemId,
          company_id: companyId,
          concept: "editorial",
        })
      }
      className="inline-block bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      Pregledaj na Saraya
    </a>
  );
}
