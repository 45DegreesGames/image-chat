import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/config',
        destination: '/setup',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
