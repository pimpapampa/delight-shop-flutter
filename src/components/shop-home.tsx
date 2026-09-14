import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import heroImage from "@/assets/bakery-hero.jpg";

export function ShopHome({ query = "" }: { query?: string }) {
  const normalized = query.trim().toLowerCase();
  const visibleProducts = normalized
    ? products.filter((product) => `${product.name} ${product.categoryLabel}`.toLowerCase().includes(normalized))
    : products;

  return <>
    {!normalized && <section className="relative isolate min-h-[480px] overflow-hidden md:min-h-[560px]">
      <img src={heroImage} alt="Strawberry cream cake in a cozy bakery kitchen" width={1536} height={768} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-end px-5 pb-14 md:min-h-[560px] md:items-center md:pb-0">
        <div className="max-w-2xl text-hero-foreground">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"><Sparkles className="size-4" /> Freshly made, happily shared</p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">Bake joy at home</h1>
          <p className="mt-5 max-w-lg text-base text-hero-foreground/90 sm:text-lg">Small-batch treats, trusted baking staples, and everything you need for your next sweet idea.</p>
          <Button asChild size="lg" className="mt-7"><Link to="/shop" search={{}}>Shop bestsellers <ArrowRight /></Link></Button>
        </div>
      </div>
    </section>}

    {!normalized && <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
        {categories.map((category) => <Link key={category.slug} to="/category/$categoryId" params={{ categoryId: category.slug }} className="group text-center">
          <div className={`mx-auto aspect-square w-full max-w-48 overflow-hidden rounded-full ${category.tone} transition-transform duration-300 group-hover:-translate-y-1`}><img src={category.image} alt="" loading="lazy" width={768} height={768} className="size-full object-cover p-2 rounded-full" /></div>
          <h2 className="mt-4 font-display text-lg sm:text-xl">{category.name}</h2>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary">Browse <ArrowRight className="size-3" /></span>
        </Link>)}
      </div>
    </section>}

    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">From our kitchen</p><h2 className="mt-2 font-display text-3xl sm:text-4xl">{normalized ? `Results for “${query}”` : "Our favorites"}</h2></div>
        {!normalized && <Link to="/shop" search={{}} className="hidden items-center gap-1 text-sm font-bold text-primary sm:flex">View all <ArrowRight className="size-4" /></Link>}
      </div>
      {visibleProducts.length > 0 ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-md border border-dashed border-border bg-card px-6 py-16 text-center"><p className="font-display text-2xl">No treats found</p><p className="mt-2 text-muted-foreground">Try another search or browse all products.</p></div>}
    </section>
  </>;
}