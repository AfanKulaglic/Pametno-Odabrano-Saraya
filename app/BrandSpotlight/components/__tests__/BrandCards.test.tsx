// app/BrandSpotlight/components/__tests__/BrandCards.test.tsx
import { render, screen, act } from "@testing-library/react";
import BrandCards from "../BrandCards";
import { Item, Brand } from "../../../lib/types";

jest.mock("../FeaturedProducts", () => () => (
  <div data-testid="featured-products">FeaturedProducts</div>
));
jest.mock("../ProductGrid", () => () => (
  <div data-testid="product-grid">ProductGrid</div>
));

jest.useFakeTimers();

const mockBrand: Brand = {
  id: "brand_200",
  name: "TechNova",
  logo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
  description:
    "TechNova je sinonim za naprednu tehnologiju, moderan dizajn i pouzdane performanse.",
  marketplace_url: "https://saraya.example/companies/company_200",
  founded: "2012",
  headquarters: "Sarajevo, Bosna i Hercegovina",
  values: ["Inovacija", "Dizajn", "Održivost"],
};

const mockItems: Item[] = [
  {
    id: "item_100",
    type: "product",
    category: "Tech",
    title: "SmartPhone X10",
    short_description: "Najnovija generacija pametnih telefona.",
    long_description: "Brz, elegantan i pun inovacija.",
    price: 999.99,
    currency: "EUR",
    image: {
      url: "/assets/phone.jpg",
      alt: "SmartPhone X10",
      width: 800,
      height: 600,
    },
    company: {
      id: "brand_200",
      name: "TechNova",
      logo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
      marketplace_url: "#",
    },
    badges: ["Premium", "Top izbor"],
    cta: { url: "#" },
    order: 2,
  },
  {
    id: "item_200",
    type: "product",
    category: "Home",
    title: "Smart Vacuum 2.0",
    short_description: "Pametni usisivač nove generacije.",
    long_description: "Tih, učinkovit i sam se puni.",
    price: 499.99,
    currency: "EUR",
    image: {
      url: "/assets/vacuum.jpg",
      alt: "Smart Vacuum 2.0",
      width: 800,
      height: 600,
    },
    company: {
      id: "brand_201",
      name: "HomePro",
      logo: "https://dummyimage.com/50x50",
      marketplace_url: "#",
    },
    badges: ["Eco", "Smart"],
    cta: { url: "#" },
    order: 1,
  },
];

describe("BrandCards component (komponenta za kartice brenda)", () => {
  it("renders loading skeletons (prikazuje skeleton dok se učitava)", () => {
    render(<BrandCards items={mockItems} brand={mockBrand} />);
    const skeletonSection = screen.getByTestId("brandcards-skeleton");
    expect(skeletonSection).toHaveClass("animate-pulse");
    console.log("✅ Skeleton je prikazan tokom učitavanja");
  });

  it("renders featured and product grids after loading (prikazuje komponente nakon učitavanja)", async () => {
    render(<BrandCards items={mockItems} brand={mockBrand} />);
    await act(async () => {
      jest.advanceTimersByTime(1600);
    });
    expect(screen.getByTestId("featured-products")).toBeInTheDocument();
    expect(screen.getByTestId("product-grid")).toBeInTheDocument();
    console.log("✅ Featured i ProductGrid prikazani nakon loadinga");
  });

  it("renders 'no products' message if brand has no items (prikazuje poruku ako brend nema proizvoda)", async () => {
    render(<BrandCards items={[]} brand={mockBrand} />);
    await act(async () => {
      jest.advanceTimersByTime(1600);
    });

    const noProductsMsgs = screen.getAllByText((_, element) =>
      (element?.textContent || "").includes("Nema proizvoda za brend TechNova")
    );
    expect(noProductsMsgs[0]).toBeInTheDocument();
    console.log("✅ Poruka o nedostatku proizvoda prikazana");
  });

  it("sorts brand items by order (sortira proizvode po redu)", async () => {
    render(<BrandCards items={mockItems} brand={mockBrand} />);
    await act(async () => {
      jest.advanceTimersByTime(1600);
    });

    const brandItems = mockItems
      .filter((i) => i.company.name === mockBrand.name)
      .sort((a, b) => Math.abs(a.order ?? 0) - Math.abs(b.order ?? 0));

    expect(brandItems[0].title).toBe("SmartPhone X10");
    console.log("✅ Items su sortirani po order vrijednosti");
  });
});
