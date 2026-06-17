import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-ninja-gold/15 bg-[linear-gradient(180deg,#0a0805,#000)] pt-12">
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ninja-gold/55">
              Shinobi Infinity War — Reviving the legendary Six Paths 2026. A
              ninja-inspired strategy RPG: collect SSS heroes and conquer the
              Three Realms.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ninja-gold">
              Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ninja-gold/55">
              {[
                { label: "Home", href: "/" },
                { label: "Account", href: "/account" },
                { label: "Fanpage", href: "https://www.facebook.com/ShinobiInfinityWar", external: true },
                { label: "FB Group", href: "https://www.facebook.com/ShinobiInfinityWar", external: true },
                { label: "TikTok", href: "https://www.tiktok.com/@shinobiinfinitywar", external: true },
                { label: "Terms", href: "#" },
              ].map((x) => (
                <li key={x.label}>
                  <a
                    href={x.href}
                    target={x.external ? "_blank" : undefined}
                    rel={x.external ? "noreferrer" : undefined}
                    className="transition hover:text-ninja-orange"
                  >
                    {x.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ninja-gold">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ninja-gold/55">
              <li>
                Discord:{" "}
                <a
                  href="https://discord.gg/PreE9R3p7F"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ninja-orange transition hover:text-ninja-gold"
                >
                  Join our server
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:shinobigame102@gmail.com"
                  className="text-ninja-orange transition hover:text-ninja-gold"
                >
                  shinobigame102@gmail.com
                </a>
              </li>
              <li>Working hours: 8am - 10pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/5 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-ninja-gold/40">
            © 2026 Shinobi Infinity War. Interface clone for educational purposes.
          </p>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ninja-ember font-display text-sm font-extrabold text-ninja-ember">
              18+
            </span>
            <span className="text-xs text-ninja-gold/40">
              Playing more than 180 minutes a day is harmful to your health.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
