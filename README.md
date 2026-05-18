# Nhẫn Giả Tối Thượng — Clone giao diện (Next.js + TailwindCSS)

Bản clone **giao diện** landing page game [toithuong.com](https://toithuong.com/)
(*Nhẫn Giả Tối Thượng* — game nhập vai chủ đề nhẫn giả/Naruto), dựng lại bằng
**Next.js 15 (App Router)** + **TailwindCSS 3**.

> ⚠️ Đây là bản tái dựng bố cục/UI cho mục đích học tập. Toàn bộ ảnh là
> placeholder (gradient/SVG) — không sao chép tài nguyên có bản quyền từ
> trang gốc. Mini-game chỉ để minh hoạ tương tác, không liên quan tiền thật.

## Tính năng đã clone

| Khu vực | Mô tả |
|---|---|
| Header | Logo, nav (Trang chủ / Tài khoản / Fanpage / Group FB), nút Giftcode & Nạp thẻ, menu mobile, đổi nền khi cuộn |
| Hero | Tiêu đề game + slider 7 slide tự chạy (prev/next + dots), hiệu ứng ken-burns |
| Download box | Lưới nút nền tảng (iOS/Android/APK/PC/H5), QR code, nút Giftcode/Nạp thẻ |
| Floating promo | Banner quà tân thủ nổi cố định bên trái |
| News/Tính năng | Tab lọc (Tất cả / Tính năng / Tin tức / Hướng Dẫn) + thẻ tính năng + lưới bài viết |
| Mini-game | "Chém Phi Tiêu" — game phản xạ click, lưu kỷ lục bằng localStorage |
| Footer | Thông tin, liên kết, badge 18+, cảnh báo thời lượng chơi |

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
```

Build production:

```bash
npm run build
npm start
```

## Cấu trúc

```
app/
  layout.js          # metadata, font, html lang vi
  page.js            # ghép các section
  globals.css        # Tailwind + utility .btn-ninja/.panel/...
components/
  Header.jsx  HeroSlider.jsx  DownloadBox.jsx  FloatingPromo.jsx
  NewsSection.jsx  ShurikenGame.jsx  Footer.jsx  Logo.jsx
lib/
  data.js            # dữ liệu mẫu (slides, bài viết, tính năng)
public/               # nơi đặt ảnh thật (xem public/README.md)
tailwind.config.js    # theme màu "ninja" + animation
```

## Tuỳ biến

- Màu sắc: sửa `theme.extend.colors.ninja` trong `tailwind.config.js`.
- Nội dung tin tức / slide: sửa `lib/data.js`.
- Thay ảnh thật: làm theo `public/README.md`.
