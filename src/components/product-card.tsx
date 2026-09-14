import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/shop-context";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  return <article className="group min-w-0">
    <Link to="/product/$productId" params={{ productId: product.id }} className="block overflow-hidden rounded-md bg-card"><img src={product.image} alt={product.name} loading="lazy" width={768} height={768} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" /></Link>
    <div className="pt-3"><p className="text-xs font-bold uppercase tracking-wider text-primary">{product.categoryLabel}</p><Link to="/product/$productId" params={{ productId: product.id }} className="mt-1 block font-display text-lg leading-tight hover:text-primary">{product.name}</Link><div className="mt-3 flex items-center justify-between gap-2"><span className="font-bold">{formatPrice(product.price)}</span><Button size="sm" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to basket`}><ShoppingBag /> Add</Button></div></div>
  </article>;
}