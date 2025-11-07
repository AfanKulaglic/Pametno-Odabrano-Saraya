import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "../../app/components/Navbar"; // prilagodi putanju

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

// ✅ Osnovna verzija
export const Default: Story = {
  render: () => <Navbar />,
};

// ✅ S demo pozadinom (npr. simulacija stranice ispod)
export const WithPageContent: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-8 text-center text-gray-700">
        <h1 className="text-3xl font-bold mb-4">Dobrodošli!</h1>
        <p>
          Ovo je demo stranica ispod navigacije za testiranje izgleda bannera i
          prelaza između sekcija.
        </p>
        <div className="mt-12 text-gray-500">
          <p>Pomaknite se za pregled vizualne hijerarhije...</p>
        </div>
      </main>
    </div>
  ),
};

// ✅ Dark tema
export const DarkTheme: Story = {
  render: () => (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <p className="text-gray-300 text-center mt-8">
        Ovo je tamna pozadina — idealna za test kontrasta logotipa i teksta.
      </p>
    </div>
  ),
};
