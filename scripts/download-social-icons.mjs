// Tải icon thanh social (nav phải) từ toithuong.com về /public/social.
// Chạy: node scripts/download-social-icons.mjs
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://toithuong.com";
const SRC = "pub/zQ0spc4/i18n/vi";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "social");

const FILES = [
  "icon-fanpage.webp",
  "icon-group.webp",
  "icon-youtube.webp",
  "icon-tiktok.webp",
  "icon-bxh.webp",
  "icon-support.webp",
  "flag.webp",
];

const exists = (p) => stat(p).then(() => true, () => false);

await mkdir(OUT, { recursive: true });
let ok = 0;
for (const f of FILES) {
  const dest = join(OUT, f);
  if (await exists(dest)) {
    console.log(`skip (đã có)    ${f}`);
    ok++;
    continue;
  }
  try {
    const res = await fetch(`${BASE}/${SRC}/${f}`, {
      headers: { "User-Agent": "Mozilla/5.0", Referer: BASE },
    });
    if (!res.ok) {
      console.log(`lỗi HTTP ${res.status}  ${f}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`OK (${(buf.length / 1024).toFixed(1)} KB)  ${f}`);
    ok++;
  } catch (e) {
    console.log(`lỗi: ${e.message}  ${f}`);
  }
}
console.log(`\nXong: ${ok}/${FILES.length} icon -> public/social/`);
process.exit(ok === FILES.length ? 0 : 1);
