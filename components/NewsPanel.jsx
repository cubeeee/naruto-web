"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TABS, POSTS } from "@/lib/data";

// Panel tin tức — tông ninja tối (vàng/cam) đồng bộ giao diện.
// Mockup ảnh dùng /1.jpg../6.jpg trong /public.

const fmt = (d) => {
  const [, m, day] = d.split("-");
  return `${m}/${day}`;
};

function Thumb({ src, alt, className = "" }) {
  const [err, setErr] = useState(false);
  if (err || !src)
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ninja-orange/70 to-ninja-blood/80 ${className}`}
      >
        <span className="text-2xl">🥷</span>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className={`object-cover ${className}`}
    />
  );
}

export default function NewsPanel() {
  const [tab, setTab] = useState(TABS[0]);
  const [slide, setSlide] = useState(0);
  const timer = useRef(null);

  const list = useMemo(
    () => (tab === "Tất cả" ? POSTS : POSTS.filter((p) => p.cat === tab)),
    [tab]
  );

  const slides = useMemo(() => POSTS.filter((p) => p.hot).slice(0, 5), []);
  useEffect(() => {
    if (slides.length === 0) return;
    timer.current = setInterval(
      () => setSlide((p) => (p + 1) % slides.length),
      4500
    );
    return () => clearInterval(timer.current);
  }, [slides.length]);

  const featured = list[0];
  const rest = list.slice(1);

  return (
    <div className="mx-auto mt-8 w-full max-w-[1210px] overflow-hidden rounded-2xl border border-ninja-gold/25 bg-ninja-panel/85 shadow-glow backdrop-blur-sm lg:flex lg:h-[560px] lg:items-stretch">
      {/* ===== TRÁI: slideshow ảnh lớn (khít chiều cao panel) ===== */}
      <div className="relative shrink-0 lg:w-[560px]">
        <div className="relative h-full min-h-[280px] overflow-hidden max-lg:aspect-[560/360]">
          {slides.map((s, i) => (
            <a
              key={s.id}
              href="#"
              aria-hidden={i !== slide}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === slide ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Thumb src={s.img} alt={s.title} className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block rounded bg-gradient-to-b from-ninja-orange to-ninja-blood px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white shadow">
                  {s.tag}
                </span>
                <h3 className="mt-2 line-clamp-2 font-display text-xl font-extrabold uppercase leading-tight text-white drop-shadow-lg md:text-2xl">
                  {s.title}
                </h3>
              </div>
            </a>
          ))}

          {/* viền phân cách với cột phải */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-ninja-gold/20 max-lg:hidden" />

          <button
            aria-label="Previous slide"
            onClick={() =>
              setSlide((p) => (p - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ninja-gold/40 bg-black/50 text-ninja-gold backdrop-blur transition hover:bg-ninja-orange hover:text-black"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 6 9 12l6 6" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => setSlide((p) => (p + 1) % slides.length)}
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ninja-gold/40 bg-black/50 text-ninja-gold backdrop-blur transition hover:bg-ninja-orange hover:text-black"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === slide
                    ? "w-6 bg-ninja-orange"
                    : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== PHẢI: tabs + danh sách ===== */}
      <div className="flex min-w-0 flex-1 flex-col p-5 md:p-7">
        {/* Tabs */}
        <ul
          role="tablist"
          className="flex items-center gap-1 border-b border-ninja-gold/25"
        >
          {TABS.map((t) => {
            const on = tab === t;
            return (
              <li key={t} role="tab" aria-selected={on}>
                <button
                  onClick={() => setTab(t)}
                  className={`-mb-px border-b-[3px] px-3 pb-2 font-display text-base font-bold uppercase tracking-wide transition-all md:text-lg ${
                    on
                      ? "border-ninja-orange text-ninja-gold"
                      : "border-transparent text-ninja-gold/55 hover:text-ninja-gold"
                  }`}
                >
                  {t}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Featured */}
        {featured && (
          <a
            href="#"
            title={`【${featured.tag}】 ${featured.title}`}
            className="group mt-5 flex gap-4"
          >
            <div className="h-[120px] w-[178px] shrink-0 overflow-hidden rounded-lg border border-ninja-gold/25">
              <Thumb
                src={featured.img}
                alt={featured.title}
                className="h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="min-w-0">
              <span className="inline-block rounded bg-gradient-to-b from-ninja-orange to-ninja-blood px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                {featured.tag}
              </span>
              <h3 className="mt-1.5 line-clamp-2 font-display font-bold uppercase leading-snug text-ninja-gold transition-colors group-hover:text-ninja-orange">
                {featured.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-ninja-gold/55">
                {featured.excerpt}
              </p>
            </div>
          </a>
        )}

        {/* List — cuộn bên trong, panel giữ chiều cao cố định */}
        <ul className="mt-4 flex-1 overflow-y-auto pr-1 lg:min-h-0">
          {rest.map((p) => (
            <li
              key={p.id}
              className="group border-b border-dashed border-ninja-gold/15 last:border-b-0"
            >
              <a
                href="#"
                title={`【${p.tag}】 ${p.title}`}
                className="flex items-center gap-3 rounded-md px-2 py-2.5 transition-all duration-300 hover:bg-ninja-gold/5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ninja-orange/80 transition-transform duration-300 group-hover:scale-150" />
                <span className="flex-1 truncate text-[15px] font-medium text-ninja-gold/85 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ninja-orange">
                  <span className="font-bold text-ninja-gold/45 group-hover:text-ninja-orange/80">
                    【{p.tag}】
                  </span>{" "}
                  {p.title}
                </span>
                {p.hot && (
                  <span className="rounded bg-gradient-to-b from-ninja-orange to-ninja-blood px-1.5 text-[10px] font-bold leading-5 text-white">
                    HOT
                  </span>
                )}
                <time className="shrink-0 whitespace-nowrap text-sm text-ninja-gold/45">
                  [{fmt(p.date)}]
                </time>
              </a>
            </li>
          ))}
          {list.length === 0 && (
            <li className="py-10 text-center text-ninja-gold/40">
              Chưa có bài viết.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
