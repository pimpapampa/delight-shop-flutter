import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { formatPrice, products } from "@/lib/catalog";
import { useShop } from "@/lib/shop-context";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => { const product = products.find((item) => item.id === params.productId); if (!product) throw notFound(); return product; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Product"} — The Baking Nook` },
    { name: "description", content: loaderData?.description ?? "A Baking Nook favorite." },
    { property: "og:title", content: `${loaderData?.name ?? "Product"} — The Baking Nook` },
    { property: "og:description", content: loaderData?.description ?? "A Baking Nook favorite." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const suggestions = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);
  return <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
    <Link to="/category/$categoryId" params={{ categoryId: product.category }} className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft className="size-4" /> {product.categoryLabel}</Link>
    <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14"><div className="overflow-hidden rounded-md bg-card"><img src={product.image} alt={product.name} width={768} height={768} className="aspect-square size-full object-cover" /></div><div className="self-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{product.categoryLabel}</p><h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1><p className="mt-4 text-2xl font-bold">{formatPrice(product.price)}</p><p className="mt-6 max-w-lg leading-7 text-muted-foreground">{product.description}</p><div className="mt-8 flex flex-wrap items-center gap-3"><div className="flex h-12 items-center rounded-md border border-border bg-card"><Button variant="ghost" size="icon" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus /></Button><span className="w-10 text-center font-bold">{quantity}</span><Button variant="ghost" size="icon" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus /></Button></div><Button size="lg" onClick={() => addToCart(product, quantity)}><ShoppingBag /> Add to basket</Button></div><div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground"><p>Freshly prepared · Carefully packed</p><p className="mt-2">Pickup and delivery options shown at checkout</p></div></div></div>
    {suggestions.length > 0 && <section className="mt-20"><h2 className="font-display text-3xl">You might also like</h2><div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">{suggestions.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
  </div>;
}