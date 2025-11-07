import type { Meta, StoryObj } from "@storybook/react";
import FixedBanner from "../../app/components/FixedBanner"; // prilagodi putanju ako je drugačija

// ✅ Meta konfiguracija
const meta: Meta<typeof FixedBanner> = {
  title: "Promotions/FixedBanner",
  component: FixedBanner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    imgUrl: "assets/verticalBanner.jpg",
  },
};

export default meta;
type Story = StoryObj<typeof FixedBanner>;

// ✅ Default — standardni banner (vidljiv između 800 i 2000px scrolla)
export const Default: Story = {
  args: {
    imgUrl: "assets/verticalBanner.jpg",
    showAt: 800,
    hideAt: 2000,
  },
};

// ✅ AlwaysVisible — prikazan bez obzira na scroll (za lakše testiranje u Storybooku)
export const AlwaysVisible: Story = {
  render: (args) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="relative w-full h-[100vh]">
        <div className="absolute top-1/2 right-10 -translate-y-1/2">
          <img
            src={args.imgUrl}
            alt="Always Visible Banner"
            className="w-72 h-auto rounded-xl shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  ),
};

// ✅ AnimatedEntry — prikazuje animaciju ulaska bannera s desne strane
export const AnimatedEntry: Story = {
  render: (args) => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-100">
      <div className="relative w-full h-[100vh] overflow-hidden">
        <FixedBanner {...args} showAt={0} hideAt={9999} />
        <p className="text-gray-700 text-lg text-center mt-10">
          Ovdje testiraš kako banner ulazi s animacijom pomoću Framer Motiona.
        </p>
      </div>
    </div>
  ),
  args: {
    imgUrl: "assets/verticalBanner.jpg",
  },
};

// ✅ DifferentImage — drugi primjer s realističnim promotivnim vizualom
export const DifferentImage: Story = {
  args: {
    imgUrl: "assets/verticalBanner.jpg",
    showAt: 600,
    hideAt: 2500,
  },
};

// ✅ NarrowBanner — manji i uži oglas (npr. vertikalni mini-ad)
export const NarrowBanner: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <img
        src="assets/verticalBanner.jpg"
        alt="Narrow Banner"
        className="w-[150px] h-auto rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform"
      />
    </div>
  ),
};
