/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SANITY_STUDIO_TOKEN: process.env.SANITY_STUDIO_TOKEN
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig
