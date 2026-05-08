import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { parseRupees } from "@/lib/pricing";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  category?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: { id: string; name: string; price: string | number; image?: string; category?: string }, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "cart";

function readCart(): CartItem[] {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = items.reduce((acc, it) => acc + it.qty * it.price, 0);

    return {
      items,
      count,
      subtotal,
      addItem: (item, qty = 1) => {
        const price = parseRupees(item.price);
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.id === item.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...prev, { id: item.id, name: item.name, price, qty, image: item.image, category: item.category }];
        });
      },
      updateQty: (id, qty) => {
        setItems((prev) =>
          prev
            .map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(99, qty)) } : it))
            .filter((it) => it.qty > 0),
        );
      },
      removeItem: (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

