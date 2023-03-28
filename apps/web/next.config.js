/* module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  
}; */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['services-app','ui'],
}

module.exports = nextConfig
