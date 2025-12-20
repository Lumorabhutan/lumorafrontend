import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'res.cloudinary.com'], // allow images from backend and Cloudinary
  },
};

export default nextConfig;