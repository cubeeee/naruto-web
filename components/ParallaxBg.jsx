"use client";

import { useEffect, useRef } from "react";

// Ảnh nền trôi chậm theo cuộn (parallax). Đặt trong khối relative + overflow-hidden.
export default function ParallaxBg({ src, speed = 0.18, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.parentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      // chỉ tính khi khối còn trong/ gần viewport
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-[-18%] z-0 h-[136%] w-full object-cover will-change-transform ${className}`}
    />
  );
}
