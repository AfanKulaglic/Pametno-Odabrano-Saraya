import type { Meta, StoryObj } from "@storybook/react";
import BrandHero from "../../app/BrandSpotlight/components/BrandHero"; // prilagodi putanju ako je drugačija

// ✅ Mock brand podaci (kao što bi došli iz API-ja)
const mockBrand = {
      "id": "brand_200",
      "name": "Apple",
      "logo": "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
      "description": "Apple je sinonim za naprednu tehnologiju, moderan dizajn i pouzdane performanse. Njihovi uređaji spajaju inovaciju i praktičnost, pružajući korisnicima besprijekorno iskustvo u svakodnevnom životu i radu.",
      "marketplace_url": "https://saraya.example/companies/company_200",
      "founded": "2012",
      "headquarters": "Sarajevo, Bosna i Hercegovina",
      "values": [
        "Inovacija",
        "Dizajn",
        "Održivost"
      ]
};

const meta: Meta<typeof BrandHero> = {
  title: "Sections/BrandHero",
  component: BrandHero,
  parameters: {
    layout: "fullscreen", // koristi fullscreen jer ima hero izgled
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BrandHero>;

// ✅ Glavni prikaz
export const Default: Story = {
  args: {
    brand: mockBrand,
  },
};

// ✅ State loading (ako nema brand podataka)
export const Loading: Story = {
  args: {
    brand: undefined as any,
  },
};
