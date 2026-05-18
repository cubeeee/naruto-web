import "./globals.css";

export const metadata = {
  title: "Nhẫn Giả Tối Thượng, Nhận Giftcode, Chơi Ngay",
  description:
    "Tải game Nhẫn Giả Tối Thượng - Tái hiện Lục Đạo huyền thoại 2026. Tặng VIP6 và 8 tướng SSS cực mạnh.",
  keywords: ["game", "game online", "nhẫn giả", "naruto", "giftcode"],
  openGraph: {
    title: "Nhẫn Giả Tối Thượng, Nhận Giftcode, Chơi Ngay",
    description: "Tái hiện Lục Đạo huyền thoại 2026 - Nhận VIP6 và 8 tướng SSS.",
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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
