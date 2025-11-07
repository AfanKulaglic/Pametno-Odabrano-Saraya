import type { Meta, StoryObj } from "@storybook/react";
import ProductGrid from "../../app/BrandSpotlight/components/ProductGrid"; // prilagodi po tvojoj strukturi

// ✅ Tvoj Apple brend (nije potreban u items, samo referenca unutar company)
const mockBrand = {
  id: "brand_200",
  name: "Apple",
  logo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
  description:
    "Apple je sinonim za naprednu tehnologiju, moderan dizajn i pouzdane performanse. Njihovi uređaji spajaju inovaciju i praktičnost, pružajući korisnicima besprijekorno iskustvo u svakodnevnom životu i radu.",
  marketplace_url: "https://saraya.example/companies/company_200",
  founded: "2012",
  headquarters: "Sarajevo, Bosna i Hercegovina",
  values: ["Inovacija", "Dizajn", "Održivost"],
};

// ✅ Glavni niz proizvoda
const mockItems = [
  {
    id: "item_501",
    type: "product",
    category: "Pametni uređaji",
    order: 20,
    title: "Galaxy Book4 — Power in Every Detail.",
    ranking_score: 0.87,
    short_description: '15" ekran, i7 CPU, 16GB RAM, 512GB SSD',
    long_description:
      "X200 Pro je dizajniran za profesionalce koji traže ravnotežu između performansi i mobilnosti.",
    price: 1299.99,
    currency: "EUR",
    image: { url: "/assets/galaxyBook4.jpg", alt: "Laptop X200 Pro" },
    company: {
      id: "company_200",
      name: "Apple",
      logo: mockBrand.logo,
      marketplace_url: mockBrand.marketplace_url,
    },
  },
  {
    id: "item_502",
    type: "product",
    category: "Pametni uređaji",
    title: "iPhone 17 Pro Max — Beyond Brilliant.",
    short_description: '6.5" OLED, 128GB, 5G, Dual SIM',
    long_description:
      "Z5 donosi vrhunski OLED ekran i impresivne performanse u kompaktnom pakovanju.",
    price: 799.99,
    currency: "EUR",
    image: { url: "/assets/iphone17.jpg", alt: "Smartphone Z5" },
    company: {
      id: "company_201",
      name: "Apple",
      logo: mockBrand.logo,
    },
  },
  {
    id: "item_503",
    type: "product",
    category: "Snaga zvuka",
    title: "AirPods 3 — Pure Sound. Pure Freedom.",
    short_description: "Bluetooth 5.2, 30h battery, over-ear",
    long_description:
      "Slušalice sa aktivnim poništavanjem buke nude kristalno čist zvuk i udobnost za cjelodnevno nošenje.",
    price: 199.99,
    currency: "EUR",
    image: { url: "/assets/airPods3.jpeg", alt: "Wireless Headphones" },
    company: {
      id: "company_202",
      name: "SoundPro",
      logo: mockBrand.logo,
    },
  },
  {
    id: "item_504",
    type: "product",
    category: "Pametni uređaji",
    title: "The New MacBook Pro — Beyond Performance.",
    short_description: '27" IPS, 60Hz, HDR10, 1ms response',
    long_description:
      "Kristalno čist prikaz i realne boje uz HDR10 podršku. Idealno rješenje za profesionalce i gamere.",
    price: 349.99,
    currency: "EUR",
    image: { url: "/assets/aa.jpg", alt: "4K Monitor" },
    company: {
      id: "company_203",
      name: "Apple",
      logo: mockBrand.logo,
    },
  },
];

// ✅ Meta konfiguracija
const meta: Meta<typeof ProductGrid> = {
  title: "Sections/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

// ✅ Default prikaz sa svim kategorijama
export const Default: Story = {
  args: {
    items: mockItems,
    collectionId: "collection_123",
  },
};

// ✅ Filtar sa jednom kategorijom
export const SingleCategory: Story = {
  args: {
    items: mockItems.filter((i) => i.category === "Pametni uređaji"),
  },
};

// ✅ Prazan grid (fallback state)
export const Empty: Story = {
  args: {
    items: [],
  },
};
