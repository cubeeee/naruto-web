"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SLIDES } from "@/lib/data";

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  const go = useCallback(
    (n) => setIdx((p) => (n + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    timer.current = setInterval(() => setIdx((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-ninja-gold/20 shadow-glow">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== idx}
          >
            {/* Placeholder gradient — thay bằng <img src="/slides/slideN.webp"> */}
            <div className={`size-full bg-gradient-to-br ${s.tint} animate-ken-burns`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.7))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.4em] text-ninja-gold">
                Nhan Gia Toi Thuong
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-white drop-shadow-lg md:text-5xl">
                {s.title}
              </h2>
            </div>
          </div>
        ))}

        {/* Prev / Next */}
        <button
          aria-label="Previous"
          onClick={() => go(idx - 1)}
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ninja-gold/40 bg-black/50 text-ninja-gold transition hover:bg-ninja-orange hover:text-black"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => go(idx + 1)}
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ninja-gold/40 bg-black/50 text-ninja-gold transition hover:bg-ninja-orange hover:text-black"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-ninja-orange" : "w-2.5 bg-ninja-gold/30 hover:bg-ninja-gold/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
