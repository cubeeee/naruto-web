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

export default function PaymentHistoryClient() {
  const account = useSelector(selectAccount);
  const identifier = useSelector(selectIdentifier);
  const rehydrated = useSelector(selectRehydrated);
  const username = account?.username || identifier;

  const [state, setState] = useState({ loading: true, items: [], error: "" });

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
            <p className="ninja-subtitle">Track all your crypto top-up transactions.</p>
          </div>
          <a className="ninja-status is-active" href="/recharge">
            Top Up
          </a>
        </div>

        <div className="ninja-grid">
          <article className="ninja-card ninja-card--actions">
            <h2>Crypto / Binance</h2>

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
                  ) : items.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <p className="ninja-empty">No top-up orders yet.</p>
                      </td>
                    </tr>
                  ) : (
                    items.map((it) => {
                      const st = STATUS[it.status] || { label: it.status, cls: "is-pending" };
                      return (
                        <tr key={it.order_id}>
                          <td data-label="Time">{it.created_at || "-"}</td>
                          <td data-label="Order ID">{it.order_id}</td>
                          <td data-label="Amount">${it.amount_usd}</td>
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
