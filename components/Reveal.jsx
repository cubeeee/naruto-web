"use client";

import { useEffect, useRef, useState } from "react";

// Hiện khối với hiệu ứng khi cuộn tới (up | pop | left | right).
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  once = true,
}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            if (once) io.disconnect();
          } else if (!once) {
            setSeen(false);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      data-v={variant}
      style={{ animationDelay: `${delay}ms` }}
      className={`reveal ${seen ? "in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
