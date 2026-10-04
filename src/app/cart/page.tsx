import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageIntro } from "@/components/layout/PageIntro";

export const metadata: Metadata = {
  title: "Your Bag",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <main id="main" className="container-page pb-20 pt-28 md:pb-28 md:pt-36">
      <PageIntro eyebrow="Bag" title="Your Bag" />
      <CartView />
    </main>
  );
}
