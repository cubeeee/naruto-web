"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccount, selectIdentifier, selectRehydrated } from "@/lib/authSlice";

const STATUS = {
  pending: { label: "Pending", cls: "is-pending" },
  confirmed: { label: "Successful", cls: "is-success" },
  expired: { label: "Expired", cls: "is-danger" },
  cancelled: { label: "Cancelled", cls: "is-danger" },
  failed: { label: "Failed", cls: "is-danger" },
  underpaid: { label: "Underpaid", cls: "is-pending" },
};

// Tab ↔ provider value trả về từ getDepositHistory.php.
const TABS = [
  { key: "pay2s", label: "Bank Transfer (Pay2s)", provider: "pay2s" },
  { key: "paypal", label: "PayPal", provider: "paypal" },
  { key: "crypto", label: "Crypto / Binance", provider: "cryptomus" },
];

const fmtVnd = (v) => Number(v || 0).toLocaleString("en-US");

export default function PaymentHistoryClient() {
  const account = useSelector(selectAccount);
  const identifier = useSelector(selectIdentifier);
  const rehydrated = useSelector(selectRehydrated);
  const username = account?.username || identifier;

  const [tab, setTab] = useState("pay2s");
  const [state, setState] = useState({ loading: true, items: [], error: "" });

  // Tab khởi tạo từ URL ?tab= (dùng window thay useSearchParams để tránh Suspense boundary).
  useEffect(() => {
    try {
      const t = new URLSearchParams(window.location.search).get("tab");
      if (t && TABS.some((x) => x.key === t)) setTab(t);
    } catch {}
  }, []);

  useEffect(() => {
    if (!rehydrated) return; // chờ khôi phục phiên đăng nhập
    if (!identifier) {
      window.location.replace("/account");
      return;
    }
    const accountId = account?.account_id;
    if (!accountId) {
      setState({ loading: false, items: [], error: "" });
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `/api/auth/deposit-history?account_id=${encodeURIComponent(accountId)}`,
          { cache: "no-store" }
        );
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok && Array.isArray(data.items)) {
          setState({ loading: false, items: data.items, error: "" });
        } else {
          setState({ loading: false, items: [], error: data.msg || "Could not load history." });
        }
      } catch {
        setState({ loading: false, items: [], error: "Could not connect to the server." });
      }
    })();
  }, [rehydrated, identifier, account?.account_id]);

  if (!rehydrated) {
    return (
      <section className="ninja-info-page">
        <div className="ninja-info-wrap">
          <div className="ninja-loading">Loading top-up history...</div>
        </div>
      </section>
    );
  }

  const { loading, items, error } = state;
  const activeProvider = TABS.find((t) => t.key === tab)?.provider || "pay2s";
  const isBank = tab === "pay2s";
  const rows = items.filter((it) => (it.provider || "") === activeProvider);

  return (
    <section className="ninja-info-page">
      <div className="ninja-info-wrap">
        <div className="ninja-topbar">
          <a href="/info">← Account</a>
        </div>

        <div className="ninja-profile">
          <div className="ninja-profile__mark">忍</div>
          <div>
            <p className="ninja-eyebrow">Top-up History</p>
            <h1>{username}</h1>
            <p className="ninja-subtitle">Track all your top-up transactions.</p>
          </div>
          <a className="ninja-status is-active" href="/recharge">
            Top Up
          </a>
        </div>

        <div className="ninja-grid">
          <article className="ninja-card ninja-card--actions">
            <div className="rc-method-tabs">
              {TABS.map((t) => (
                <button
                  type="button"
                  key={t.key}
                  className={`rc-method-tab ${tab === t.key ? "is-active" : ""}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {error && <p className="ninja-message is-error">{error}</p>}

            <div className="ninja-history-table">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Tickets</th>
                    <th>Server</th>
                    <th>Character</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7}>
                        <p className="ninja-empty">Loading...</p>
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <p className="ninja-empty">No top-up orders yet.</p>
                      </td>
                    </tr>
                  ) : (
                    rows.map((it) => {
                      const st = STATUS[it.status] || { label: it.status, cls: "is-pending" };
                      const amount = isBank
                        ? `${fmtVnd(it.vnd_amount)} VND`
                        : `$${it.amount_usd}`;
                      return (
                        <tr key={it.order_id}>
                          <td data-label="Time">{it.created_at || "-"}</td>
                          <td data-label="Order ID">{it.order_id}</td>
                          <td data-label="Amount">{amount}</td>
                          <td data-label="Tickets">{it.tickets}</td>
                          <td data-label="Server">{it.server || "-"}</td>
                          <td data-label="Character">{it.character || "-"}</td>
                          <td data-label="Status">
                            <span className={`ninja-order-status ${st.cls}`}>{st.label}</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
