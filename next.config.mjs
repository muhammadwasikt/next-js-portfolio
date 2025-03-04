/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], 
  },
  experimental: {
    optimizeCss: true, 
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", 
  },
};

export default nextConfig;
