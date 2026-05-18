/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // /android hiển thị trang Google Play (file tĩnh trong /public)
      { source: "/android", destination: "/clash-of-shinobi.html" },
      // /ios hiển thị trang App Store
      { source: "/ios", destination: "/dau-truong-chan-ly.html" },
    ];
  },
};

export default nextConfig;
