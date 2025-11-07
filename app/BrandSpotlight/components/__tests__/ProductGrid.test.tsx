// app/EditorPicks/components/__tests__/ProductGrid.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ProductGrid from "../ProductGrid";
import { trackEvent } from "../../../lib/analytics";
import "@testing-library/jest-dom";

jest.mock("../../../lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("ProductGrid component (komponenta za mrežu proizvoda)", () => {
  const mockItems = [
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
      cta: {
        url: "#",
      },
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
      cta: {
        url: "#",
      },
    },
  ];

  it("renders category buttons (prikazuje dugmad kategorija)", () => {
    render(<ProductGrid items={mockItems} collectionId="col_001" />);
    expect(screen.getByText("Sve")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    console.log("✅ Category buttons are rendered (Kategorije su prikazane)");
  });

  it("filters items when category button is clicked (filtrira proizvode po kategoriji)", () => {
    render(<ProductGrid items={mockItems} collectionId="col_001" />);
    fireEvent.click(screen.getByText("Tech"));
    expect(screen.getByText("SmartPhone X10")).toBeInTheDocument();
    expect(screen.queryByText("Smart Vacuum 2.0")).not.toBeInTheDocument();
    console.log("✅ Filtering works (Filtriranje radi ispravno)");
  });

  it("renders product titles (prikazuje nazive proizvoda)", () => {
    render(<ProductGrid items={mockItems} collectionId="col_001" />);
    expect(screen.getByText(/SmartPhone X10/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart Vacuum 2.0/i)).toBeInTheDocument();
    console.log("✅ Product titles are visible (Nazivi proizvoda su prikazani)");
  });

  it("renders company logos (prikazuje logotipe kompanija)", () => {
    render(<ProductGrid items={mockItems} collectionId="col_001" />);
    const logos = screen
      .getAllByRole("img")
      .map((el) => el as HTMLImageElement)
      .filter((img) => ["TechNova", "HomePro"].includes(img.alt));

    expect(logos.length).toBeGreaterThan(0);
    console.log("✅ Company logos are displayed (Logotipi kompanija su prikazani)");
  });

  it("calls trackEvent on product click (poziva trackEvent na klik proizvoda)", () => {
    render(<ProductGrid items={mockItems} collectionId="col_001" />);
    const link = screen.getByRole("link", { name: /SmartPhone X10/i });
    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith(
      "category_click",
      expect.objectContaining({
        item_id: "item_100",
        collection_id: "col_001",
        category: undefined,
      })
    );
    console.log("✅ trackEvent called on click (trackEvent je pozvan na klik)");
  });
});
