import { createFileRoute } from "@tanstack/react-router";
import { ShopHome } from "@/components/shop-home";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "The Baking Nook — Bake Joy at Home" },
    { name: "description", content: "Discover small-batch cakes, baking staples, tools, and drink mixes at The Baking Nook." },
    { property: "og:title", content: "The Baking Nook — Bake Joy at Home" },
    { property: "og:description", content: "Discover small-batch cakes, baking staples, tools, and drink mixes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: () => <ShopHome />,
});
