// Tool tải ảnh "Hệ thống nhẫn giả" từ site gốc về /public (giữ nguyên path).
// Chạy: node scripts/download-char-assets.mjs
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://huyenthoailangla.vn";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const AVATA = [
  "Uzumaki-Naruto",
  "Uchiha-Sasuke-2",
  "Sakura",
  "Hatake-Kakashi-1",
  "Gaara",
  "Jiraiya",
  "Namikaze-Minato",
  "Orochimaru",
  "Pain",
  "Tsunade",
];

const ART = [
  "Uzumaki-Naruto",
  "Uchiha-Sasuke",
  "Haruno-Sakura",
  "Hatake-Kakashi",
  "Gaara",
  "Jiraiya",
  "Namikaze-Minato",
  "Orochimaru",
  "Pain",
  "Tsunade",
];

// folder skillbottom -> file hệ
const SKILL = {
  Naruto: "Phong",
  "Uchiha-Sasuke": "Loi",
  "Haruno-Sakura": "Son",
  "Hatake-Kakashi": "Loi",
  Gaara: "Son",
  Jiraiya: "hoa",
  "Namikaze-Minato": "Phong",
  Orochimaru: "Phong",
  Pain: "Loi",
  Tsunade: "Son",
};

const P = "/assets/frontend/home/v1/images/char";
const paths = [
  `${P}/arrow-top.png`,
  `${P}/arrow-bot.png`,
  ...AVATA.map((n) => `${P}/avata/${n}.png`),
  ...ART.map((n) => `${P}/art/${n}.png`),
  ...Object.entries(SKILL).flatMap(([folder, el]) => [
    `${P}/skillbottom/${folder}/${el}.png`,
    `${P}/skillbottom/${folder}/icon-skill.png`,
  ]),
];

const exists = (p) =>
  stat(p).then(
    () => true,
    () => false
  );

async function download(relPath) {
  const url = BASE + encodeURI(relPath);
  const dest = join(ROOT, relPath);
  if (await exists(dest)) return { relPath, status: "skip (đã có)" };
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", Referer: BASE },
    });
    if (!res.ok) return { relPath, status: `lỗi HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    return { relPath, status: `OK (${(buf.length / 1024).toFixed(1)} KB)` };
  } catch (e) {
    return { relPath, status: `lỗi: ${e.message}` };
  }
}

const results = [];
for (const p of paths) {
  const r = await download(p);
  results.push(r);
  console.log(`${r.status.padEnd(18)} ${r.relPath}`);
}

const ok = results.filter((r) => r.status.startsWith("OK")).length;
const skip = results.filter((r) => r.status.startsWith("skip")).length;
const fail = results.length - ok - skip;
console.log(`\nXong: ${ok} tải mới, ${skip} bỏ qua, ${fail} lỗi / ${results.length} ảnh`);
process.exit(fail > 0 ? 1 : 0);
