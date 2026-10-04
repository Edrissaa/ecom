import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback. Every static import is also hashed + immutably cached.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an allow-list of `quality` values.
    qualities: [75, 85],
    // To serve photography from a CDN instead of src/assets, allow it here, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },
};

export default nextConfig;
