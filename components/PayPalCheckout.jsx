"use client";

import { useEffect, useRef } from "react";

// Client ID là public (an toàn để lộ). Sandbox mặc định; đổi sang Live qua ENV khi go-live.
const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  "AVzmyo27eKmhfhetzVOm8pYeUu8-EP0JCx0BJPt_2KxjzAkuRWV68O7lzXHUW4P-K1Bgtm8boAdLWzYI";

// Load SDK 1 lần cho cả app.
let sdkPromise = null;
function loadPayPalSdk() {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.paypal) return Promise.resolve(window.paypal);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      PAYPAL_CLIENT_ID
    )}&currency=USD&intent=capture&locale=en_US`;
    s.onload = () => resolve(window.paypal);
    s.onerror = () => {
      sdkPromise = null;
      reject(new Error("paypal sdk load failed"));
    };
    document.body.appendChild(s);
  });
  return sdkPromise;
}

// Smart Buttons. Đọc account/role/tickets qua ref để tránh stale closure khi user đổi lựa chọn.
export default function PayPalCheckout({ accountId, role, tickets, onPending, onSuccess, onError }) {
  const containerRef = useRef(null);
  const stateRef = useRef({ accountId, role, tickets });
  stateRef.current = { accountId, role, tickets };
  const renderedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled || !containerRef.current || renderedRef.current) return;
        renderedRef.current = true;
        paypal
          .Buttons({
            style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
            createOrder: async () => {
              const { accountId, role, tickets } = stateRef.current;
              if (!role) {
                onError && onError("Please select a character.");
                throw new Error("no role");
              }
              if (!tickets) {
                onError && onError("Please select an amount.");
                throw new Error("no amount");
              }
              const res = await fetch("/api/auth/deposit-paypal-create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account_id: accountId, role_id: role, tickets: Number(tickets) }),
              });
              const data = await res.json().catch(() => ({}));
              if (!res.ok || !data.ok || !data.paypal_order_id) {
                onError && onError(data.msg || "Could not create the PayPal order.");
                throw new Error(data.msg || "create failed");
              }
              onPending && onPending(data); // { order_id, paypal_order_id, tickets, amount_usd }
              return data.paypal_order_id;
            },
            onApprove: async (data) => {
              const res = await fetch("/api/auth/deposit-paypal-capture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paypal_order_id: data.orderID }),
              });
              const d = await res.json().catch(() => ({}));
              if (res.ok && d.ok && d.status === "confirmed") {
                onSuccess && onSuccess(d);
              } else {
                onError && onError(d.msg || "Payment could not be confirmed. Please contact support.");
              }
            },
            onCancel: () => onError && onError("Payment cancelled."),
            onError: () => onError && onError("A PayPal error occurred. Please try again."),
          })
          .render(containerRef.current);
      })
      .catch(() => onError && onError("Could not load PayPal. Disable ad-block and retry."));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="rc-paypal-buttons" />;
}
