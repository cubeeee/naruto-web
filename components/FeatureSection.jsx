import FeatureSlider from "./FeatureSlider";
import Reveal from "./Reveal";
import ParallaxBg from "./ParallaxBg";

// Section "Tính Năng" — coverflow banner + parallax/reveal.
export default function FeatureSection() {
  return (
    <section id="feature" className="relative overflow-hidden pb-16 pt-2">
      <ParallaxBg src="/bg2-2.png" speed={0.16} />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <Reveal variant="pop">
          <img
            src="/feature.png"
            alt="Tính Năng"
            className="mx-auto -mb-10 w-[460px] max-w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] md:-mb-20 md:w-[760px]"
          />
        </Reveal>

        <Reveal variant="up" delay={150}>
          <FeatureSlider />
        </Reveal>
      </div>
    </section>
  );
}
