import { createFileRoute } from "@tanstack/react-router";
import { ShopHome } from "@/components/shop-home";

function parseShopSearch(search: Record<string, unknown>): { q?: string } {
  return typeof search["q"] === "string" ? { q: search["q"].slice(0, 100) } : {};
}

export const Route = createFileRoute("/shop")({
  validateSearch: parseShopSearch,
  head: () => ({ meta: [
    { title: "Shop Baking Favorites — The Baking Nook" },
    { name: "description", content: "Shop small-batch cakes, baking staples, tools, and drink mixes from The Baking Nook." },
    { property: "og:title", content: "Shop Baking Favorites — The Baking Nook" },
    { property: "og:description", content: "Shop small-batch cakes, baking staples, tools, and drink mixes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ShopPage,
});

function ShopPage() { const { q } = Route.useSearch(); return <ShopHome query={q ?? ""} />; }