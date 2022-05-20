/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  compress: false,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  }
}
