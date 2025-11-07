import { render, screen } from "@testing-library/react";
import EditorHero from "../BrandHero";
import "@testing-library/jest-dom";

describe("EditorHero component (komponenta za hero sekciju brenda)", () => {
  const mockBrand = {
    id: "brand_200",
    name: "TechNova",
    description: "Inovativna tehnološka kompanija sa fokusom na budućnost.",
    logo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj",
    marketplace_url: "https://example.com/technova",
  };

  it("renders loading message if brand data is missing (prikazuje poruku o učitavanju ako nema brenda)", () => {
    render(<EditorHero brand={undefined as any} />);
    expect(screen.getByText(/Učitavanje brenda.../i)).toBeInTheDocument();
    console.log("✅ Renders loading message if brand data is missing (Prikazuje poruku o učitavanju ako nema brenda)");
  });

  it("renders brand name (prikazuje naziv brenda)", () => {
    render(<EditorHero brand={mockBrand} />);
    expect(screen.getByText(/TechNova/i)).toBeInTheDocument();
    console.log("✅ Brand name is displayed (Naziv brenda je prikazan)");
  });

  it("renders brand description (prikazuje opis brenda)", () => {
    render(<EditorHero brand={mockBrand} />);
    expect(
      screen.getByText(/Inovativna tehnološka kompanija/i)
    ).toBeInTheDocument();
    console.log("✅ Brand description is displayed (Opis brenda je prikazan)");
  });

  it("renders visit brand link (prikazuje link za posjetu brendu)", () => {
    render(<EditorHero brand={mockBrand} />);
    const link = screen.getByRole("link", { name: /Posjeti brend na Saraya/i });
    expect(link).toHaveAttribute("href", "https://example.com/technova");
    expect(link).toHaveAttribute("target", "_blank");
    console.log("✅ Visit brand link is rendered (Link za posjetu brendu je prikazan)");
  });

  it("renders background logo style correctly (pozadinski logo se postavlja ispravno)", () => {
    const { container } = render(<EditorHero brand={mockBrand} />);
    const bgLogoDiv = container.querySelector("#brand-bg-logo") as HTMLElement;
    expect(bgLogoDiv).toHaveStyle(
      `background-image: url(${mockBrand.logo})`
    );
    console.log("✅ Background logo is applied correctly (Pozadinski logo je ispravno primijenjen)");
  });
});
