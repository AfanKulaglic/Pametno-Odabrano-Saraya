import type { Meta, StoryObj } from "@storybook/react";
import EditorHero from "../../app/EditorPicks/components/EditorHero"; // prilagodi path ako je drugačiji

// ✅ Tvoje kategorije (baš kako si naveo)
const mockCategories = [
  {
    id: "cat_001",
    name: "Pametni uređaji",
    text: "Ostanite povezani gdje god se nalazili",
    image: "/assets/pametniUredjaji.jpg",
  },
  {
    id: "cat_002",
    name: "Snaga zvuka",
    text: "Kvalitetan zvuk za svaki trenutak",
    image: "/assets/snagaZvuka.jpg",
  },
  {
    id: "cat_003",
    name: "Vizuelna Elegancija",
    text: "Proizvodi koji oduševljavaju estetikom",
    image: "/assets/vizualnaElegancija.jpg",
  },
  {
    id: "cat_004",
    name: "Dom pun doživljaja",
    text: "Vaši podaci su uvijek zaštićeni",
    image: "/assets/domPunDozivljaja.jpg",
  },
  {
    id: "cat_005",
    name: "Uhvatite svaki trenutak",
    text: "Zabilježite svaki trenutak avanture",
    image: "/assets/uhvatiteSvakiTrenutak.jpg",
  },
  {
    id: "cat_006",
    name: "Kontrola na dohvat ruke",
    text: "Tehnologija koja olakšava život kod kuće",
    image: "/assets/kontrolaNaDohvatRuke.jpg",
  },
];

// ✅ Storybook konfiguracija
const meta: Meta<typeof EditorHero> = {
  title: "Sections/EditorHero",
  component: EditorHero,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditorHero>;

// 🔹 Default slideshow — sve kategorije
export const Default: Story = {
  args: {
    categories: mockCategories,
  },
};

// 🔹 Samo jedna kategorija
export const SingleCategory: Story = {
  args: {
    categories: [mockCategories[0]],
  },
};

// 🔹 Loading state (prazno, prikazuje skeleton)
export const LoadingState: Story = {
  args: {
    categories: [],
  },
};
