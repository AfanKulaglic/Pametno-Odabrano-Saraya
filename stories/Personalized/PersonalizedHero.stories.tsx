import type { Meta, StoryObj } from "@storybook/react";
import PersonalizedHero from "../../app/Personalized/components/PersonalizedHero"; // prilagodi putanju ako je drugačije
import { Item } from "../../app/lib/types";

// ✅ Mock proizvodi za test
const mockItems: Item[] = [
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
    {
      "id": "item_503",
      "type": "product",
      "category": "Snaga zvuka",
      "order": 12,
      "title": "AirPods 3 — Pure Sound. Pure Freedom.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "Bluetooth 5.2, 30h battery, over-ear",
      "long_description": "Slušalice sa aktivnim poništavanjem buke koje nude kristalno čist zvuk i udobnost za cjelodnevno nošenje. Idealne za putovanja i kancelariju.",
      "key_features": [
        "Bluetooth 5.2",
        "Aktivno poništavanje buke",
        "30 sati baterije",
        "USB-C punjenje",
        "Udobne memorijske jastučiće"
      ],
      "specifications": {
        "konekcija": "Bluetooth 5.2",
        "trajanje_baterije": "30h",
        "punjenje": "USB-C",
        "težina": "260g"
      },
      "price": 199.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/airPods3.jpeg",
        "alt": "Wireless Headphones",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/headphones.jpg",
        "/assets/headphones1.jpg",
        "/assets/headphones2.jpg"
      ],
      "company": {
        "id": "company_202",
        "name": "SoundPro",
        "logo": "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        "marketplace_url": "https://saraya.example/companies/company_202"
      },
      "badges": [
        "Top"
      ],
      "featured": false,
      "cta": {
        "url": "https://saraya.example/product/sku_503"
      }
    },
    {
      "id": "item_504",
      "type": "product",
      "category": "Pametni uređaji",
      "order": 1,
      "title": "The New MacBook Pro — Beyond Performance.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "27\" IPS, 60Hz, HDR10, 1ms response",
      "long_description": "Kristalno čist prikaz i realne boje uz HDR10 podršku. Idealno rješenje za profesionalce i gamere.",
      "key_features": [
        "4K UHD rezolucija",
        "IPS panel",
        "HDR10",
        "1ms odziv",
        "USB-C priključak"
      ],
      "specifications": {
        "ekran": "27\" IPS 4K UHD",
        "osvježenje": "60Hz",
        "odziv": "1ms",
        "svjetlina": "400 nits"
      },
      "price": 349.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/aa.jpg",
        "alt": "4K Monitor",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/monitor.jpg",
        "/assets/monitor1.jpg",
        "/assets/monitor2.jpg"
      ],
      "company": {
        "id": "company_203",
        "name": "Apple",
        "logo": "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        "marketplace_url": "https://saraya.example/companies/company_203"
      },
      "badges": [
        "Novo"
      ],
      "featured": true,
      "cta": {
        "url": "https://saraya.example/product/sku_504"
      }
    },
    {
      "id": "item_642",
      "type": "product",
      "category": "Pametni uređaji",
      "order": 5,
      "title": "Xiaomi Watch — Fitness. Focus. Freedom.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "AMOLED ekran, GPS, praćenje sna, 10 dana baterije",
      "long_description": "Smartwatch koji prati vaše zdravlje i aktivnosti. Snažna baterija, napredni senzori i elegantan dizajn za svakodnevno nošenje.",
      "key_features": [
        "AMOLED ekran",
        "Praćenje sna",
        "GPS",
        "10 dana baterije",
        "Vodootporan"
      ],
      "specifications": {
        "ekran": "1.4\" AMOLED",
        "baterija": "10 dana",
        "vodootpornost": "5ATM",
        "konekcija": "Bluetooth 5.1"
      },
      "price": 179.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/miWatch.jpg",
        "alt": "Smart Fitness Watch",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/watch.jpg",
        "/assets/watch.jpg",
        "/assets/watch.jpg"
      ],
      "company": {
        "id": "company_312",
        "name": "Apple",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png",
        "marketplace_url": "https://saraya.example/companies/company_312"
      },
      "badges": [
        "Novo"
      ],
      "featured": true,
      "cta": {
        "url": "https://saraya.example/product/sku_642"
      }
    },
    {
      "id": "item_643",
      "type": "product",
      "category": "Dom pun doživljaja",
      "order": 15,
      "title": "Arlo — Security in Sight.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "1TB NVMe, USB-C 3.2, 1050MB/s",
      "long_description": "Brz i pouzdan eksterni SSD koji omogućava munjevito kopiranje datoteka i sigurnu pohranu. Kompaktan, otporan na udarce i idealan za profesionalce u pokretu.",
      "key_features": [
        "NVMe SSD",
        "USB-C 3.2 Gen 2",
        "1050 MB/s brzina čitanja",
        "Metalno kućište",
        "Otporan na udarce"
      ],
      "specifications": {
        "kapacitet": "1TB",
        "interfejs": "USB-C 3.2 Gen 2",
        "brzina_čitanja": "1050 MB/s",
        "brzina_pisanja": "1000 MB/s"
      },
      "price": 149.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/arlo.jpeg",
        "alt": "Eksterni SSD 1TB",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/ssd.jpg",
        "/assets/ssd1.jpg",
        "/assets/ssd2.jpg"
      ],
      "company": {
        "id": "company_313",
        "name": "DataCore",
        "logo": "https://community.arlo.com/t5/image/serverpage/image-id/27214i404B78741FACB7B3/image-size/large/is-moderation-mode/true?v=v2&px=999&whitelist-exif-data=Copyright",
        "marketplace_url": "https://saraya.example/companies/company_313"
      },
      "badges": [
        "Novo"
      ],
      "featured": false,
      "cta": {
        "url": "https://saraya.example/product/sku_643"
      }
    },
    {
      "id": "item_644",
      "type": "product",
      "category": "Kontrola na dohvat ruke",
      "order": 7,
      "title": "Logitech G305 — Precision in Every Click.",
      "ranking_score": 0.87,
      "tags": [
        "outdoor",
        "eco",
        "travel"
      ],
      "published_at": "2025-10-10T09:00:00Z",
      "short_description": "Hot-swap tasteri, RGB, aluminijsko kućište",
      "long_description": "Visokokvalitetna mehanička tastatura sa hot-swap prekidačima, programabilnim RGB osvjetljenjem i čvrstim aluminijskim okvirom. Dizajnirana za igrače i profesionalce.",
      "key_features": [
        "Hot-swap prekidači",
        "Full RGB osvjetljenje",
        "Anti-ghosting",
        "USB-C kabl",
        "Ergonomski dizajn"
      ],
      "specifications": {
        "prekidači": "Gateron Brown",
        "materijal": "Aluminijum",
        "konekcija": "USB-C",
        "osvjetljenje": "RGB"
      },
      "price": 119.99,
      "currency": "EUR",
      "image": {
        "url": "/assets/logitechG.jpg",
        "alt": "Mehanička Tastatura K80",
        "width": 800,
        "height": 600
      },
      "gallery": [
        "/assets/keyboard1.jpg",
        "/assets/keyboard2.jpg",
        "/assets/keyboard.jpg"
      ],
      "company": {
        "id": "company_314",
        "name": "Apple",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg",
        "marketplace_url": "https://saraya.example/companies/company_314"
      },
      "badges": [
        "Top"
      ],
      "featured": false,
      "cta": {
        "url": "https://saraya.example/product/sku_644"
      }
    },
];

// ✅ Storybook konfiguracija
const meta: Meta<typeof PersonalizedHero> = {
  title: "Sections/PersonalizedHero",
  component: PersonalizedHero,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PersonalizedHero>;

// 🔹 Default — sve stavke
export const Default: Story = {
  args: {
    items: mockItems,
  },
};

// 🔹 Samo jedan proizvod
export const SingleItem: Story = {
  args: {
    items: [mockItems[0]],
  },
};

// 🔹 Loading state (prazno, prikazuje skeletone)
export const LoadingState: Story = {
  args: {
    items: [],
  },
};
