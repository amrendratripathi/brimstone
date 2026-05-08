import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { defaultProducts, PlainProduct, Variant } from "@/data/products";

const LS_KEY = "brimstone_products_v2";

function loadProducts(): PlainProduct[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed: PlainProduct[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultProducts.map((p) => ({ ...p, variants: p.variants.map((v) => ({ ...v })) }));
}

type ProductContextValue = {
  products: PlainProduct[];
  updateVariants: (id: string, variants: Variant[]) => void;
  addProduct: (p: PlainProduct) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<PlainProduct[]>(() => loadProducts());

  const persist = useCallback((list: PlainProduct[]) => {
    setProducts(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }, []);

  const updateVariants = useCallback(
    (id: string, variants: Variant[]) => {
      persist(products.map((p) => (p.id === id ? { ...p, variants } : p)));
    },
    [products, persist],
  );

  const addProduct = useCallback(
    (p: PlainProduct) => persist([...products, p]),
    [products, persist],
  );

  const deleteProduct = useCallback(
    (id: string) => persist(products.filter((p) => p.id !== id)),
    [products, persist],
  );

  const resetToDefaults = useCallback(() => {
    persist(defaultProducts.map((p) => ({ ...p, variants: p.variants.map((v) => ({ ...v })) })));
  }, [persist]);

  return (
    <ProductContext.Provider value={{ products, updateVariants, addProduct, deleteProduct, resetToDefaults }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}
