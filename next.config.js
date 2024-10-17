/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = {
 config: nextConfig,
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'steamuserimages-a.akamaihd.net',
      pathname: '/ugc/**',
    },
  ],
},
}
