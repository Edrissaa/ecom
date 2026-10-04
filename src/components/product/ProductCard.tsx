import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ProductActions } from "@/components/product/ProductActions";
import { WishlistButton } from "@/components/product/WishlistButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

const SIZES = "(min-width: 1440px) 432px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.compareAtPrice !== undefined;

  return (
    <article className="group/card flex h-full flex-col transition-transform duration-500 ease-premium motion-safe:hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand">
        <Image
          src={product.image}
          alt={product.imageAlt}
          sizes={SIZES}
          placeholder="blur"
          className="size-full object-cover transition-transform duration-700 ease-premium group-hover/card:scale-[1.04]"
        />
        <WishlistButton productId={product.id} name={product.name} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="flex items-baseline gap-2 tabular-nums">
          <span className="text-xl font-bold tracking-tight text-espresso">
            {onSale && <span className="sr-only">Now </span>}
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-muted line-through">
              <span className="sr-only">Was </span>
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </p>
        {product.badge && <Badge>{product.badge}</Badge>}
      </div>

      <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-espresso">{product.name}</h3>
      <p className="mt-1 line-clamp-2 min-h-[2.6em] text-[13px] leading-[1.3] text-muted">{product.description}</p>

      <div className="mt-auto">
        <ProductActions product={product} />
      </div>
    </article>
  );
}
