"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIdentifier, selectRehydrated, logout as logoutAction } from "@/lib/authSlice";

function firstLetter(name) {
  const s = (name || "").trim();
  return s ? s[0].toUpperCase() : "?";
}

// Avatar đầu nhân vật thật (theo logo id từ game), fallback chữ cái nếu thiếu ảnh.
function HeadAvatar({ logo, name, className }) {
  const [err, setErr] = useState(false);
  const hasImg = logo !== undefined && logo !== null && logo !== "" && !err;
  return (
    <div className={className}>
      {hasImg ? (
        <img src={`/heads/${logo}.png`} alt={name || ""} onError={() => setErr(true)} />
      ) : (
        firstLetter(name)
      )}
    </div>
  );
}

export default function InfoClient() {
  const dispatch = useDispatch();
  const identifier = useSelector(selectIdentifier);
  const rehydrated = useSelector(selectRehydrated);
  const [state, setState] = useState({ loading: true, error: "", data: null });

  useEffect(() => {
    if (!rehydrated) return; // chờ khôi phục phiên đăng nhập
    if (!identifier) {
      // Chưa đăng nhập -> về trang đăng nhập
      window.location.replace("/account");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/auth/info?u=${encodeURIComponent(identifier)}`, {
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.status === "success") {
          setState({ loading: false, error: "", data: json.data });
        } else {
          setState({
            loading: false,
            error: json.message || "Could not load account information.",
            data: null,
          });
        }
      } catch {
        setState({ loading: false, error: "Could not connect to the server.", data: null });
      }
    })();
  }, [rehydrated, identifier]);

  function logout() {
    dispatch(logoutAction());
    window.location.href = "/account";
  }

  function comingSoon(e, label) {
    e.preventDefault();
    alert(`${label}: feature under development.`);
  }

  if (state.loading) {
    return (
      <section className="ninja-info-page">
        <div className="ninja-info-wrap">
          <div className="ninja-loading">Loading ninja profile...</div>
        </div>
      </section>
    );
  }

  if (state.error || !state.data) {
    return (
      <section className="ninja-info-page">
        <div className="ninja-info-wrap">
          <div className="ninja-topbar">
            <a href="/">← Home</a>
            <button className="ninja-logout" onClick={logout}>Log out</button>
          </div>
          <div className="ninja-card">
            <h2>Error</h2>
            <p className="ninja-empty">{state.error || "No data."}</p>
          </div>
        </div>
      </section>
    );
  }

  const d = state.data;
  const isLocked = !!d.disable_flag;
  const roles = Array.isArray(d.roles) ? d.roles : [];
  const main = d.main_role || roles[0] || null;
  const pay = d.payment || { total: 0, race: 0, accumulate: 0 };

  return (
    <section className="ninja-info-page">
      <div className="ninja-info-wrap">
        <div className="ninja-topbar">
          <a href="/">← Home</a>
        </div>

        <div className="ninja-profile">
          <div className="ninja-profile__mark">忍</div>
          <div>
            <p className="ninja-eyebrow">Ninja Profile</p>
            <h1>{d.username}</h1>
            <p className="ninja-subtitle">
              ID Mongo: {d.account_id}
              {d.pay_id != null ? ` · Pay ID: ${d.pay_id}` : ""}
            </p>
          </div>
          <span className={`ninja-status ${isLocked ? "is-locked" : "is-active"}`}>
            {isLocked ? "Locked" : "Active"}
          </span>
          <button className="ninja-logout" onClick={logout}>Log out</button>
        </div>

        <div className="ninja-grid">
          {/* Account Info */}
          <article className="ninja-card ninja-card--account">
            <h2>Account Info</h2>
            <dl className="ninja-list">
              <div>
                <dt>Email</dt>
                <dd>
                  {d.email ? (
                    d.email
                  ) : (
                    <>
                      <span className="ninja-unlinked">Not linked</span>
                      <a
                        href="/info/link-email"
                        className="ninja-mini-action"
                        onClick={(e) => comingSoon(e, "Link email")}
                      >
                        Link now
                      </a>
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt>Channel</dt>
                <dd>{d.channel || "none"}</dd>
              </div>
              <div>
                <dt>Language</dt>
                <dd>{d.language || "-"}</dd>
              </div>
              <div>
                <dt>Money</dt>
                <dd>{d.money ?? 0}</dd>
              </div>
            </dl>
          </article>

          {/* Main Character */}
          <article className="ninja-card ninja-card--hero">
            <h2>Main Character</h2>
            {main ? (
              <div className="ninja-main-role">
                <HeadAvatar className="ninja-avatar" logo={main.logo} name={main.name} />
                <div>
                  <h3>{main.name || "—"}</h3>
                  <p>
                    {main.server} · Level {main.level} · VIP {main.vip}
                  </p>
                </div>
              </div>
            ) : (
              <p className="ninja-empty">No character in game yet.</p>
            )}
          </article>

          {/* Functions */}
          <article className="ninja-card ninja-card--actions">
            <h2>Functions</h2>
            <div className="ninja-actions">
              <a href="/recharge" className="ninja-action ninja-action--pay">
                <span>Top Up</span>
                <small>Top up to get resources</small>
              </a>
              <a href="/info/change-password" className="ninja-action">
                <span>Change Password</span>
                <small>Protect your ninja account</small>
              </a>
              <a href="/info/payment-history" className="ninja-action">
                <span>Top-up History</span>
                <small>Track transactions</small>
              </a>
            </div>
          </article>

          {/* Top-up Stats */}
          <article className="ninja-card ninja-card--payments">
            <h2>Top-up Stats</h2>
            <div className="ninja-payment-grid">
              <div className="ninja-payment">
                <span>Total Top-up</span>
                <strong>{pay.total ?? 0}</strong>
                <small>No reset</small>
              </div>
              <div className="ninja-payment">
                <span>Ranking</span>
                <strong>{pay.race ?? 0}</strong>
                <small>Resets</small>
              </div>
              <div className="ninja-payment">
                <span>Accumulated</span>
                <strong>{pay.accumulate ?? 0}</strong>
                <small>Spend resources</small>
              </div>
            </div>
          </article>

          {/* Roster by Server */}
          <article className="ninja-card ninja-card--roles">
            <h2>Roster by Server</h2>
            {roles.length ? (
              <div className="ninja-role-list">
                {roles.map((r, i) => (
                  <div className="ninja-role-item" key={`${r.server}-${i}`}>
                    <div>
                      <span>{r.server}</span>
                      <strong>{r.name || "—"}</strong>
                    </div>
                    <div className="ninja-role-stats">
                      <span>Lv {r.level}</span>
                      <span>VIP {r.vip}</span>
                      <span>Logo {r.logo}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="ninja-empty">No character on any server yet.</p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
