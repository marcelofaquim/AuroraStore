import { create } from "zustand";
import type { Product } from "@/lib/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (product) =>
    set((state) => {
      const idx = state.items.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = {
          ...items[idx],
          quantity: items[idx].quantity + 1
        };
        return { items };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId)
    })),
  clear: () => set({ items: [] }),
  total: () =>
    get()
      .items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
}));
