// app/BrandSpotlight/components/__tests__/FeaturedProducts.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FeaturedProducts from "../FeaturedProducts";
import { trackEvent } from "../../../lib/analytics";
import { Item, Brand } from "../../../lib/types";

// 🔧 Mock framer-motion da ne baca AggregateError
jest.mock("framer-motion", () => {
  const FakeComponent = (props: any) => <div {...props} />;
  return {
    motion: {
      div: FakeComponent,
      article: FakeComponent,
    },
  };
});

// 🔧 Mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt} />;
});

// 🔧 Mock next/link
jest.mock("next/link", () => {
  return ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

// 🔧 Mock trackEvent
jest.mock("../../../lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

// ✅ Mock podaci
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

describe("FeaturedProducts component (komponenta za istaknute proizvode)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all product titles and prices (prikazuje sve naslove i cijene proizvoda)", () => {
    render(<FeaturedProducts items={mockItems} brand={mockBrand} />);
    expect(screen.getByText("SmartPhone X10")).toBeInTheDocument();
    expect(screen.getByText("Smart Vacuum 2.0")).toBeInTheDocument();
    expect(screen.getByText(/999\.99 EUR/i)).toBeInTheDocument();
    expect(screen.getByText(/499\.99 EUR/i)).toBeInTheDocument();
    console.log("✅ Renders all titles and prices (Prikazuje sve naslove i cijene proizvoda)");
  });

  it("renders correct product images (prikazuje tačne slike proizvoda)", () => {
    render(<FeaturedProducts items={mockItems} brand={mockBrand} />);
    const phoneImage = screen.getByAltText("SmartPhone X10") as HTMLImageElement;
    const vacuumImage = screen.getByAltText("Smart Vacuum 2.0") as HTMLImageElement;
    expect(phoneImage).toBeInTheDocument();
    expect(vacuumImage).toBeInTheDocument();
    expect(phoneImage.getAttribute("src")).toContain("/assets/phone.jpg");
    expect(vacuumImage.getAttribute("src")).toContain("/assets/vacuum.jpg");
    console.log("✅ Renders correct product images (Prikazuje tačne slike proizvoda)");
  });

  it("renders CTA link with correct text (prikazuje ispravan CTA tekst)", () => {
    render(<FeaturedProducts items={mockItems} brand={mockBrand} />);
    const ctaButtons = screen.getAllByRole("link", { name: /Kupi kod/i });
    expect(ctaButtons.length).toBe(2);
    expect(ctaButtons[0]).toHaveTextContent("Kupi kod TechNova");
    console.log("✅ CTA link text is correct (CTA tekst je ispravan)");
  });

  it("calls trackEvent on CTA click (poziva trackEvent pri kliku na CTA)", () => {
    render(<FeaturedProducts items={mockItems} brand={mockBrand} />);
    const firstCta = screen.getAllByRole("link", { name: /Kupi kod/i })[0];
    fireEvent.click(firstCta);
    expect(trackEvent).toHaveBeenCalledWith("product_click", {
      brand: "TechNova",
      product_id: "item_100",
    });
    console.log("✅ trackEvent called on CTA click (trackEvent pozvan pri kliku na CTA)");
  });
});
