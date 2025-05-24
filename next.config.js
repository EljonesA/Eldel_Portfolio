/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SANITY_STUDIO_TOKEN: process.env.SANITY_STUDIO_TOKEN
  }
}

module.exports = nextConfig
