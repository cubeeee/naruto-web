"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccount, selectIdentifier, selectRehydrated } from "@/lib/authSlice";

export default function ChangePasswordClient() {
  const account = useSelector(selectAccount);
  const identifier = useSelector(selectIdentifier);
  const rehydrated = useSelector(selectRehydrated);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type, text }
  const username = account?.username || identifier;

  useEffect(() => {
    if (!rehydrated) return; // chờ khôi phục phiên đăng nhập
    if (!identifier) {
      window.location.replace("/account");
      return;
    }
    setReady(true);
  }, [rehydrated, identifier]);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setMsg(null);

    if (form.next.length < 6 || form.next.length > 32) {
      setMsg({ type: "error", text: "New password must be 6 to 32 characters." });
      return;
    }
    if (form.next !== form.confirm) {
      setMsg({ type: "error", text: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          current_password: form.current,
          new_password: form.next,
          confirm_password: form.confirm,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === "success") {
        setMsg({ type: "success", text: data.message || "Password changed successfully." });
        setForm({ current: "", next: "", confirm: "" });
      } else {
        setMsg({ type: "error", text: data.message || "Failed to change password." });
      }
    } catch {
      setMsg({ type: "error", text: "Could not connect to the server. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <section className="ninja-info-page">
        <div className="ninja-info-wrap">
          <div className="ninja-loading">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="ninja-info-page">
      <div className="ninja-info-wrap">
        <div className="ninja-topbar">
          <a href="/info">← Account</a>
        </div>

        <div className="ninja-profile">
          <div className="ninja-profile__mark">忍</div>
          <div>
            <p className="ninja-eyebrow">Account Security</p>
            <h1>{username}</h1>
            <p className="ninja-subtitle">
              Change the web and game login password for this account.
            </p>
          </div>
          <a className="ninja-status is-active" href="/info">
            Back
          </a>
        </div>

        <div className="ninja-grid">
          <article className="ninja-card ninja-card--actions">
            <h2>Change Password</h2>

            {msg && <p className={`ninja-message is-${msg.type}`}>{msg.text}</p>}

            <form onSubmit={handleSubmit} className="ninja-form" autoComplete="off">
              <label>
                <span>Current password</span>
                <input
                  type="password"
                  name="current_password"
                  autoComplete="current-password"
                  placeholder="Leave blank if the account has no password yet"
                  value={form.current}
                  onChange={setField("current")}
                />
              </label>

              <label>
                <span>New password</span>
                <input
                  type="password"
                  name="new_password"
                  autoComplete="new-password"
                  required
                  value={form.next}
                  onChange={setField("next")}
                />
              </label>

              <label>
                <span>Confirm new password</span>
                <input
                  type="password"
                  name="confirm_password"
                  autoComplete="new-password"
                  required
                  value={form.confirm}
                  onChange={setField("confirm")}
                />
              </label>

              <button type="submit" className="ninja-submit" disabled={loading}>
                {loading ? "Processing..." : "Confirm password change"}
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}
