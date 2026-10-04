import { createPersistentStore } from "@/lib/persistent-store";
import { getProductById } from "@/data/products";

function parse(raw: unknown): readonly string[] {
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.filter((id): id is string => typeof id === "string" && !!getProductById(id)))];
}

export const wishlistStore = createPersistentStore<readonly string[]>({
  key: "soleva.wishlist.v1",
  empty: [],
  parse,
});

export const wishlistActions = {
  toggle(id: string) {
    wishlistStore.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  },
};
