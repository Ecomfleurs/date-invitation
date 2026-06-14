/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'ibb.co' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 768, 1080, 1200],
    imageSizes: [64, 128, 256],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}
module.exports = nextConfig
