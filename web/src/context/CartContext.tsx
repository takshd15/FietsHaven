import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  slug: string;
  title: string;
  price: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  totalQuantity: number;
  addToCart: (line: CartLine) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  const addToCart = useCallback((line: CartLine) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.slug === line.slug);
      if (i === -1) {
        return [...prev, { ...line }];
      }
      const next = [...prev];
      next[i] = {
        ...next[i],
        quantity: next[i].quantity + line.quantity,
      };
      return next;
    });
  }, []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, totalQuantity, addToCart }),
    [items, totalQuantity, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
