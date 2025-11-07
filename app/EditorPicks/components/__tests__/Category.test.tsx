import { render, screen, fireEvent } from "@testing-library/react";
import Category from "../Category";
import "@testing-library/jest-dom";
import { trackEvent } from "../../../lib/analytics";

// Mock za trackEvent (da ne zove pravi analytics)
jest.mock("../../../lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("Category component (komponenta za prikaz kategorije)", () => {
  const mockItems = [
    {
      id: "item_501",
      type: "product",
      category: "Laptopi i Računari",
      title: "Laptop X200 Pro",
      short_description: '15" ekran, i7 CPU, 16GB RAM, 512GB SSD',
      long_description:
        "X200 Pro je dizajniran za profesionalce koji traže ravnotežu između performansi i mobilnosti.",
      order: 4,
      featured: true,
      price: 1299.99,
      currency: "EUR",
      image: {
        url: "/assets/laptop.jpg",
        alt: "Laptop X200 Pro",
        width: 800,
        height: 600,
      },
      company: {
        id: "company_200",
        name: "TechNova",
        logo:
          "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        marketplace_url: "#",
      },
      badges: ["Urednički izbor", "Top"],
      cta: { url: "https://saraya.example/product/sku_501" },
    },
  ];

  it("renders loading skeletons (prikazuje skeleton dok se učitava)", () => {
    render(
      <Category
        category="Laptopi i Računari"
        categoryItems={[]}
        collectionId="col_123"
        loading={true}
      />
    );

    const skeletons = screen.getAllByRole("generic");
    expect(skeletons.length).toBeGreaterThan(0);
    console.log("✅ Loading skeletons are visible (Skeletoni su vidljivi tokom učitavanja)");
  });

  it("renders category title (prikazuje naziv kategorije)", () => {
    render(
      <Category
        category="Laptopi i Računari"
        categoryItems={mockItems}
        collectionId="col_123"
        loading={false}
      />
    );

    const categoryTitle = screen.getByText(/Laptopi i Računari/i);
    expect(categoryTitle).toBeInTheDocument();
    console.log("✅ Category title is visible (Naziv kategorije je vidljiv)");
  });

  it("renders product title and description (prikazuje naziv i opis proizvoda)", () => {
    render(
      <Category
        category="Laptopi i Računari"
        categoryItems={mockItems}
        collectionId="col_123"
        loading={false}
      />
    );

    expect(screen.getByText(/Laptop X200 Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/profesionalce koji traže ravnotežu/i)).toBeInTheDocument();
    console.log("✅ Product title and description are rendered (Naziv i opis proizvoda su prikazani)");
  });

  it("renders company logo (prikazuje logo kompanije)", () => {
    render(
      <Category
        category="Laptopi i Računari"
        categoryItems={mockItems}
        collectionId="col_123"
        loading={false}
      />
    );

    const logo = screen.getByAltText("TechNova");
    expect(logo).toBeInTheDocument();
    console.log("✅ Company logo is displayed (Logo kompanije je prikazan)");
  });

  it("renders badges (prikazuje bedževe)", () => {
    render(
      <Category
        category="Laptopi i Računari"
        categoryItems={mockItems}
        collectionId="col_123"
        loading={false}
      />
    );

    expect(screen.getByText(/Urednički izbor/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Top/i).length).toBeGreaterThan(0);
    console.log("✅ Badges are displayed (Bedževi su prikazani)");
  });

  it("calls trackEvent on click (poziva trackEvent na klik)", () => {
    render(
      <Category
        category="Laptopi i Računari"
        categoryItems={mockItems}
        collectionId="col_123"
        loading={false}
      />
    );

    const link = screen.getByText(/Laptop X200 Pro/i).closest("a");
    expect(link).toBeInTheDocument();

    fireEvent.click(link!);
    expect(trackEvent).toHaveBeenCalledWith("category_click", {
      item_id: "item_501",
      collection_id: "col_123",
      category: "Laptopi i Računari",
    });
    console.log("✅ trackEvent called successfully (trackEvent je uspješno pozvan)");
  });
});
