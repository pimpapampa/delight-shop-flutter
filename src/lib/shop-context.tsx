import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./catalog";

type CartLine = { product: Product; quantity: number };
type ShopContextValue = {
  cart: CartLine[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const addToCart = (product: Product, quantity = 1) => setCart((lines) => {
    const match = lines.find((line) => line.product.id === product.id);
    return match
      ? lines.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line)
      : [...lines, { product, quantity }];
  });
  const updateQuantity = (id: string, quantity: number) => setCart((lines) =>
    quantity < 1 ? lines.filter((line) => line.product.id !== id) : lines.map((line) => line.product.id === id ? { ...line, quantity } : line),
  );
  const removeFromCart = (id: string) => setCart((lines) => lines.filter((line) => line.product.id !== id));
  const value = useMemo(() => ({ cart, addToCart, updateQuantity, removeFromCart, cartCount: cart.reduce((sum, line) => sum + line.quantity, 0) }), [cart]);
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used inside ShopProvider");
  return value;
}