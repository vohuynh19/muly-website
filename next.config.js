/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raroin.creabik.com',
        port: '',
        pathname: '/assets/img/**',
      },
    ],
  },
};

module.exports = nextConfig;
