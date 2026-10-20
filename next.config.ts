import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // Disable floating dev badge and other dev tools
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
