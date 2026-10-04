export const site = {
  name: "Soleva",
  title: "Soleva — Premium Sneakers & Everyday Style",
  tagline: "Premium sneakers for every step.",
  description: "Discover premium sneakers, fresh releases and curated everyday footwear from Soleva.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@soleva.example",
  /** Orders at or above this subtotal ship free. Used by the cart and the shipping page. */
  freeShippingThreshold: 250,
  /** Flat standard-delivery rate below the free-shipping threshold. */
  standardShipping: 9.95,
  currency: "USD",
  locale: "en-US",
} as const;
