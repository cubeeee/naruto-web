"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccount, selectIdentifier, selectRehydrated } from "@/lib/authSlice";

// Ticket price table: 1 USD = 1 ticket.
const AMOUNTS = [1, 5, 10, 25, 50, 75, 100, 500];
const TICKET_ICON = "/img_fix/icon_ticket.png";

const STATUS = {
  pending: { label: "Waiting for payment", cls: "is-pending" },
  confirmed: { label: "Successful", cls: "is-success" },
  expired: { label: "Expired", cls: "is-danger" },
  cancelled: { label: "Cancelled", cls: "is-danger" },
  failed: { label: "Failed", cls: "is-danger" },
  underpaid: { label: "Underpaid", cls: "is-pending" },
};

const firstLetter = (s) => {
  const t = (s || "").trim();
  return t ? t[0].toUpperCase() : "?";
};

// Avatar đầu nhân vật thật (theo logo id từ game), fallback chữ cái nếu thiếu ảnh.
function HeadAvatar({ logo, name }) {
  const [err, setErr] = useState(false);
  const hasImg = logo !== undefined && logo !== null && logo !== "" && !err;
  return (
    <span className="rc-avatar">
      {hasImg ? (
        <img src={`/heads/${logo}.png`} alt={name || ""} onError={() => setErr(true)} />
      ) : (
        firstLetter(name)
      )}
    </span>
  );
}

function CharRow({ r }) {
  return (
    <div className="rc-char">
      <HeadAvatar logo={r.logo} name={r.name} />
      <div className="rc-char-meta">
        <div className="rc-char-name">{r.name || "—"}</div>
        <div className="rc-char-server">{r.server}</div>
        <div className="rc-badges">
          <span className="rc-badge lv">Lv {r.level}</span>
          <span className="rc-badge vip">VIP {r.vip}</span>
        </div>
      </div>
    </div>
  );
}

export default function RechargeClient() {
  const account = useSelector(selectAccount);
  const identifier = useSelector(selectIdentifier);
  const rehydrated = useSelector(selectRehydrated);
  const [username, setUsername] = useState(account?.username || "");
  const [roles, setRoles] = useState([]);
  const [msg, setMsg] = useState(null); // { type, text }
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(""); // role_id
  const [tickets, setTickets] = useState(0);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null); // đơn nạp hiện tại
  const ddRef = useRef(null);
  const pollRef = useRef(null);

  const storeKey = () =>
    account?.account_id ? `ninja_deposit_${account.account_id}` : null;

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  async function checkOnce(orderId) {
    try {
      const res = await fetch("/api/auth/deposit-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_id: account?.account_id, order_id: orderId }),
      });
      const data = await res.json().catch(() => ({}));
      if (data && data.ok && data.status) {
        setOrder((prev) => {
          if (!prev || prev.order_id !== orderId) return prev;
          const updated = { ...prev, status: data.status };
          const k = storeKey();
          if (k) {
            try {
              localStorage.setItem(k, JSON.stringify(updated));
            } catch {}
          }
          return updated;
        });
        if (data.status !== "pending") stopPolling();
      }
    } catch {
      /* bỏ qua, lần poll sau thử lại */
    }
  }

  function startPolling(orderId) {
    stopPolling();
    checkOnce(orderId); // kiểm tra ngay
    pollRef.current = setInterval(() => checkOnce(orderId), 8000);
  }

  function dismissOrder() {
    stopPolling();
    const k = storeKey();
    if (k) {
      try {
        localStorage.removeItem(k);
      } catch {}
    }
    setOrder(null);
  }

  useEffect(() => {
    if (!rehydrated) return; // chờ khôi phục phiên đăng nhập
    if (!identifier) {
      // Chưa đăng nhập -> bắt login, xong quay lại trang nạp.
      window.location.replace("/account?next=/recharge");
      return;
    }
    setUsername(account?.username || identifier);

    (async () => {
      try {
        const res = await fetch(`/api/auth/info?u=${encodeURIComponent(identifier)}`, {
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.status === "success") {
          setUsername(json.data.username || identifier);
          setRoles(Array.isArray(json.data.roles) ? json.data.roles : []);
        }
      } catch {
        /* keep going, still show the form */
      } finally {
        setLoading(false);
      }
    })();
  }, [rehydrated, identifier]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function onDocClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Khôi phục đơn đang chờ (nếu có) khi vào trang -> tiếp tục theo dõi trạng thái.
  useEffect(() => {
    if (!rehydrated || !account?.account_id) return;
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(`ninja_deposit_${account.account_id}`) || "null");
    } catch {
      saved = null;
    }
    if (saved && saved.order_id) {
      setOrder(saved);
      if (saved.status === "pending") startPolling(saved.order_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rehydrated, account?.account_id]);

  // Dọn interval khi rời trang
  useEffect(() => () => stopPolling(), []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setMsg(null);

    if (!role) {
      setMsg({ type: "error", text: "Please select a character." });
      return;
    }
    if (!tickets) {
      setMsg({ type: "error", text: "Please select an amount." });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/deposit-crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_id: account?.account_id,
          role_id: role,
          tickets: Number(tickets),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.payment_url) {
        const newOrder = {
          order_id: data.order_id,
          tickets: data.tickets ?? Number(tickets),
          amount: Number(tickets),
          server: selected?.server || "",
          name: selected?.name || "",
          logo: selected?.logo,
          payment_url: data.payment_url,
          status: "pending",
        };
        const k = storeKey();
        if (k) {
          try {
            localStorage.setItem(k, JSON.stringify(newOrder));
          } catch {}
        }
        setOrder(newOrder);
        // Mở trang thanh toán ở TAB MỚI, không chiếm trang hiện tại.
        window.open(data.payment_url, "_blank", "noopener,noreferrer");
        setMsg({
          type: "success",
          text: "Payment page opened in a new tab. Complete the payment there — this page will update automatically.",
        });
        startPolling(newOrder.order_id);
      } else {
        setMsg({ type: "error", text: data.msg || "Could not create the payment, please try again." });
      }
    } catch {
      setMsg({ type: "error", text: "Could not connect to the payment server." });
    } finally {
      setBusy(false);
    }
  }

  // Only roles with a valid 24-hex id can receive tickets.
  const payableRoles = roles.filter((r) => /^[0-9a-f]{24}$/i.test(r.id || ""));
  const selected = payableRoles.find((r) => r.id === role) || null;

  return (
    <section className="ninja-info-page">
      <div className="ninja-info-wrap">
        <div className="ninja-topbar">
          <a href="/info">← Account</a>
        </div>

        <div className="ninja-profile">
          <div className="ninja-profile__mark">N</div>
          <div>
            <p className="ninja-eyebrow">Top Up</p>
            <h1>{username || "..."}</h1>
            <p className="ninja-subtitle">Pay with crypto to get tickets for your character.</p>
          </div>
          <a className="ninja-status is-active" href="/info">
            Back
          </a>
        </div>

        <div className="rc-support-note">
          <span className="rc-support-icon" aria-hidden="true">💬</span>
          <p>
            Can&apos;t complete your payment with the methods below? Please message
            our Fanpage{" "}
            <a
              href="https://www.facebook.com/ShinobiInfinityWar"
              target="_blank"
              rel="noreferrer"
            >
              Shinobi Infinity War
            </a>{" "}
            or join our{" "}
            <a
              href="https://discord.gg/PreE9R3p7F"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>{" "}
            for support.
          </p>
        </div>

        <div className="ninja-grid">
          <article className="ninja-card ninja-card--actions">
            <h2>Crypto / Binance</h2>

            {msg && <p className={`ninja-message is-${msg.type}`}>{msg.text}</p>}

            <form onSubmit={handleSubmit} className="ninja-form">
              {/* Character picker (avatar + level + vip) */}
              <div className="rc-field">
                <span className="rc-field-label">Select character</span>
                <div className={`rc-select ${open ? "is-open" : ""}`} ref={ddRef}>
                  <button
                    type="button"
                    className="rc-select-trigger"
                    disabled={loading || !payableRoles.length}
                    onClick={() => setOpen((o) => !o)}
                  >
                    {selected ? (
                      <CharRow r={selected} />
                    ) : (
                      <span className="rc-placeholder">
                        {loading
                          ? "Loading characters..."
                          : payableRoles.length
                          ? "Select character"
                          : "No character available"}
                      </span>
                    )}
                    <span className="rc-caret">▾</span>
                  </button>

                  {open && payableRoles.length > 0 && (
                    <div className="rc-select-menu">
                      {payableRoles.map((r) => (
                        <button
                          type="button"
                          key={r.id}
                          className={`rc-option ${r.id === role ? "is-active" : ""}`}
                          onClick={() => {
                            setRole(r.id);
                            setOpen(false);
                          }}
                        >
                          <CharRow r={r} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Amount grid with ticket icon */}
              <div className="rc-field">
                <span className="rc-field-label">Select amount</span>
                <div className="rc-amount-grid">
                  {AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      className={`rc-amount ${tickets === amt ? "is-active" : ""}`}
                      onClick={() => setTickets(amt)}
                    >
                      <img src={TICKET_ICON} alt="ticket" />
                      <span className="rc-usd">${amt}</span>
                      <span className="rc-tickets">
                        {amt} {amt === 1 ? "ticket" : "tickets"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="ninja-message is-info" style={{ marginTop: 0 }}>
                Pay with USDT / crypto via Cryptomus (supports Binance). You will be
                redirected to the secure payment page. Tickets are credited
                automatically after payment is confirmed.
              </p>

              <button type="submit" className="ninja-submit" disabled={busy}>
                {busy ? "Creating payment..." : "Pay with Crypto"}
              </button>
            </form>
          </article>

          <article className="ninja-card ninja-card--actions">
            <h2>Current Order</h2>
            {order ? (
              <div className="rc-order">
                <div className="rc-order-row">
                  <span>Order</span>
                  <strong>{order.order_id}</strong>
                </div>
                <div className="rc-order-row">
                  <span>Character</span>
                  <strong>
                    {order.name}
                    {order.server ? ` · ${order.server}` : ""}
                  </strong>
                </div>
                <div className="rc-order-row">
                  <span>Amount</span>
                  <strong>
                    ${order.amount} = {order.tickets} tickets
                  </strong>
                </div>
                <div className="rc-order-row">
                  <span>Status</span>
                  <span className={`ninja-order-status ${STATUS[order.status]?.cls || "is-pending"}`}>
                    {STATUS[order.status]?.label || order.status}
                  </span>
                </div>

                {order.status === "pending" && (
                  <>
                    <p className="ninja-message is-info" style={{ marginTop: 4 }}>
                      A transaction is in progress. Keep this page open — it updates
                      automatically once payment is confirmed.
                    </p>
                    <div className="rc-order-actions">
                      <a
                        href={order.payment_url}
                        target="_blank"
                        rel="noreferrer"
                        className="ninja-submit ninja-submit--muted"
                      >
                        Reopen payment
                      </a>
                      <button
                        type="button"
                        className="ninja-submit ninja-submit--muted"
                        onClick={() => checkOnce(order.order_id)}
                      >
                        Check now
                      </button>
                    </div>
                  </>
                )}

                {order.status === "confirmed" && (
                  <p className="ninja-message is-success" style={{ marginTop: 4 }}>
                    ✓ Payment successful! {order.tickets} tickets have been credited
                    {order.name ? ` to ${order.name}` : ""}.
                  </p>
                )}

                {["expired", "cancelled", "failed", "underpaid"].includes(order.status) && (
                  <p className="ninja-message is-error" style={{ marginTop: 4 }}>
                    This order is {order.status}. You can create a new one.
                  </p>
                )}

                <button type="button" className="ninja-history-more" onClick={dismissOrder}>
                  Dismiss
                </button>
              </div>
            ) : (
              <p className="ninja-empty">No crypto orders yet.</p>
            )}
            <a href="/info/payment-history?tab=crypto" className="ninja-history-more">
              View full history
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
