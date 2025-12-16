import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Ensure images are unoptimized for static export if using next/image, 
  // though we are primarily using <img> tags currently.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
