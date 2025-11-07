// ✅ types.ts

export interface Company {
  id: string;
  name: string;
  logo?: string;
  marketplace_url: string;
}

export interface CTA {
  label?: string;
  url: string;
}

export interface ImageData {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface CollectionMeta {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  background_image: string;
}

// 🟣 NOVO: Definicija pojedinačnog brenda
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  marketplace_url: string;
  founded?: string;          // ✅ godina osnivanja
  headquarters?: string;     // ✅ sjedište
  values?: string[];         // ✅ lista vrijednosti
  items?: Item[];            // ✅ opcionalno — povezani proizvodi
}

// 🟢 Glavni response za kolekciju
export interface CollectionResponse {
  collection: CollectionMeta;
  categories?: CategoryData[];
  items: Item[];
  brands?: Brand[]; // ✅ Dodano — lista brendova
}

export interface Item {
  id: string;
  type: string; // "product" | "service"
  category: string;
  title: string;
  short_description: string;
  long_description?: string;
  order?: number;

  price: number;
  currency: string;

  ranking_score?: number;
  tags?: string[];
  published_at?: string;

  image: ImageData;
  gallery?: string[];

  company: Company;

  badges?: string[];
  featured?: boolean;

  key_features?: string[];
  specifications?: Record<string, string>;

  cta: CTA;
}

export interface CategoryData {
  name: string;
  text: string;
  image: string;
}

