import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ShopProvider } from "@/components/providers/ShopProvider";
import { site } from "@/data/site";

// Variable fonts: one file each, self-hosted by Next at build time.
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: site.name, url: site.url, email: site.email },
    { "@type": "WebSite", name: site.name, url: site.url, description: site.description },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          // JSON.stringify output with "<" escaped, so it can't break out of the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <ShopProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-espresso px-4 py-3 text-sm font-semibold text-ivory transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
