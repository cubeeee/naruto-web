import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Shinobi Infinity War, Get Giftcodes, Play Now",
  description:
    "Download Shinobi Infinity War - Reviving the legendary Six Paths 2026. Free VIP6 and 8 mighty SSS heroes.",
  keywords: ["game", "online game", "ninja", "naruto", "giftcode"],
  openGraph: {
    title: "Shinobi Infinity War, Get Giftcodes, Play Now",
    description: "Reviving the legendary Six Paths 2026 - Get VIP6 and 8 SSS heroes.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0805",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
