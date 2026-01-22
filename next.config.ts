import type { NextConfig } from "next";

const isStaging = process.env.NEXT_PUBLIC_DEPLOY_ENV === "staging";

const nextConfig: NextConfig = {
  output: "export",

  // Required for static export when not served from /
  basePath: isStaging ? "/int/staging" : undefined,
  assetPrefix: isStaging ? "/int/staging/" : undefined,

  // Ensure images are unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Recommended for static hosting
  trailingSlash: true,
};

export default nextConfig;

