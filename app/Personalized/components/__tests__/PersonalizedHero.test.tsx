import { render, screen, fireEvent, act } from "@testing-library/react";
import PersonalizedHero from "../PersonalizedHero";
import "@testing-library/jest-dom";

jest.mock("../../../lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("PersonalizedHero component (PersonalizedHero komponenta)", () => {
  const mockItems = [
    {
      id: "item_1",
      type: "product",
      category: "Tech",
      title: "Eksterni SSD Drive 1TB ProSpeed",
      short_description: "1TB NVMe, USB-C 3.2, 1050MB/s",
      long_description: "Brz i pouzdan eksterni SSD.",
      order: 1,
      price: 149.99,
      currency: "EUR",
      ranking_score: 0.87,
      featured: true,
      image: {
        url: "/assets/ssd.jpg",
        alt: "Eksterni SSD 1TB",
        width: 800,
        height: 600,
      },
      company: {
        id: "company_313",
        name: "DataCore",
        logo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
        marketplace_url: "#",
      },
      cta: {
        url: "https://saraya.example/product/sku_643",
      },
    },
  ];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // ✅ (Ovo osigurava da su svi useEffect i async update-i završeni)
    await act(async () => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders skeleton loader before items are shown (prikazuje skeleton loader prije nego se prikažu stavke)", () => {
    render(<PersonalizedHero items={mockItems} />);
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
    console.log("✅ Skeleton loader test passed (Test skeleton učitavanja prošao)");
  });

  it("renders item after loading finishes (prikazuje stavke nakon što učitavanje završi)", async () => {
    render(<PersonalizedHero items={mockItems} />);
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    expect(await screen.findByText(/Eksterni SSD Drive/i)).toBeInTheDocument();
    console.log("✅ Render item test passed (Test prikaza proizvoda prošao)");
  });

  it("shows price and currency correctly (ispravno prikazuje cijenu i valutu)", async () => {
    render(<PersonalizedHero items={mockItems} />);
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    expect(await screen.findByText(/149\.99 EUR/)).toBeInTheDocument();
    console.log("✅ Price display test passed (Test prikaza cijene prošao)");
  });

  it("shows quick actions (Spremi, Podijeli) on hover (prikazuje brze akcije na hoveru: Spremi, Podijeli)", async () => {
    render(<PersonalizedHero items={mockItems} />);
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    const card = screen.getByText(/Eksterni SSD Drive/i).closest("div");
    expect(card).toBeInTheDocument();

    fireEvent.mouseOver(card!);

    const buttons = screen.getAllByRole("button");
    expect(
      buttons.some((btn) => btn.getAttribute("aria-label") === "Spremi")
    ).toBe(true);
    expect(
      buttons.some((btn) => btn.getAttribute("aria-label") === "Podijeli")
    ).toBe(true);

    console.log("✅ Quick actions hover test passed (Test hover akcija prošao)");
  });
});
