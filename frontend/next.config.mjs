/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["source.unsplash.com", "via.placeholder.com"],
    unoptimized: true,
  },
};

export default nextConfig;
