"use client";

import { useState } from "react";

// Banner nổi cố định bên trái như bản gốc (QR/giftcode floating).
export default function FloatingPromo() {
  const [hide, setHide] = useState(false);
  if (hide) return null;

  return (
    <div className="fixed left-2 top-24 z-40 hidden w-28 animate-floaty md:block xl:w-32">
      <div className="panel relative overflow-hidden p-3 text-center shadow-glow">
        <button
          onClick={() => setHide(true)}
          aria-label="Đóng"
          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-xs text-ninja-gold"
        >
          ✕
        </button>
        <p className="font-display text-[11px] font-bold uppercase tracking-widest text-ninja-gold">
          Quà Tân Thủ
        </p>
        <div className="mx-auto my-2 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-ninja-orange to-ninja-blood text-2xl">
          🎁
        </div>
        <a href="#download" className="block rounded bg-ninja-orange py-1 font-display text-[11px] font-bold uppercase text-black">
          Nhận ngay
        </a>
      </div>
    </div>
  );
}
