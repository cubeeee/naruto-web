"use client";

import { useEffect, useState } from "react";

// Tỷ giá dự phòng (USD = 1) — khớp với API /api/currency-rates.
const FALLBACK = {
  USD: 1, VND: 26000, EUR: 0.92, GBP: 0.79, JPY: 157, CNY: 7.2,
  KRW: 1380, THB: 36, PHP: 58, IDR: 16200, MYR: 4.7, SGD: 1.35,
  INR: 83, TWD: 32, AUD: 1.5, CAD: 1.37,
};

// Thứ tự hiển thị (VN đầu tiên cho dễ nhìn).
const ORDER = [
  "VND", "USD", "EUR", "GBP", "JPY", "CNY", "KRW", "THB",
  "PHP", "IDR", "MYR", "SGD", "INR", "TWD", "AUD", "CAD",
];

const FLAG = {
  USD: "🇺🇸", VND: "🇻🇳", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", CNY: "🇨🇳",
  KRW: "🇰🇷", THB: "🇹🇭", PHP: "🇵🇭", IDR: "🇮🇩", MYR: "🇲🇾", SGD: "🇸🇬",
  INR: "🇮🇳", TWD: "🇹🇼", AUD: "🇦🇺", CAD: "🇨🇦",
};

// Số lẻ: các tiền tệ không có phần thập phân hiển thị 0 chữ số.
const NO_DECIMALS = new Set(["VND", "JPY", "KRW", "IDR"]);

function fmt(n, cur) {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("en-US", {
    maximumFractionDigits: NO_DECIMALS.has(cur) ? 0 : 2,
    minimumFractionDigits: 0,
  });
}

export default function CurrencyConverter({ usd = 1 }) {
  const [rates, setRates] = useState(FALLBACK);
  const [source, setSource] = useState("fixed");
  const [target, setTarget] = useState("VND"); // tiền tệ xem số tiền nạp quy đổi
  const [amt, setAmt] = useState(""); // bộ đổi tiền → USD
  const [from, setFrom] = useState("VND");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/currency-rates", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (alive && data && data.rates) {
          setRates({ ...FALLBACK, ...data.rates, VND: 26000, USD: 1 });
          setSource(data.source || "fixed");
        }
      } catch {
        /* dùng FALLBACK */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const rate = rates[target] || FALLBACK[target] || 1;
  const converted = usd * rate;

  const fromRate = rates[from] || FALLBACK[from] || 1;
  const usdValue = amt && Number(amt) > 0 ? Number(amt) / fromRate : 0;

  return (
    <div className="rc-fx">
      <div className="rc-fx-head">
        <span className="rc-fx-title">💱 Currency converter</span>
        <span className="rc-fx-src">
          {source === "live" ? "live rates" : "fixed rates"}
        </span>
      </div>

      {/* Số tiền nạp quy đổi (nổi bật) */}
      <div className="rc-fx-main">
        <span className="rc-fx-usd">${fmt(usd, "USD")}</span>
        <span className="rc-fx-eq">≈</span>
        <span className="rc-fx-amount">
          {FLAG[target]} {fmt(converted, target)}
        </span>
        <select
          className="rc-fx-cur"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          aria-label="Display currency"
        >
          {ORDER.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {/* Bộ đổi bất kỳ tiền tệ → USD */}
      <div className="rc-fx-conv">
        <span className="rc-fx-conv-label">Convert any currency to USD</span>
        <div className="rc-fx-conv-row">
          <input
            type="number"
            min="0"
            inputMode="decimal"
            placeholder="Amount"
            value={amt}
            onChange={(e) => setAmt(e.target.value)}
          />
          <select value={from} onChange={(e) => setFrom(e.target.value)} aria-label="From currency">
            {ORDER.map((c) => (
              <option key={c} value={c}>
                {FLAG[c]} {c}
              </option>
            ))}
          </select>
          <span className="rc-fx-conv-eq">= ${fmt(usdValue, "USD")}</span>
        </div>
      </div>
    </div>
  );
}
