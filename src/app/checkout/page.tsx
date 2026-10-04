import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/CheckoutView";
import { PageIntro } from "@/components/layout/PageIntro";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <main id="main" className="container-page pb-20 pt-28 md:pb-28 md:pt-36">
      <PageIntro eyebrow="Secure checkout" title="Checkout" />
      <CheckoutView />
    </main>
  );
}
