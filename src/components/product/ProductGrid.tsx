import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

/** 3 columns on desktop, 2 on tablet, 1 on phones. Maps straight over product data. */
export function ProductGrid({ products }: { products: readonly Product[] }) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
