import { render, screen, act } from "@testing-library/react";
import EditorialGrid from "../EditorialGrid";
import "@testing-library/jest-dom";

describe("EditorialGrid component (komponenta za urednički prikaz)", () => {
  const mockItems = [
    {
      id: "item_501",
      type: "product",
      category: "Laptopi i Računari",
      order: 4,
      title: "Laptop X200 Pro",
      ranking_score: 0.87,
      tags: ["outdoor", "eco", "travel"],
      published_at: "2025-10-10T09:00:00Z",
      short_description: '15" ekran, i7 CPU, 16GB RAM, 512GB SSD',
      long_description:
        "X200 Pro je dizajniran za profesionalce koji traže ravnotežu između performansi i mobilnosti. Kućište od aluminijuma, dugotrajna baterija i vrhunski ekran čine ga idealnim za rad i zabavu.",
      key_features: [
        "Intel i7 12th Gen procesor",
        "16 GB DDR5 RAM",
        "512 GB NVMe SSD",
        'Full HD 15.6" ekran',
        "Trajanje baterije do 10h",
      ],
      specifications: {
        procesor: "Intel Core i7-12700H",
        ram: "16GB DDR5",
        storage: "512GB SSD",
        ekran: '15.6" Full HD IPS',
        baterija: "82 Wh",
      },
      price: 1299.99,
      currency: "EUR",
      image: {
        url: "/assets/laptop.jpg",
        alt: "Laptop X200 Pro",
        width: 800,
        height: 600,
      },
      gallery: [
        "/assets/laptop.jpg",
        "/assets/laptop1.jpg",
        "/assets/laptop2.jpg",
      ],
      company: {
        id: "company_200",
        name: "TechNova",
        logo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        marketplace_url: "https://saraya.example/companies/company_200",
      },
      badges: ["Urednički izbor", "Top"],
      featured: true,
      cta: {
        url: "https://saraya.example/product/sku_501",
      },
    },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders featured and category sections after loading (prikazuje sekcije nakon učitavanja)", async () => {
    render(<EditorialGrid items={mockItems} collectionId="col_123" />);

    // ⏳ Simulate time passing to remove loading (Simulacija prolaska vremena da loading nestane)
    await act(async () => {
      jest.advanceTimersByTime(800);
    });

    // ✅ Featured section
    const featuredTitle = screen.getByText(/Istaknuto/i);
    expect(featuredTitle).toBeInTheDocument();
    console.log(
      "✅ Featured section renders correctly (Istaknuto se ispravno prikazuje)"
    );

    // ✅ Laptop title check
    const laptopTitle = screen.getAllByText(/Laptop X200 Pro/i);
    expect(laptopTitle.length).toBeGreaterThan(0);
    console.log(
      "✅ Laptop X200 Pro appears in the document (Laptop X200 Pro se prikazuje u dokumentu)"
    );

    // ✅ Category section
    const categoryTitle = screen.getByText(/Laptopi i Računari/i);
    expect(categoryTitle).toBeInTheDocument();
    console.log(
      "✅ Category section renders correctly (Kategorija se ispravno prikazuje)"
    );

    // ✅ All tests passed
    console.log(
      "🎉 All checks passed successfully (Svi testovi su uspješno prošli)"
    );
  });
});
