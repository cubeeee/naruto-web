import NewsPanel from "./NewsPanel";
import Reveal from "./Reveal";
import ParallaxBg from "./ParallaxBg";

// Section "Bản Tin" / Tin Tức — parallax/reveal.
export default function NewsSection() {
  return (
    <section id="news" className="relative overflow-hidden pb-16 pt-2">
      <ParallaxBg src="/bg2-2.png" speed={0.16} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <Reveal variant="pop">
          <img
            src="/new.png"
            alt="News"
            className="mx-auto -mb-10 w-[460px] max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:-mb-20 md:w-[760px]"
          />
        </Reveal>

        <Reveal variant="up" delay={150}>
          <NewsPanel />
        </Reveal>
      </div>
    </section>
  );
}
