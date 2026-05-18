"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 shadow-glow" : "bg-black/70"
      } backdrop-blur`}
    >
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4">
        <Logo />

        {/* Nav desktop */}
        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative px-6 py-2 font-display text-sm font-bold uppercase tracking-wider text-ninja-gold/90 transition hover:text-ninja-gold"
            >
              {l.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-ninja-orange to-ninja-blood transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#download" className="btn-outline">
            Giftcode
          </a>
          <a href="#download" className="btn-ninja">
            Nạp thẻ
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-ninja-gold/40 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-ninja-gold transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-ninja-gold transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-ninja-gold transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-ninja-gold/15 bg-black/95 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-300`}
      >
        <nav className="flex flex-col p-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 font-display text-sm font-bold uppercase tracking-wider text-ninja-gold/90"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <a href="#download" className="btn-outline flex-1" onClick={() => setOpen(false)}>
              Giftcode
            </a>
            <a href="#download" className="btn-ninja flex-1" onClick={() => setOpen(false)}>
              Nạp thẻ
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
