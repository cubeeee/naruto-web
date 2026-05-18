# Thư mục assets

## Hộp tải game (DownloadBox) — đặt ảnh vào `/public/dl/`

Component `components/DownloadBox.jsx` cần các file sau (đặt đúng tên):

| File | Kích thước gốc | Ghi chú |
|---|---|---|
| `dl/bg-dl.webp` | 824 × 143 | Ảnh nền khung ngang |
| `dl/app-icon.webp` | 118 × 118 | Icon game bên trái |
| `dl/ios-dl.webp` | 162 × 51 | Nút App Store (active) |
| `dl/android-dl.webp` | 162 × 51 | Nút Google Play (active) |
| `dl/h5-dl.webp` | 162 × 51 | Nút H5 (mờ/disabled) |
| `dl/apk-dl.webp` | 162 × 51 | Nút Tải APK (mờ/disabled) |
| `dl/pc-dl.webp` | 162 × 51 | Nút Tải PC (mờ/disabled) |
| `dl/gc-dl.webp` | 162 × 51 | Nút Giftcode (active) |
| `dl/payment-dl.webp` | 118 × 118 | Icon Nạp thẻ bên phải |

> Thứ tự lưới 3×2 (trái→phải, trên→dưới): iOS, Android, H5, APK, PC, Giftcode.
> Muốn bật/tắt nút nào sửa mảng `BUTTONS` trong `DownloadBox.jsx` (`active: true/false`).

## Slider Tính Năng (coverflow giống hình 2) — `/public/features/`

Component `components/FeatureSlider.jsx`. Đặt ảnh vào `public/features/`:

| File | Tỉ lệ đề xuất |
|---|---|
| `f1.webp` … `f5.webp` | dọc ~4:5 (vd 640×800) |

> Chưa có ảnh thì slide hiện nền gradient + chữ (tiêu đề/sub trong `FEATURE_SLIDES` ở `lib/data.js`). Thêm/sửa slide cũng tại mảng đó.

## Hệ Thống Nhẫn Giả — ảnh thật

Component `components/CharacterSystem.jsx` dùng ảnh tải từ `huyenthoailangla.vn`,
lưu tại `public/assets/frontend/home/v1/images/char/...` (avata / art / skillbottom).

Tải lại / bổ sung ảnh: chạy `node scripts/download-char-assets.mjs`
(tự bỏ qua file đã có, chỉ tải file thiếu). Path ảnh khai báo trong
`CHARACTERS` của `lib/data.js`. Ảnh lỗi sẽ fallback gradient + tên.

## Ảnh khác

- `logo.png` → logo lớn ở HERO (`app/page.js`)
- `bg1-1.png` → ảnh nền section HERO
- `bg2-2.png` → ảnh nền section Tin Tức & Tính Năng

Lưu ý: KHÔNG sao chép hình ảnh có bản quyền từ toithuong.com.
Đây là bản clone bố cục/giao diện cho mục đích học tập.
