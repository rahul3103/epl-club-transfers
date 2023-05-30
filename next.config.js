/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sofifa.net",
        port: "",
        pathname: "players/**",
      },
    ],
  },
};

module.exports = nextConfig;
