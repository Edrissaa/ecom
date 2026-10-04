import { createPersistentStore } from "@/lib/persistent-store";
import { getProductById } from "@/data/products";
import type { StoredLine } from "@/types";

export const MAX_QUANTITY = 10;

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.floor(n)));

/** Accept only well-formed lines for products that still exist; merge duplicates. */
function parse(raw: unknown): readonly StoredLine[] {
  if (!Array.isArray(raw)) return [];
  const merged = new Map<string, number>();
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) continue;
    const { id, quantity } = entry as Record<string, unknown>;
    if (typeof id !== "string" || typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
    if (!getProductById(id)) continue;
    merged.set(id, clamp((merged.get(id) ?? 0) + quantity));
  }
  return [...merged].map(([id, quantity]) => ({ id, quantity }));
}

export const cartStore = createPersistentStore<readonly StoredLine[]>({
  key: "soleva.cart.v1",
  empty: [],
  parse,
});

export const cartActions = {
  add(id: string, quantity = 1) {
    cartStore.update((lines) =>
      lines.some((l) => l.id === id)
        ? lines.map((l) => (l.id === id ? { ...l, quantity: clamp(l.quantity + quantity) } : l))
        : [...lines, { id, quantity: clamp(quantity) }],
    );
  },
  setQuantity(id: string, quantity: number) {
    cartStore.update((lines) =>
      quantity < 1 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, quantity: clamp(quantity) } : l)),
    );
  },
  remove(id: string) {
    cartStore.update((lines) => lines.filter((l) => l.id !== id));
  },
  clear() {
    cartStore.update(() => []);
  },
};
