import { getLatestApkUrl } from "@/lib/version";

// Same-origin proxy cho version.php -> tránh CORS cho các trang tĩnh (/android...)
// gọi fetch('/api/version') rồi redirect tới apk mới nhất.
export async function GET() {
  const { url, version } = await getLatestApkUrl();
  return Response.json({ url, version });
}
