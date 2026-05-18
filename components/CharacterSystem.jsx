"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHARACTERS } from "@/lib/data";
import Reveal from "./Reveal";

// Ảnh có fallback gradient khi file lỗi.
function CharImg({ src, alt, fallback, className = "" }) {
  const [err, setErr] = useState(false);
  if (err || !src)
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ninja-orange/40 to-ninja-blood/60 ${className}`}
      >
        <span className="font-display text-2xl font-bold text-white/70">
          {fallback}
        </span>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className={className}
    />
  );
}

export default function CharacterSystem() {
  const [active, setActive] = useState(2); // mặc định Sakura
  const c = CHARACTERS[active];
  const N = CHARACTERS.length;
  const move = (d) => setActive((p) => (p + d + N) % N);

  // Tự cuộn avatar đang chọn vào giữa khung — chỉ cuộn container, KHÔNG cuộn trang
  const itemRefs = useRef([]);
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    const item = itemRefs.current[active];
    if (!el || !item) return;
    const er = el.getBoundingClientRect();
    const ir = item.getBoundingClientRect();
    el.scrollTo({
      top: el.scrollTop + (ir.top - er.top) - (el.clientHeight - ir.height) / 2,
      left: el.scrollLeft + (ir.left - er.left) - (el.clientWidth - ir.width) / 2,
      behavior: "smooth",
    });
  }, [active]);

  // Kéo bằng chuột (giữ + rê) để cuộn — nghe move/up ở window cho ổn định
  const drag = useRef({ down: false, x: 0, y: 0, sl: 0, st: 0, moved: false });

  const onWinMove = useCallback((e) => {
    const d = drag.current;
    const el = scrollRef.current;
    if (!d.down || !el) return;
    e.preventDefault();
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) d.moved = true;
    el.scrollLeft = d.sl - dx;
    el.scrollTop = d.st - dy;
  }, []);

  const onWinUp = useCallback(() => {
    drag.current.down = false;
    window.removeEventListener("pointermove", onWinMove);
    window.removeEventListener("pointerup", onWinUp);
  }, [onWinMove]);

  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      moved: false,
      x: e.clientX,
      y: e.clientY,
      sl: el.scrollLeft,
      st: el.scrollTop,
    };
    window.addEventListener("pointermove", onWinMove, { passive: false });
    window.addEventListener("pointerup", onWinUp);
  };

  useEffect(
    () => () => {
      window.removeEventListener("pointermove", onWinMove);
      window.removeEventListener("pointerup", onWinUp);
    },
    [onWinMove, onWinUp]
  );

  const selectChar = (i) => {
    if (drag.current.moved) return; // vừa kéo thì bỏ qua click chọn
    setActive(i);
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#120d07,#0a0805)] py-14">
      {/* Tiêu đề banner */}
      <Reveal variant="pop" className="relative z-10 mb-10 flex justify-center px-4">
        <div className="relative flex h-[70px] w-[640px] max-w-full items-center justify-center">
          <div className="absolute inset-0 rounded-md border-y-2 border-ninja-gold/60 bg-gradient-to-r from-transparent via-ninja-blood/40 to-transparent" />
          <span className="absolute left-6 text-ninja-gold/60">◈◈</span>
          <span className="absolute right-6 text-ninja-gold/60">◈◈</span>
          <h2 className="relative font-display text-2xl font-extrabold uppercase tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-ninja-gold to-ninja-orange md:text-3xl">
            Hệ Thống Nhẫn Giả
          </h2>
        </div>
      </Reveal>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:flex-row lg:items-stretch">
        {/* ===== Cột avatar dọc ===== */}
        <div className="flex shrink-0 items-center gap-3 lg:flex-col">
          <button
            aria-label="Trước"
            onClick={() => move(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-ninja-gold/40 text-ninja-gold transition hover:bg-ninja-orange hover:text-black max-lg:rotate-90"
          >
            ▲
          </button>

          <div
            ref={scrollRef}
            onPointerDown={onPointerDown}
            className="char-scroll flex max-w-[60vw] cursor-grab touch-pan-y gap-3 overflow-x-auto overflow-y-hidden select-none active:cursor-grabbing lg:h-[460px] lg:max-w-none lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden"
          >
            {CHARACTERS.map((ch, i) => {
              const on = i === active;
              return (
                <button
                  key={ch.id}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => selectChar(i)}
                  aria-label={ch.name}
                  className={`relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    on
                      ? "border-ninja-orange shadow-glow"
                      : "border-white/10 opacity-50 grayscale hover:opacity-90 hover:grayscale-0"
                  }`}
                >
                  <CharImg
                    src={ch.avatar}
                    alt={ch.name}
                    fallback={ch.name[0]}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          <button
            aria-label="Sau"
            onClick={() => move(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-ninja-gold/40 text-ninja-gold transition hover:bg-ninja-orange hover:text-black max-lg:rotate-90"
          >
            ▼
          </button>
        </div>

        {/* ===== Ảnh nhân vật lớn ===== */}
        <div className="relative flex flex-1 items-end justify-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.18),transparent_65%)]" />
          <CharImg
            key={c.id}
            src={c.art}
            alt={c.name}
            fallback={c.name}
            className="relative h-[520px] max-h-[80vh] w-auto max-w-full animate-[fade-in_0.4s_ease] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)] md:h-[620px] lg:h-[680px]"
          />
        </div>

        {/* ===== Thông tin + kỹ năng ===== */}
        <div className="flex w-full flex-col justify-center lg:w-[380px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-ninja-gold/40 bg-black/40 shadow-glow">
              <CharImg
                src={c.elemIcon}
                alt={c.element}
                fallback="⚔"
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="rounded border border-ninja-gold/40 px-2 py-1 text-xs font-bold uppercase tracking-widest text-ninja-gold">
              Hệ {c.element}
            </span>
          </div>

          <h3 className="font-display text-4xl font-extrabold uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-ninja-gold drop-shadow-[0_3px_0_rgba(183,28,28,0.6)] md:text-5xl">
            {c.name}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-ninja-gold/75">
            {c.desc}
          </p>

          {/* Dải icon kỹ năng (ảnh gốc) */}
          <CharImg
            key={`${c.id}-sk`}
            src={c.skillIcon}
            alt={`Kỹ năng ${c.name}`}
            fallback="Kỹ năng"
            className="mt-6 w-full max-w-[360px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
