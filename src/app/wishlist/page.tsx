import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { WishlistView } from "@/components/product/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <main id="main" className="container-page pb-20 pt-28 md:pb-28 md:pt-36">
      <PageIntro eyebrow="Saved for later" title="Your Wishlist" />
      <WishlistView />
    </main>
  );
}
