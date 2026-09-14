import { createFileRoute } from "@tanstack/react-router";
import { ShopHome } from "@/components/shop-home";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q.slice(0, 100) : "" }),
  head: () => ({ meta: [
    { title: "Shop Baking Favorites — The Baking Nook" },
    { name: "description", content: "Shop small-batch cakes, baking staples, tools, and drink mixes from The Baking Nook." },
    { property: "og:title", content: "Shop Baking Favorites — The Baking Nook" },
    { property: "og:description", content: "Shop small-batch cakes, baking staples, tools, and drink mixes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ShopPage,
});

function ShopPage() { const { q } = Route.useSearch(); return <ShopHome query={q} />; }