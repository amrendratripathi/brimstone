import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { defaultProducts, Product } from "@/data/products";

const LS_KEY = "brimstone_products";

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed: Product[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultProducts;
}

type ProductContextValue = {
  products: Product[];
  updatePrice: (id: string, price: number, priceDisplay: string) => void;
  addProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  const persist = useCallback((list: Product[]) => {
    setProducts(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }, []);

  const updatePrice = useCallback(
    (id: string, price: number, priceDisplay: string) => {
      persist(products.map((p) => (p.id === id ? { ...p, price, priceDisplay } : p)));
    },
    [products, persist],
  );

  const addProduct = useCallback(
    (p: Product) => {
      persist([...products, p]);
    },
    [products, persist],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      persist(products.filter((p) => p.id !== id));
    },
    [products, persist],
  );

  const resetToDefaults = useCallback(() => {
    persist(defaultProducts);
  }, [persist]);

  return (
    <ProductContext.Provider value={{ products, updatePrice, addProduct, deleteProduct, resetToDefaults }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
}
