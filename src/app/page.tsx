import { CollectionMosaic } from "@/components/home/CollectionMosaic";
import { EditorialCards } from "@/components/home/EditorialCards";
import { HeroSection } from "@/components/home/HeroSection";
import { LifestyleBanner } from "@/components/home/LifestyleBanner";
import { ProductSection } from "@/components/home/ProductSection";
import { newDrops, summerCollection } from "@/data/products";

export default function HomePage() {
  return (
    <main id="main">
      <HeroSection />
      <EditorialCards />
      <ProductSection
        id="new-arrivals"
        title="Newly Dropped Collections"
        subtitle="Fresh silhouettes, built for movement — new pairs landing every week."
        products={newDrops}
        href="/shop/new-arrivals"
        className="md:pt-28"
      />
      <CollectionMosaic />
      <ProductSection
        id="summer"
        title="Summer Collections"
        subtitle="New season. New movement. Light canvas and sun-washed colour for long days."
        products={summerCollection}
        href="/shop/summer"
      />
      <LifestyleBanner />
    </main>
  );
}
