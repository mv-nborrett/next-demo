/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  i18n: {
    locales: ["en-GB", "fr", "de"],
    defaultLocale: "en-GB",
  },
};

module.exports = nextConfig;
