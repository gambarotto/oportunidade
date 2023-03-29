/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@infor/services-app','@infor/ui'],
}

module.exports = nextConfig
