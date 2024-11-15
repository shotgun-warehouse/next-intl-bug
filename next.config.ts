import type { NextConfig } from "next";
import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin();

let nextConfig: NextConfig = {
  experimental: {
    after: true,
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: "/:locale/venues",
        destination: "/:locale/venues/-",
      }
    ];
  },
  async headers() {
    return [];
  },
  // Disable ESLint and TypeScript checks during build.
  // These checks are done in the CI pipeline.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

nextConfig = withNextIntl(nextConfig);

export default nextConfig;
