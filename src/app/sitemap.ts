import type { MetadataRoute } from "next";
import { shopCollections } from "@/data/collections";
import { helpPages } from "@/data/help";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    ...shopCollections.map((c) => ({ url: url(`/shop/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...helpPages.map((p) => ({ url: url(`/help/${p.slug}`), changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
