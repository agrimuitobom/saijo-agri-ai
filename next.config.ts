import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // 旧タイムラインURLからの移行
    return [
      { source: "/timeline", destination: "/reports", permanent: true },
    ];
  },
};

export default nextConfig;
