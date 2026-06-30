// Hộp tải game — cấu trúc gốc toithuong.com (app-icon + lưới nút + nạp thẻ).
// Mobile: xếp dọc (icon → lưới 2 cột → nạp thẻ) để không bị bóp méo.
// sm trở lên: giữ bố cục ngang gốc (icon | lưới 3x2 | nạp thẻ).
// Ảnh đặt trực tiếp trong /public/. Chưa có bg-dl.webp nên dùng khung .panel làm nền.

import { getLatestApkUrl } from "@/lib/version";

export default async function DownloadBox() {
  // Link APK lấy động từ version.php (DB app_version) -> tự cập nhật khi ra bản mới.
  const { url: apkUrl } = await getLatestApkUrl();

  const BUTTONS = [
    { src: "/ios-dl.webp", alt: "Download IOS", href: "/ios", active: true },
    { src: "/android-dl.webp", alt: "Download Android", href: "/android", active: true },
    { src: "/h5-dl.webp", alt: "Download H5", active: false },
    { src: "/apk-dl.webp", alt: "Download APK", href: apkUrl, active: true },
    { src: "/pc-dl.webp", alt: "Download PC", href: apkUrl, active: true },
    { src: "/gc-dl.webp", alt: "Giftcode", active: true, button: true },
  ];

  return (
    <div
      id="download"
      className="panel relative mx-auto flex w-full max-w-[824px] flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-center sm:gap-[2.2%] sm:px-[2%] sm:py-3"
    >
      {/* Nếu sau này có ảnh nền: bỏ class .panel ở trên và mở comment dưới
      <img src="/bg-dl.webp" alt="Background downloadbox"
           className="absolute left-0 top-0 -z-0 h-full w-full object-fill" /> */}

      {/* Hàng trên (chỉ mobile): icon game + nạp thẻ nằm cạnh nhau */}
      <div className="relative z-10 flex w-full items-center justify-between sm:contents">
        {/* Icon game */}
        <a
          href="#download"
          className="qrcode order-1 shrink-0 transition-all hover:animate-bright2"
        >
          <img
            src="/app-icon.jpg"
            alt="Shinobi Infinity War - Reviving the legendary Six Paths 2026"
            width={112}
            height={112}
            className="size-[72px] rounded-[10px] sm:size-[100px] lg:size-[118px]"
          />
        </a>

        {/* Top Up (mobile hiển thị ở hàng trên, sm chuyển sang phải) */}
        <a
          href="/recharge"
          title="Top Up"
          className="order-3 shrink-0 hover:animate-bright2"
        >
          <img
            src="/payment-dl.png"
            alt="Top Up"
            width={112}
            height={112}
            className="size-[72px] sm:size-[100px] lg:size-[118px]"
          />
        </a>
      </div>

      {/* Lưới nút tải — mobile 2 cột, sm trở lên 3 cột */}
      <div className="order-2 grid w-full max-w-[330px] grid-cols-2 gap-2 sm:w-auto sm:grid-cols-3 sm:grid-rows-2 sm:gap-[9px]">
        {BUTTONS.map((b) => {
          const img = (
            <img
              src={b.src}
              alt={b.alt}
              width={152}
              height={56}
              className="h-[44px] w-full object-contain sm:h-[44px] sm:w-[140px] lg:h-[51px] lg:w-[162px]"
            />
          );
          if (!b.active)
            return (
              <span key={b.alt} className="flex opacity-60 grayscale">
                {img}
              </span>
            );
          if (b.button)
            return (
              <span
                key={b.alt}
                title="Giftcode"
                className="flex cursor-pointer hover:animate-bright2"
              >
                {img}
              </span>
            );
          return (
            <a
              key={b.alt}
              href={b.href}
              title={b.alt}
              target="_blank"
              rel="noreferrer"
              className="flex hover:animate-bright2"
            >
              {img}
            </a>
          );
        })}
      </div>
    </div>
  );
}
