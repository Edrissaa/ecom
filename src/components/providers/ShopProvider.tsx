"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cartActions, cartStore } from "@/lib/cart-store";
import { wishlistActions, wishlistStore } from "@/lib/wishlist-store";
import { getProductById } from "@/data/products";
import type { CartLine } from "@/types";

/* ------------------------------ cart ------------------------------ */
interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

/* ---------------------------- overlays ---------------------------- */
export type OverlayName = "cart" | "search" | "menu";

interface OverlayContextValue {
  active: OverlayName | null;
  open: (name: OverlayName) => void;
  close: () => void;
}

/* ---------------------------- wishlist ---------------------------- */
interface WishlistContextValue {
  ids: readonly string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const OverlayContext = createContext<OverlayContextValue | null>(null);
const WishlistContext = createContext<WishlistContextValue | null>(null);

function useRequired<T>(value: T | null, hook: string): T {
  if (value === null) throw new Error(`${hook} must be used inside <ShopProvider>`);
  return value;
}

export const useCart = () => useRequired(useContext(CartContext), "useCart");
export const useOverlay = () => useRequired(useContext(OverlayContext), "useOverlay");
export const useWishlist = () => useRequired(useContext(WishlistContext), "useWishlist");

export function ShopProvider({ children }: { children: ReactNode }) {
  const storedLines = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const wishlistIds = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );

  const [active, setActive] = useState<OverlayName | null>(null);
  // `key` forces a fresh node so repeated identical messages are announced again.
  const [announcement, setAnnouncement] = useState({ key: 0, text: "" });

  const announce = useCallback((text: string) => setAnnouncement((a) => ({ key: a.key + 1, text })), []);

  const cart = useMemo<CartContextValue>(() => {
    const lines = storedLines.flatMap((line) => {
      const product = getProductById(line.id);
      return product ? [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }] : [];
    });
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
      addItem: (id, quantity = 1) => {
        cartActions.add(id, quantity);
        const product = getProductById(id);
        if (product) announce(`${product.name} added to your bag.`);
      },
      setQuantity: cartActions.setQuantity,
      removeItem: (id) => {
        cartActions.remove(id);
        const product = getProductById(id);
        if (product) announce(`${product.name} removed from your bag.`);
      },
      clear: cartActions.clear,
    };
  }, [storedLines, announce]);

  const overlay = useMemo<OverlayContextValue>(
    () => ({ active, open: setActive, close: () => setActive(null) }),
    [active],
  );

  const wishlist = useMemo<WishlistContextValue>(
    () => ({
      ids: wishlistIds,
      has: (id) => wishlistIds.includes(id),
      toggle: (id) => {
        const product = getProductById(id);
        const adding = !wishlistIds.includes(id);
        wishlistActions.toggle(id);
        if (product) announce(adding ? `${product.name} saved to your wishlist.` : `${product.name} removed from your wishlist.`);
      },
    }),
    [wishlistIds, announce],
  );

  return (
    <CartContext.Provider value={cart}>
      <OverlayContext.Provider value={overlay}>
        <WishlistContext.Provider value={wishlist}>
          {children}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            <span key={announcement.key}>{announcement.text}</span>
          </div>
        </WishlistContext.Provider>
      </OverlayContext.Provider>
    </CartContext.Provider>
  );
}
