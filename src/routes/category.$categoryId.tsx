import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/catalog";

export const Route = createFileRoute("/category/$categoryId")({
  loader: ({ params }) => {
    const category = categories.find((item) => item.slug === params.categoryId);
    if (!category) throw notFound();
    return category;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.name ?? "Category"} — The Baking Nook` },
    { name: "description", content: `Browse ${loaderData?.name ?? "baking favorites"} from The Baking Nook.` },
    { property: "og:title", content: `${loaderData?.name ?? "Category"} — The Baking Nook` },
    { property: "og:description", content: `Browse ${loaderData?.name ?? "baking favorites"} from The Baking Nook.` },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: CategoryPage,
});

function CategoryPage() {
  const category = Route.useLoaderData();
  const categoryProducts = products.filter((product) => product.category === category.slug);
  return <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
    <Link to="/shop" search={{}} className="inline-flex items-center gap-2 text-sm font-bold text-primary"><ArrowLeft className="size-4" /> All products</Link>
    <div className="mt-8 flex items-center gap-5"><div className={`size-24 shrink-0 overflow-hidden rounded-full ${category.tone}`}><img src={category.image} alt="" width={768} height={768} className="size-full rounded-full object-cover p-1" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Shop category</p><h1 className="mt-1 font-display text-4xl sm:text-5xl">{category.name}</h1></div></div>
    <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">{categoryProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
  </div>;
}