"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  selectIsAuthenticated,
  selectRehydrated,
} from "@/lib/authSlice";

/** Vòng xoáy lá Konoha nhỏ trang trí 2 bên tiêu đề */
function Swirl({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 9 9 7 7 0 1 1-7-7 5 5 0 1 0 5 5 3 3 0 1 1-3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const EMPTY = { username: "", password: "", confirm: "", email: "" };

// Lấy đích chuyển hướng sau khi đăng nhập từ ?next=, chỉ chấp nhận path nội bộ (chống open-redirect).
function getNextPath() {
  if (typeof window === "undefined") return "/info";
  try {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  } catch {}
  return "/info";
}

export default function AccountForm() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const rehydrated = useSelector(selectRehydrated);

  // Đã đăng nhập (phiên còn lưu) -> vào thẳng đích (next) hoặc trang tài khoản.
  useEffect(() => {
    if (rehydrated && isAuthenticated) {
      window.location.replace(getNextPath());
    }
  }, [rehydrated, isAuthenticated]);

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: "ok"|"err", text }

  const isLogin = mode === "login";

  const setField = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const switchMode = (next) => {
    setMode(next);
    setAlert(null);
    setForm(EMPTY);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setAlert(null);

    if (!form.username || !form.password) {
      setAlert({ type: "err", text: "Please enter your username and password." });
      return;
    }
    if (!isLogin) {
      if (!/^[a-z0-9]{6,12}$/.test(form.username)) {
        setAlert({
          type: "err",
          text: "Username must be 6-12 characters, lowercase letters and numbers only.",
        });
        return;
      }
      if (form.password.length < 6) {
        setAlert({ type: "err", text: "Password must be at least 6 characters." });
        return;
      }
      if (form.password !== form.confirm) {
        setAlert({ type: "err", text: "Passwords do not match." });
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { username: form.username, password: form.password }
        : {
            username: form.username,
            password: form.password,
            email: form.email,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.status === "success") {
        if (isLogin) {
          dispatch(setCredentials(data.data || { username: form.username }));
          setAlert({ type: "ok", text: "Login successful! Redirecting..." });
          const dest = getNextPath();
          setTimeout(() => {
            window.location.href = dest;
          }, 1000);
        } else {
          setAlert({
            type: "ok",
            text: "Registration successful! You can log in now.",
          });
          setTimeout(() => switchMode("login"), 1200);
        }
      } else {
        setAlert({
          type: "err",
          text: data.message || "An error occurred, please try again.",
        });
      }
    } catch {
      setAlert({ type: "err", text: "Could not connect to the server. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] px-3">
      {/* Trục cuộn trái / phải */}
      <Pole side="left" />
      <Pole side="right" />

      {/* Chuông vàng dây đỏ - góc trên trái */}
      <div className="absolute -top-3 left-7 z-30 flex flex-col items-center sm:left-9">
        <span className="h-7 w-2 rounded-sm bg-gradient-to-b from-[#e23b2e] to-[#9c1d14] shadow" />
        <span className="-mt-1 flex gap-1">
          <span className="acc-bell block h-5 w-5 rounded-full" />
          <span className="acc-bell block h-4 w-4 rounded-full" />
        </span>
      </div>

      {/* Kunai đỏ bắt chéo - góc trên phải */}
      <div className="absolute -top-2 right-7 z-30 h-9 w-9 sm:right-9">
        <span className="absolute left-1/2 top-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-gradient-to-r from-[#e23b2e] to-[#7e1009]" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-gradient-to-r from-[#e23b2e] to-[#7e1009]" />
      </div>

      {/* Mặt giấy */}
      <div className="acc-paper relative z-20 mx-auto w-[calc(100%-56px)] rounded-[10px] border-[3px] border-[#c98a3f] px-6 py-9 shadow-[0_18px_50px_rgba(0,0,0,.6)] sm:px-10">
        {/* viền trong mảnh */}
        <div className="pointer-events-none absolute inset-2 rounded-[6px] border border-[#cb9a55]/60" />

        <div className="relative">
          {/* Tiêu đề */}
          <h1 className="mb-7 flex items-center justify-center gap-3 font-display text-2xl font-extrabold uppercase tracking-[0.18em] text-[#7a4a17] sm:text-3xl">
            <Swirl className="h-5 w-5 text-[#b9791a]" />
            {isLogin ? "Login" : "Register"}
            <Swirl className="h-5 w-5 -scale-x-100 text-[#b9791a]" />
          </h1>

          {alert && (
            <div
              className={`mb-4 rounded-md px-4 py-2.5 text-center text-sm font-semibold ${
                alert.type === "ok"
                  ? "bg-emerald-600/15 text-emerald-700 ring-1 ring-emerald-600/40"
                  : "bg-red-600/10 text-red-700 ring-1 ring-red-600/40"
              }`}
            >
              {alert.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <Field
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={setField("username")}
              autoComplete="username"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={setField("password")}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />

            {!isLogin && (
              <>
                <Field
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  value={form.confirm}
                  onChange={setField("confirm")}
                  autoComplete="new-password"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={setField("email")}
                  autoComplete="email"
                />
              </>
            )}

            {/* Nút submit kiểu thẻ bài cam */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mx-auto mt-2 flex h-[58px] w-[270px] max-w-full items-center justify-center rounded-[10px] border-2 border-[#ffd98a] bg-gradient-to-b from-[#ffb24d] via-[#ff7a18] to-[#d8470f] font-display text-xl font-extrabold uppercase tracking-widest text-white shadow-[0_6px_0_#a8350a,0_10px_18px_rgba(0,0,0,.4)] transition-all duration-150 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#a8350a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="absolute left-4 text-[#ffe7b0]">◈</span>
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
              <span className="absolute right-4 text-[#ffe7b0]">◈</span>
            </button>
          </form>

          {/* Liên kết phụ */}
          <p className="mt-6 text-center text-sm text-[#7a4a17]">
            {isLogin ? (
              <>
                <a
                  href={`${process.env.NEXT_PUBLIC_GAME_FORGOT_URL || "http://51.79.173.50/forgot.html"}`}
                  className="font-semibold text-[#d11f00] hover:underline"
                >
                  Forgot password?
                </a>{" "}
                No account yet?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-semibold text-[#1f8bd1] hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold text-[#1f8bd1] hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Pole({ side }) {
  return (
    <div
      className={`absolute top-2 bottom-2 z-10 w-12 sm:w-14 ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <span className="acc-pole-cap absolute -top-3 left-1/2 h-6 w-[120%] -translate-x-1/2 rounded-full" />
      <span className="acc-pole-cap absolute -bottom-3 left-1/2 h-6 w-[120%] -translate-x-1/2 rounded-full" />
      <span className="acc-pole absolute inset-0 rounded-full" />
    </div>
  );
}

function Field({ ...props }) {
  return (
    <input
      {...props}
      className="block h-[52px] w-full rounded-md border border-black/10 bg-[#6e6e6e] px-4 text-center text-lg text-white shadow-inner outline-none transition placeholder:text-white/85 focus:bg-[#5f5f5f] focus:ring-2 focus:ring-[#ff7a18]/70"
    />
  );
}
