import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  // Las fichas vivían en /colchones/<slug>/; se conservan las URL antiguas.
  async redirects() {
    return [
      { source: "/colchones/:slug", destination: "/producto/:slug", permanent: true },
      { source: "/colchones", destination: "/tienda", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 solo optimiza las calidades declaradas: si falta una, avisa en consola.
    qualities: [74, 76, 78, 80, 82, 84],
  },
};

export default nextConfig;
