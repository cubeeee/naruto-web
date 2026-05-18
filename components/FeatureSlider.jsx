"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FEATURE_SLIDES } from "@/lib/data";

const N = FEATURE_SLIDES.length;

// Coverflow theo đúng cơ chế Swiper gốc toithuong.com:
//  - không rotateY, không đổi scale
//  - slide active: brightness(1), z gần nhất (translateZ 0)
//  - slide khác: brightness(.6), lùi sâu theo translateZ âm (-200,-400,-600,-800)
//  - khung bg-item-slide.webp phía sau + ảnh slide phủ kín
export default function FeatureSlider() {
  const [active, setActive] = useState(Math.floor(N / 2));
  const [failed, setFailed] = useState({});
  const timer = useRef(null);

  const go = useCallback((dir) => setActive((p) => (p + dir + N) % N), []);

  useEffect(() => {
    timer.current = setInterval(() => setActive((p) => (p + 1) % N), 4000);
    return () => clearInterval(timer.current);
  }, []);

  // khoảng cách ngắn nhất (wrap vòng)
  const rel = (i) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const styleFor = (d) => {
    const ad = Math.abs(d);
    if (ad > 3) return { opacity: 0, pointerEvents: "none" };
    // translateX: xếp slide cạnh nhau ; translateZ: lùi sâu giống gốc (-200 mỗi bậc)
    const x = d * 52;
    const z = -200 * ad;
    return {
      transform: `translate(-50%,-50%) translateX(${x}%) translateZ(${z}px)`,
      filter: ad === 0 ? "brightness(1)" : "brightness(.6)",
      zIndex: 10 - ad,
      opacity: ad >= 3 ? 0.3 : 1,
    };
  };

  return (
    <section className="relative z-10 w-full select-none">
      <div className="relative">
        <div
          className="relative mx-auto h-[360px] w-full md:h-[520px] lg:h-[588px]"
          style={{ perspective: "1200px" }}
        >
          {FEATURE_SLIDES.map((s, i) => {
            const d = rel(i);
            return (
              <div
                key={s.id}
                onClick={() => d !== 0 && setActive(i)}
                role="group"
                aria-label={`${i + 1} / ${N}`}
                className="absolute left-1/2 top-1/2 aspect-[618/588] h-full cursor-pointer overflow-hidden rounded-[15px] bg-transparent transition-all duration-300"
                style={styleFor(d)}
              >
                {/* Khung nền slide (nếu có) */}
                {!failed["frame"] && (
                  <img
                    src="/bg-item-slide.webp"
                    alt=""
                    aria-hidden
                    onError={() => setFailed((f) => ({ ...f, frame: true }))}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                )}
                {/* Ảnh slide / fallback gradient + chữ */}
                {s.img && !failed[s.id] ? (
                  <img
                    src={s.img}
                    alt={s.title}
                    onError={() => setFailed((f) => ({ ...f, [s.id]: true }))}
                    className="block size-full object-cover"
                  />
                ) : (
                  <div className={`relative size-full bg-gradient-to-br ${s.tint}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.6))]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                      <p className="font-display text-sm font-bold uppercase tracking-widest text-ninja-gold drop-shadow md:text-base">
                        {s.sub}
                      </p>
                      <p className="font-display text-2xl font-extrabold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-4xl">
                        {s.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute top-1/2 z-40 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 hover:saturate-150 max-md:left-1 max-md:size-[50px] md:left-6 md:size-[68px] lg:left-10"
        >
          <img
            src="/icon-prev.webp"
            alt="Previous"
            width={68}
            height={68}
            className="size-full object-contain"
          />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute top-1/2 z-40 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 hover:saturate-150 max-md:right-1 max-md:size-[50px] md:right-6 md:size-[68px] lg:right-10"
        >
          <img
            src="/icon-prev.webp"
            alt="Next"
            width={68}
            height={68}
            className="size-full rotate-180 object-contain"
          />
        </button>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {FEATURE_SLIDES.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === active
                  ? "w-8 bg-ninja-orange"
                  : "w-2.5 bg-ninja-gold/30 hover:bg-ninja-gold/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
