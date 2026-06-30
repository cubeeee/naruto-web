// Single source of truth cho link tải APK: đọc từ webapi version.php (cùng DB app_version
// mà game client dùng). Khi CI publish version mới -> DB đổi -> web tự cập nhật (ISR revalidate).
//
// Override endpoint qua env VERSION_API_URL nếu cần.

const VERSION_API_URL =
  process.env.VERSION_API_URL || "https://api.siwgame.com/gameAPI/version.php";

// Fallback khi không gọi được API (đừng để nút tải chết).
const FALLBACK_APK_URL = "https://cdn.siwgame.com/ShinobiInfinityWar-v2.2.2.apk";

/**
 * Lấy link APK mới nhất + version từ version.php.
 * Cache phía server, làm mới mỗi 5 phút (ISR) -> bản mới lên trong ~5'.
 * @returns {Promise<{url: string, version: string|null}>}
 */
export async function getLatestApkUrl() {
  try {
    const res = await fetch(VERSION_API_URL, { next: { revalidate: 300 } });
    if (!res.ok) return { url: FALLBACK_APK_URL, version: null };

    const data = await res.json();
    return {
      url: data && data.url ? String(data.url) : FALLBACK_APK_URL,
      version: data && data.version ? String(data.version) : null,
    };
  } catch {
    return { url: FALLBACK_APK_URL, version: null };
  }
}
