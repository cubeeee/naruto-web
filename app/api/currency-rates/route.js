export const runtime = "nodejs";

// VND luôn chốt cứng theo yêu cầu: 1 USD = 26,000 VND.
const VND_FIXED = 26000;

// Tỷ giá dự phòng (USD = 1) khi không gọi được API tỷ giá live.
const FALLBACK_RATES = {
  USD: 1,
  VND: VND_FIXED,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157,
  CNY: 7.2,
  KRW: 1380,
  THB: 36,
  PHP: 58,
  IDR: 16200,
  MYR: 4.7,
  SGD: 1.35,
  INR: 83,
  TWD: 32,
  AUD: 1.5,
  CAD: 1.37,
};

// Cache trong bộ nhớ tiến trình (1 giờ) để không gọi API mỗi request.
let cache = { at: 0, payload: null };
const TTL = 60 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (cache.payload && now - cache.at < TTL) {
    return Response.json(cache.payload);
  }

  let rates = { ...FALLBACK_RATES };
  let source = "fixed";
  let updated = null;

  try {
    // open.er-api.com: miễn phí, không cần key, hỗ trợ CORS + nhiều tiền tệ.
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      // tự cache phía Next 1 giờ
      next: { revalidate: 3600 },
    });
    const data = await res.json().catch(() => null);
    if (data && data.result === "success" && data.rates) {
      // chỉ giữ các đơn vị ta hỗ trợ, phần còn lại lấy từ live nếu có
      const live = {};
      for (const k of Object.keys(FALLBACK_RATES)) {
        if (typeof data.rates[k] === "number") live[k] = data.rates[k];
      }
      rates = { ...FALLBACK_RATES, ...live };
      source = "live";
      updated = data.time_last_update_utc || null;
    }
  } catch {
    /* giữ FALLBACK_RATES */
  }

  // VND luôn ghi đè về tỷ giá chốt cứng dù live hay fallback.
  rates.VND = VND_FIXED;
  rates.USD = 1;

  const payload = { base: "USD", rates, source, updated };
  cache = { at: now, payload };
  return Response.json(payload);
}
