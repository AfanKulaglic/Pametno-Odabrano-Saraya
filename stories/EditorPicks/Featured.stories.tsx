import type { Meta, StoryObj } from "@storybook/react";
import FeaturedGrid from "../../app/EditorPicks/components/Featured"; // prilagodi path po strukturi projekta

const mockFeaturedItems = [
  {
    id: "item_101",
    title: "MacBook Pro 2025 — Beyond Performance.",
    short_description: "Najmoćniji Apple laptop dosad, sa M4 Pro čipom.",
    image: {
      url: "/assets/aa.jpg",
      alt: "MacBook Pro 2025",
    },
    badges: ["Novo", "Top izbor"],
    company: {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  },
  {
    id: "item_102",
    title: "Samsung Galaxy S25 Ultra — Epic in Every Way.",
    short_description: "Vrhunska kamera i AI performanse za svaku situaciju.",
    image: {
      url: "/assets/samsungS25.jpg",
      alt: "Samsung Galaxy S25 Ultra",
    },
    badges: ["Urednički izbor"],
    company: {
      name: "Samsung",
      logo: "yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
    },
  },
  {
    id: "item_103",
    title: "iPhone 17 Pro Max — Beyond Brilliant.",
    short_description: "Prestiž, snaga i savršenstvo u svakom detalju.",
    image: {
      url: "/assets/iphone17.jpg",
      alt: "iPhone 17 Pro Max",
    },
    badges: ["Premium"],
    company: {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
  },
];

const meta: Meta<typeof FeaturedGrid> = {
  title: "Sections/FeaturedGrid",
  component: FeaturedGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeaturedGrid>;

// 🔹 Default — prikaz sa svim istaknutim proizvodima
export const Default: Story = {
  args: {
    featuredItems: mockFeaturedItems,
    collectionId: "collection_featured",
    loading: false,
  },
};

// 🔹 Loading skeleton state
export const Loading: Story = {
  args: {
    featuredItems: [],
    collectionId: "collection_featured",
    loading: true,
  },
};

// 🔹 Empty state (bez proizvoda)
export const Empty: Story = {
  args: {
    featuredItems: [],
    collectionId: "collection_featured",
    loading: false,
  },
};
