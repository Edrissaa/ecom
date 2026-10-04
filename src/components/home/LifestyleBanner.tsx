import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { bannerImage } from "@/data/images";

/** Closing campaign banner, just before the footer. */
export function LifestyleBanner() {
  return (
    <section aria-labelledby="campaign-heading" className="container-page pb-16 pt-4 md:pb-24 md:pt-6">
      <Reveal>
        <div
          data-surface="dark"
          className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden rounded-xl text-center lg:min-h-[420px]"
        >
          <Image
            src={bannerImage.src}
            alt={bannerImage.alt}
            fill
            sizes="(min-width: 1440px) 1344px, 100vw"
            placeholder="blur"
            className="object-cover [object-position:10%_50%] md:[object-position:50%_50%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-espresso/20 to-espresso/40" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(33,23,15,0.55),transparent_65%)]" />

          <div className="relative px-6 py-16 sm:px-10">
            <h2
              id="campaign-heading"
              className="mx-auto max-w-[18ch] text-balance font-serif text-[32px] font-bold leading-[1.1] tracking-[-0.015em] text-ivory sm:max-w-[22ch] sm:text-4xl lg:max-w-[24ch] lg:text-5xl"
            >
              Build Your Style With Every Confident Step.
            </h2>
            <div className="mt-8">
              <ButtonLink href="/shop/all" variant="light" size="lg" arrow>
                Shop Now
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
