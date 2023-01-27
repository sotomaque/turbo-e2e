/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ['ui'],
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['tailwindui.com'],
    dangerouslyAllowSVG: true,
  },
};
export default config;
