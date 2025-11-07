import type { Meta, StoryObj } from "@storybook/react";
import FeaturedProducts from "../../app/BrandSpotlight/components/FeaturedProducts"; // prilagodi putanju ako je drugačije

// ✅ Mock podaci da bi se komponenta mogla prikazati u Storybooku
const mockItems = [
  {
      "id": "item_501",
      "type": "product",
      "category": "Pametni uređaji",
      "order": 20,
      "title": "Galaxy Book4 — Power in Every Detail.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "15\" ekran, i7 CPU, 16GB RAM, 512GB SSD",
      "long_description": "X200 Pro je dizajniran za profesionalce koji traže ravnotežu između performansi i mobilnosti. Kućište od aluminijuma, dugotrajna baterija i vrhunski ekran čine ga idealnim za rad i zabavu.",
      "key_features": [
        "Intel i7 12th Gen procesor",
        "16 GB DDR5 RAM",
        "512 GB NVMe SSD",
        "Full HD 15.6\" ekran",
        "Trajanje baterije do 10h"
      ],
      "specifications": {
        "procesor": "Intel Core i7-12700H",
        "ram": "16GB DDR5",
        "storage": "512GB SSD",
        "ekran": "15.6\" Full HD IPS",
        "baterija": "82 Wh"
      },
      "price": 1299.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/galaxyBook4.jpg",
        "alt": "Laptop X200 Pro",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/laptop.jpg",
        "/assets/laptop1.jpg",
        "/assets/laptop2.jpg"
      ],
      "company": {
        "id": "company_200",
        "name": "Apple",
        "logo": "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        "marketplace_url": "https://saraya.example/companies/company_200"
      },
      "badges": [
        "Urednički izbor",
        "Top"
      ],
      "featured": true,
      "cta": {
        "url": "https://saraya.example/product/sku_501"
      }
    },
    {
      "id": "item_502",
      "type": "product",
      "category": "Pametni uređaji",
      "order": 2,
      "title": "iPhone 17 Pro Max — Beyond Brilliant.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "6.5\" OLED, 128GB, 5G, Dual SIM",
      "long_description": "Z5 donosi vrhunski OLED ekran i impresivne performanse u kompaktnom pakovanju. Uz 5G povezivost i dugi vijek baterije, idealan je za zahtjevne korisnike.",
      "key_features": [
        "6.5\" OLED ekran",
        "5G podrška",
        "128 GB memorije",
        "Dual SIM",
        "64 MP kamera"
      ],
      "specifications": {
        "ekran": "6.5\" OLED, 120Hz",
        "memorija": "128GB",
        "kamera": "64 MP + 12 MP",
        "baterija": "5000 mAh",
        "procesor": "Snapdragon 8 Gen 1"
      },
      "price": 799.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/iphone17.jpg",
        "alt": "Smartphone Z5",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/smartphone.jpg",
        "/assets/smartphone1.jpg",
        "/assets/smartphone2.jpg"
      ],
      "company": {
        "id": "company_201",
        "name": "Apple",
        "logo": "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        "marketplace_url": "https://saraya.example/companies/company_201"
      },
      "badges": [
        "Novo"
      ],
      "featured": false,
      "cta": {
        "url": "https://saraya.example/product/sku_502"
      }
    },
];

const mockBrand = {
  id: "brand_1",
  name: "TechNova",
  logo: "https://dummyimage.com/100x100/222/fff&text=T",
};

const meta: Meta<typeof FeaturedProducts> = {
  title: "Sections/FeaturedProducts",
  component: FeaturedProducts,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeaturedProducts>;

// ✅ Default prikaz
export const Default: Story = {
  args: {
    items: mockItems,
    brand: mockBrand,
  },
};
