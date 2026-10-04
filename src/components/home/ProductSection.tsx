import { ProductGrid } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: readonly Product[];
  href: string;
  cta?: string;
  className?: string;
}

/** Heading + product grid + "see more" — used for both collection sections. */
export function ProductSection({ id, title, subtitle, products, href, cta = "See More Collection", className }: ProductSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("container-page py-14 md:py-20", className)}>
      <Reveal>
        <SectionHeading id={headingId} title={title} subtitle={subtitle} />
      </Reveal>
      <Reveal className="mt-10 md:mt-14">
        <ProductGrid products={products} />
      </Reveal>
      <div className="mt-12 flex justify-center md:mt-16">
        <ButtonLink href={href} variant="secondary" size="md" className="px-8">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
