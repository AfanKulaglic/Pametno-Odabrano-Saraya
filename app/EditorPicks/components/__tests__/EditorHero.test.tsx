import { render, screen } from "@testing-library/react";
import EditorHero from "../EditorHero";
import { CollectionMeta } from "../../../lib/types";

describe("EditorHero component (EditorHero komponenta)", () => {
// 🔹 (Here we create mock data that simulates what the component would receive as props)
const mockMeta: CollectionMeta = {
id: "collection_001",
title: "Pametno odabrano – Tech proizvodi",
subtitle: "Najbolje iz svijeta tehnologije",
intro: "Ekskluzivna kolekcija uređaja koje preporučuju stručnjaci.",
background_image: "/assets/wallpaper.jpg",
};

it("renders loading message if meta data is missing (prikazuje poruku o učitavanju ako meta podaci nedostaju)", () => {
render(<EditorHero meta={undefined as any} />);
expect(screen.getByText("Učitavanje kolekcije...")).toBeInTheDocument();
console.log("✅ Loading state test passed (Test za učitavanje prošao)");
});

it("renders hero section with title and intro (prikazuje hero sekciju sa naslovom i uvodnim tekstom)", () => {
render(<EditorHero meta={mockMeta} />);
expect(
screen.getByText("Pametno odabrano – Tech proizvodi")
).toBeInTheDocument();
expect(
screen.getByText("Ekskluzivna kolekcija uređaja koje preporučuju stručnjaci.")
).toBeInTheDocument();
console.log("✅ Hero text render test passed (Test prikaza teksta hero sekcije prošao)");
});

it("applies correct background image from meta data (ispravno primjenjuje pozadinsku sliku iz meta podataka)", () => {
const { container } = render(<EditorHero meta={mockMeta} />);
const heroDiv = container.querySelector(".relative");
expect(heroDiv).toHaveStyle(
`background-image: url('/assets/wallpaper.jpg')`
);
console.log("✅ Background image test passed (Test pozadinske slike prošao)");
});
});
