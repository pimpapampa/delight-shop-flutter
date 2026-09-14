import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBasket, UserRound, X } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useShop } from "@/lib/shop-context";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About us" },
  { to: "/payment-policy", label: "Payment policy" },
  { to: "/shipping-terms", label: "Shipping terms" },
] as const;

export function ShopShell({ children }: { children: ReactNode }) {
  const { cartCount } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    navigate({ to: "/shop", search: { q: query } });
    setSearchOpen(false);
  };
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="The Baking Nook home">
          <span className="grid size-11 place-items-center rounded-md bg-primary font-display text-2xl text-primary-foreground">B</span>
          <span className="font-display text-xl uppercase tracking-wide sm:text-3xl">The Baking Nook</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen((open) => !open)} aria-label="Search"><Search /></Button>
          <Button variant="ghost" size="icon" aria-label="Log in"><UserRound /></Button>
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label={`Basket with ${cartCount} items`}><ShoppingBasket />{cartCount > 0 && <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{cartCount}</span>}</Link>
          </Button>
          <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
            <SheetContent className="bg-background"><SheetTitle className="font-display text-2xl">Menu</SheetTitle><nav className="mt-10 flex flex-col gap-5">{links.map((link) => <Link key={link.to} to={link.to} className="text-lg font-semibold">{link.label}</Link>)}</nav></SheetContent>
          </Sheet>
        </div>
      </div>
      {searchOpen && <form onSubmit={submitSearch} className="border-t border-border bg-card px-4 py-3"><div className="mx-auto flex max-w-2xl gap-2"><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cakes, tools, and mixes…" aria-label="Search products"/><Button type="submit">Search</Button><Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></Button></div></form>}
      <nav className="hidden h-12 items-center justify-center gap-10 border-t border-border/60 md:flex">{links.map((link) => <Link key={link.to} to={link.to} className="text-sm font-bold uppercase tracking-wide text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{link.label}</Link>)}</nav>
    </header>
    <main>{children}</main>
    <footer className="mt-20 bg-footer text-footer-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3"><div><p className="font-display text-2xl">The Baking Nook</p><p className="mt-3 max-w-xs text-sm text-footer-foreground/75">Made with a little flour, a lot of care, and plenty of joy.</p></div><div><h2 className="font-bold">Contact</h2><p className="mt-3 text-sm">hello@thebakingnook.com</p><p className="mt-1 text-sm">Monday–Friday, 9am–5pm</p></div><div><h2 className="font-bold">Follow along</h2><p className="mt-3 text-sm">Instagram · Pinterest · Facebook</p></div></div></footer>
  </div>;
}