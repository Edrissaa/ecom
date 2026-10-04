import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getShopCollection, shopCollections } from "@/data/collections";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return shopCollections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = getShopCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/shop/${collection.slug}` },
  };
}

export default async function ShopPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const collection = getShopCollection(slug);
  if (!collection) notFound();

  const items = products.filter(collection.filter);

  return (
    <main id="main" className="container-page pb-20 pt-28 md:pb-28 md:pt-36">
      <PageIntro eyebrow={collection.eyebrow} title={collection.title} description={collection.description} />

      <nav aria-label="Browse collections" className="mt-10 flex flex-wrap justify-center gap-2">
        {shopCollections.map((c) => {
          const current = c.slug === collection.slug;
          return (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              aria-current={current ? "page" : undefined}
              className={cn(
                "inline-flex h-11 items-center rounded-full border px-5 text-[13px] font-semibold transition-colors duration-200",
                current ? "border-espresso bg-espresso text-ivory" : "border-line bg-sand text-espresso hover:border-beige hover:bg-beige/60",
              )}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.12em] text-muted">
        {items.length} {items.length === 1 ? "style" : "styles"}
      </p>
      <div className="mt-6">
        <ProductGrid products={items} />
      </div>
    </main>
  );
}
