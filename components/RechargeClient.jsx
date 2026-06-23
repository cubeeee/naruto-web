"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccount, selectIdentifier, selectRehydrated } from "@/lib/authSlice";
import PayPalCheckout from "@/components/PayPalCheckout";
import CurrencyConverter from "@/components/CurrencyConverter";

// Bảng giá: grid là số USD; tỉ lệ 1 USD = 10 ticket. Ticket giao = usd * TICKETS_PER_USD.
const AMOUNTS = [1, 5, 10, 25, 50, 75, 100, 500];
const TICKETS_PER_USD = 10;
const TICKET_ICON = "/img_fix/icon_ticket.png";

const STATUS = {
  pending: { label: "Waiting for payment", cls: "is-pending" },
  confirmed: { label: "Successful", cls: "is-success" },
  expired: { label: "Expired", cls: "is-danger" },
  cancelled: { label: "Cancelled", cls: "is-danger" },
  failed: { label: "Failed", cls: "is-danger" },
  underpaid: { label: "Underpaid", cls: "is-pending" },
};

// Phương thức nạp. Pay2s (bank) và PayPal tạm ẩn — bỏ comment dòng tương ứng để bật lại.
const METHODS = [
  // { key: "bank", label: "Bank Transfer (Pay2s)" },
  // { key: "paypal", label: "PayPal" },
  { key: "wise", label: "Wise / Remitly / Vietnam Bank" },
  { key: "crypto", label: "Crypto / Binance" },
];

// Thông tin nhận tiền Wise/Remitly (chuyển khoản VND thủ công, không qua cổng tự động).
const WISE_INFO = [
  { label: "Currency", value: "VND" },
  { label: "Beneficiary Name", value: "NGUYEN ANH TU" },
  { label: "Bank Name", value: "Bank for Investment and Development of Vietnam (BIDV)" },
  { label: "SWIFT Code", value: "BIDVVNVX" },
  { label: "Account Number", value: "8890576388" },
  { label: "Postcode", value: "700000" },
  { label: "City", value: "Ho Chi Minh City" },
  { label: "Address", value: "Quan 1, Ho Chi Minh" },
  { label: "Country", value: "Viet Nam" },
];

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

// Panel hiển thị VietQR + thông tin chuyển khoản cho đơn Pay2s đang chờ.
function BankTransferPanel({ order }) {
  const bank = order.bank || {};
  const vnd = Number(order.vnd_amount || 0).toLocaleString("en-US");
  return (
    <div className="rc-bank">
      {order.vietqr_url && (
        <div className="rc-bank-qr">
          <img src={order.vietqr_url} alt="VietQR" />
          <span className="rc-bank-qr-hint">Scan with your banking app</span>
        </div>
      )}
      <div className="rc-bank-info">
        <div className="rc-order-row">
          <span>Bank</span>
          <strong>{bank.name || "-"}</strong>
        </div>
        <div className="rc-order-row">
          <span>Account no.</span>
          <strong>{bank.account || "-"}</strong>
        </div>
        <div className="rc-order-row">
          <span>Account holder</span>
          <strong>{bank.holder || "-"}</strong>
        </div>
        <div className="rc-order-row">
          <span>Amount</span>
          <strong>{vnd} VND</strong>
        </div>
        <div className="rc-order-row">
          <span>Transfer note</span>
          <strong className="rc-bank-memo">{order.note || order.order_id}</strong>
        </div>
      </div>
      <p className="ninja-message is-error" style={{ marginTop: 4 }}>
        ⚠ The transfer note <strong>{order.note || order.order_id}</strong> must be kept exactly,
        and the amount must match. Tickets are credited automatically after the bank confirms.
      </p>
    </div>
  );
}

// Panel thông tin nhận tiền Wise/Remitly — người dùng chuyển VND thủ công rồi liên hệ support.
function WiseTransferPanel({ usd, charName }) {
  return (
    <div className="rc-bank">
      <div className="rc-bank-info">
        {WISE_INFO.map((f) => (
          <div className="rc-order-row" key={f.label}>
            <span>{f.label}</span>
            <strong className={f.label === "Account Number" || f.label === "SWIFT Code" ? "rc-bank-memo" : undefined}>
              {f.value}
            </strong>
          </div>
        ))}
      </div>
      <p className="ninja-message is-info" style={{ marginTop: 4 }}>
        Transfer the equivalent of <strong>${usd}</strong> in VND (you will receive{" "}
        <strong>{usd * 10} tickets</strong>, 1 USD = 10 tickets) via{" "}
        <strong>Wise</strong> or <strong>Remitly</strong> to the account above. After paying,
        message our{" "}
        <a href="https://discord.gg/PreE9R3p7F" target="_blank" rel="noreferrer">Discord</a>{" "}
        or{" "}
        <a href="https://www.facebook.com/ShinobiInfinityWar" target="_blank" rel="noreferrer">Fanpage</a>{" "}
        with your character name{charName ? ` (${charName})` : ""} and the transfer receipt to
        receive your tickets.
      </p>
      <p className="ninja-message is-info" style={{ marginTop: 4 }}>
        (If you have a bank account in Vietnam, you can transfer directly to this BIDV account.)
      </p>
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
  const [method, setMethod] = useState("wise"); // 'wise' | 'crypto' (paypal/bank tạm ẩn)
  const [role, setRole] = useState(""); // role_id
  const [usd, setUsd] = useState(0); // số USD chọn ở grid; ticket giao = usd * TICKETS_PER_USD
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
      // Chỉ chuyển sang tab của đơn cũ nếu method đó còn hiển thị (Pay2s đã ẩn).
      if (saved.method && METHODS.some((m) => m.key === saved.method)) setMethod(saved.method);
      if (saved.status === "pending") startPolling(saved.order_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rehydrated, account?.account_id]);

  // Dọn interval khi rời trang
  useEffect(() => () => stopPolling(), []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    // Wise/Remitly (thủ công) và PayPal (Smart Buttons) không tạo đơn qua submit này.
    if (method === "wise" || method === "paypal") return;
    setMsg(null);

    if (!role) {
      setMsg({ type: "error", text: "Please select a character." });
      return;
    }
    if (!usd) {
      setMsg({ type: "error", text: "Please select an amount." });
      return;
    }

    const endpoint = method === "bank" ? "/api/auth/deposit-bank" : "/api/auth/deposit-crypto";
    setBusy(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_id: account?.account_id,
          role_id: role,
          tickets: Number(usd) * TICKETS_PER_USD, // số ticket giao thật
        }),
      });
      const data = await res.json().catch(() => ({}));

      // Crypto trả payment_url (redirect); Pay2s trả vietqr_url + bank (hiển thị tại chỗ).
      const okCrypto = method === "crypto" && data.payment_url;
      const okBank = method === "bank" && data.order_id;
      if (res.ok && data.ok && (okCrypto || okBank)) {
        const newOrder = {
          method,
          order_id: data.order_id,
          tickets: data.tickets ?? Number(usd) * TICKETS_PER_USD,
          amount: Number(usd),
          server: selected?.server || "",
          name: selected?.name || "",
          logo: selected?.logo,
          status: "pending",
          // crypto
          payment_url: data.payment_url || null,
          // bank / pay2s
          bank: data.bank || null,
          vnd_amount: data.vnd_amount ?? null,
          vietqr_url: data.vietqr_url || null,
          note: data.note || data.order_id,
          expired_at: data.expired_at || null,
        };
        const k = storeKey();
        if (k) {
          try {
            localStorage.setItem(k, JSON.stringify(newOrder));
          } catch {}
        }
        setOrder(newOrder);

        if (method === "crypto") {
          // Mở trang thanh toán ở TAB MỚI, không chiếm trang hiện tại.
          window.open(data.payment_url, "_blank", "noopener,noreferrer");
          setMsg({
            type: "success",
            text: "Payment page opened in a new tab. Complete the payment there — this page will update automatically.",
          });
        } else {
          setMsg({
            type: "success",
            text: "Order created. Scan the VietQR or transfer with the exact note below — this page updates automatically.",
          });
        }
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
  const isBank = method === "bank";
  const isPaypal = method === "paypal";
  const isWise = method === "wise";
  const methodLabel = METHODS.find((m) => m.key === method)?.label || "Top Up";

  // Callbacks cho PayPal Smart Buttons (đặt order + cập nhật trạng thái).
  function onPaypalPending(data) {
    const newOrder = {
      method: "paypal",
      order_id: data.order_id,
      tickets: data.tickets,
      amount: data.amount_usd ?? data.tickets,
      server: selected?.server || "",
      name: selected?.name || "",
      logo: selected?.logo,
      status: "pending",
    };
    setOrder(newOrder);
    setMsg({ type: "info", text: "Complete the payment in the PayPal window..." });
  }
  function onPaypalSuccess(d) {
    setOrder((prev) => (prev ? { ...prev, status: "confirmed", tickets: d.tickets ?? prev.tickets } : prev));
    setMsg({ type: "success", text: "Payment successful! Your tickets have been sent to your in-game mailbox." });
  }
  function onPaypalError(text) {
    setMsg({ type: "error", text: text || "Payment failed, please try again." });
  }

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
            <p className="ninja-subtitle">
              Pay via Wise / Remitly or crypto to get tickets for your character.
            </p>
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
            <h2>{methodLabel}</h2>

            {/* Payment method switch */}
            <div className="rc-method-tabs">
              {METHODS.map((m) => (
                <button
                  type="button"
                  key={m.key}
                  className={`rc-method-tab ${method === m.key ? "is-active" : ""}`}
                  onClick={() => {
                    setMethod(m.key);
                    setMsg(null);
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

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
                      className={`rc-amount ${usd === amt ? "is-active" : ""}`}
                      onClick={() => setUsd(amt)}
                    >
                      <img src={TICKET_ICON} alt="ticket" />
                      <span className="rc-usd">${amt}</span>
                      <span className="rc-tickets">
                        {amt * TICKETS_PER_USD} tickets
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bộ quy đổi tiền tệ — số tiền nạp quy ra VND/đơn vị khác + đổi tiền sang USD */}
              <CurrencyConverter usd={usd || 1} />

              <p className="ninja-message is-info" style={{ marginTop: 0 }}>
                {isBank
                  ? "Pay by VND bank transfer via Pay2s (VietQR). Keep the transfer note exactly as shown — tickets are credited automatically once the bank confirms the payment."
                  : isPaypal
                  ? "Pay with PayPal (1 USD = 10 tickets). After payment, tickets are sent to your in-game mailbox automatically."
                  : isWise
                  ? "Pay in VND via Wise or Remitly to our receiving account (1 USD = 10 tickets). Tickets are credited manually after we confirm your transfer — contact us with the receipt."
                  : "Pay with USDT / crypto via Cryptomus (supports Binance, 1 USD = 10 tickets). You will be redirected to the secure payment page. Tickets are credited automatically after payment is confirmed."}
              </p>

              {isWise ? (
                role && usd ? (
                  <WiseTransferPanel usd={usd} charName={selected?.name} />
                ) : (
                  <p className="ninja-empty">Select a character and amount to see the Wise / Remitly transfer details.</p>
                )
              ) : isPaypal ? (
                role && usd ? (
                  <PayPalCheckout
                    accountId={account?.account_id}
                    role={role}
                    tickets={usd * TICKETS_PER_USD}
                    onPending={onPaypalPending}
                    onSuccess={onPaypalSuccess}
                    onError={onPaypalError}
                  />
                ) : (
                  <p className="ninja-empty">Select a character and amount to pay with PayPal.</p>
                )
              ) : (
                <button type="submit" className="ninja-submit" disabled={busy}>
                  {busy ? "Creating order..." : isBank ? "Pay by Bank Transfer" : "Pay with Crypto"}
                </button>
              )}
            </form>
          </article>

          <article className="ninja-card ninja-card--actions">
            <h2>Current Order</h2>
            {order && order.method === method ? (
              <div className="rc-order">
                <div className="rc-order-row">
                  <span>Order</span>
                  <strong>{order.order_id}</strong>
                </div>
                <div className="rc-order-row">
                  <span>Method</span>
                  <strong>
                    {order.method === "bank"
                      ? "Bank Transfer (Pay2s)"
                      : order.method === "paypal"
                      ? "PayPal"
                      : "Crypto"}
                  </strong>
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

                {order.status === "pending" && order.method === "bank" && (
                  <>
                    <BankTransferPanel order={order} />
                    <div className="rc-order-actions">
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

                {order.status === "pending" && order.method === "crypto" && (
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

                {order.status === "pending" && order.method === "paypal" && (
                  <p className="ninja-message is-info" style={{ marginTop: 4 }}>
                    Complete the payment in the PayPal window. This page updates
                    automatically once the payment is confirmed.
                  </p>
                )}

                {order.status === "confirmed" && (
                  <p className="ninja-message is-success" style={{ marginTop: 4 }}>
                    ✓ Payment successful! {order.tickets} tickets have been credited
                    {order.name ? ` to ${order.name}` : ""}.
                  </p>
                )}

                {["expired", "cancelled", "failed"].includes(order.status) && (
                  <p className="ninja-message is-error" style={{ marginTop: 4 }}>
                    This order is {order.status}. You can create a new one.
                  </p>
                )}

                {order.status === "underpaid" && (
                  <p className="ninja-message is-error" style={{ marginTop: 4 }}>
                    The amount received is less than required. Please contact support with
                    your order ID <strong>{order.order_id}</strong>.
                  </p>
                )}

                <button type="button" className="ninja-history-more" onClick={dismissOrder}>
                  Dismiss
                </button>
              </div>
            ) : (
              <p className="ninja-empty">No active orders yet.</p>
            )}
            <a
              href={`/info/payment-history?tab=${isBank ? "pay2s" : isPaypal ? "paypal" : "crypto"}`}
              className="ninja-history-more"
            >
              View full history
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
