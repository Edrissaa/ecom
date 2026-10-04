import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-[70dvh] flex-col items-center justify-center pb-20 pt-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-walnut">404</p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">This page took a wrong step.</h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">The page you were looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" arrow>
          Back to Home
        </ButtonLink>
        <ButtonLink href="/shop/all" variant="outline">
          Browse Sneakers
        </ButtonLink>
      </div>
    </main>
  );
}
