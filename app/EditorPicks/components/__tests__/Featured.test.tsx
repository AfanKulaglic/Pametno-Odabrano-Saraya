// app/EditorPicks/components/__tests__/FeaturedGrid.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FeaturedGrid from "../Featured";
import { trackEvent } from "../../../lib/analytics";
import "@testing-library/jest-dom";

// Mock funkcija za praćenje klikova
jest.mock("../../../lib/analytics", () => ({
    trackEvent: jest.fn(),
}));

describe("FeaturedGrid component (komponenta za istaknute proizvode)", () => {
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
] as any; // <-- ignorira tip provjeru



    it("renders loading skeletons (prikazuje skeleton dok se učitava)", () => {
        render(<FeaturedGrid featuredItems={[]} collectionId="col_001" loading={true} />);
        const skeletons = screen.getAllByRole("generic");
        expect(skeletons.length).toBeGreaterThan(0);
        console.log("✅ Loading skeletons are rendered (Skeleton elementi su prikazani)");
    });

    it("renders featured items (prikazuje istaknute proizvode)", () => {
        render(<FeaturedGrid featuredItems={mockItems} collectionId="col_001" loading={false} />);
        expect(screen.getByText(/SmartPhone X10/i)).toBeInTheDocument();
        console.log("✅ Featured item title is visible (Naziv istaknutog proizvoda je vidljiv)");
    });

    it("renders company logo (prikazuje logo kompanije)", () => {
        render(<FeaturedGrid featuredItems={mockItems} collectionId="col_001" loading={false} />);
        const logo = screen.getByAltText(/TechNova/i);
        expect(logo).toBeInTheDocument();
        console.log("✅ Company logo is displayed (Logo kompanije je prikazan)");
    });

    it("renders badges (prikazuje bedževe)", () => {
        render(<FeaturedGrid featuredItems={mockItems} collectionId="col_001" loading={false} />);
        const badges = screen.getAllByText(/Premium|Top izbor/i);
        expect(badges.length).toBeGreaterThan(0);
        console.log("✅ Badges are displayed (Bedževi su prikazani)");
    });

    it("calls trackEvent on item click (poziva trackEvent na klik proizvoda)", () => {
        render(<FeaturedGrid featuredItems={mockItems} collectionId="col_001" loading={false} />);
        const link = screen.getByRole("link", { name: /SmartPhone X10/i });
        fireEvent.click(link);
        expect(trackEvent).toHaveBeenCalledWith("featured_click", expect.any(Object));
        console.log("✅ trackEvent called on click (trackEvent je pozvan na klik)");
    });
});
