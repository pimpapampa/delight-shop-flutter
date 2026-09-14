import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/catalog";
import { useShop } from "@/lib/shop-context";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [
    { title: "Your Basket — The Baking Nook" }, { name: "description", content: "Review your Baking Nook order." },
    { property: "og:title", content: "Your Basket — The Baking Nook" }, { property: "og:description", content: "Review your Baking Nook order." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: CartPage,
});

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useShop();
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  if (!cart.length) return <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-5 text-center"><ShoppingBasket className="size-14 text-primary" /><h1 className="mt-5 font-display text-4xl">Your basket is empty</h1><p className="mt-3 text-muted-foreground">There’s always room for one more sweet thing.</p><Button asChild size="lg" className="mt-7"><Link to="/shop">Browse the shop</Link></Button></div>;
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16"><h1 className="font-display text-4xl sm:text-5xl">Your basket</h1><div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]"><div className="divide-y divide-border">{cart.map(({ product, quantity }) => <article key={product.id} className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr_auto]"><Link to="/product/$productId" params={{ productId: product.id }}><img src={product.image} alt={product.name} width={768} height={768} className="aspect-square rounded-md object-cover" /></Link><div><Link to="/product/$productId" params={{ productId: product.id }} className="font-display text-lg">{product.name}</Link><p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)} each</p><div className="mt-4 flex items-center gap-1"><Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease quantity"><Minus /></Button><span className="w-10 text-center font-bold">{quantity}</span><Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity"><Plus /></Button><Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 /></Button></div></div><p className="hidden font-bold sm:block">{formatPrice(product.price * quantity)}</p></article>)}</div><aside className="h-fit rounded-md bg-card p-6 shadow-shop"><h2 className="font-display text-2xl">Order summary</h2><div className="mt-6 flex justify-between border-b border-border pb-4"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p className="mt-4 text-sm text-muted-foreground">Shipping and taxes are calculated at checkout.</p><Button size="lg" className="mt-6 w-full">Continue to checkout</Button></aside></div></div>;
}