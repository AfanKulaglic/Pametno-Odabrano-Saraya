import type { Meta, StoryObj } from "@storybook/react";
import CtaButton from "../../app/components/CtaButtons"; // prilagodi putanju ako je drugačija

// ✅ Osnovni Storybook meta podaci
const meta: Meta<typeof CtaButton> = {
  title: "Elements/CtaButton",
  component: CtaButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CtaButton>;

// ✅ Default — osnovni CTA gumb
export const Default: Story = {
  args: {
    url: "https://saraya.ba",
    itemId: "item_001",
    companyId: "comp_apple",
    collectionId: "coll_pametno_odabrano",
  },
};

// ✅ Varijanta za drugu kampanju
export const GalaxyPromo: Story = {
  args: {
    url: "https://samsung.com/galaxybook4",
    itemId: "item_002",
    companyId: "comp_samsung",
    collectionId: "coll_smart_devices",
  },
};

// ✅ Varijanta sa drugim tekstom (možeš testirati custom label ako dodaš prop)
export const CustomLink: Story = {
  render: () => (
    <a
      href="https://apple.com/macbook-pro"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-indigo-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-indigo-700 transition"
    >
      Pogledaj na Apple
    </a>
  ),
};

// ✅ Nevažeći link (edge case test)
export const InvalidUrl: Story = {
  args: {
    url: "#",
    itemId: "item_003",
    companyId: "comp_xiaomi",
    collectionId: "coll_test",
  },
};
