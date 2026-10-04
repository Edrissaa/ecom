import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "Collections", href: "/#collections" },
  { label: "New Arrivals", href: "/shop/new-arrivals" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Men", href: "/shop/men" },
      { label: "Women", href: "/shop/women" },
      { label: "New Arrivals", href: "/shop/new-arrivals" },
      { label: "Collections", href: "/#collections" },
      { label: "Sale", href: "/shop/sale" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/help/privacy" },
      { label: "Terms & Conditions", href: "/help/terms" },
      { label: "Returns Policy", href: "/help/returns" },
      { label: "Shipping", href: "/help/shipping" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: "/help/faqs" },
      { label: "Contact Us", href: "/help/contact" },
      { label: "Track Order", href: "/help/track-order" },
      { label: "Size Guide", href: "/help/size-guide" },
    ],
  },
];

// Swap these for the brand's real profiles before launch.
export const socialLinks: NavItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
];

export const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];
