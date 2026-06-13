import Header from "@/components/Header";
import DownloadBox from "@/components/DownloadBox";
import FeatureSection from "@/components/FeatureSection";
import NewsSection from "@/components/NewsSection";
import CharacterSystem from "@/components/CharacterSystem";
import FloatingPromo from "@/components/FloatingPromo";
import SocialNav from "@/components/SocialNav";
import Reveal from "@/components/Reveal";
import ParallaxBg from "@/components/ParallaxBg";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <FloatingPromo />
      <SocialNav />

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-20 pt-28"
      >
        {/* Ảnh nền HERO (parallax) */}
        <ParallaxBg src="/bg1-1.png" speed={0.22} />
        {/* Lớp phủ tối giúp chữ nổi rõ */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(10,8,5,0.55)_0%,rgba(10,8,5,0.35)_45%,rgba(10,8,5,0.85)_100%)]" />

        <div className="relative z-10 flex w-full flex-1 flex-col items-center">
          {/* Logo lớn — căn giữa phần không gian phía trên */}
          <div className="flex flex-1 items-center justify-center py-8">
            <Reveal variant="pop" className="block w-full max-w-xl">
              <a
                href="#download"
                className="block w-full animate-upSaturateFast transition-all duration-300 hover:animate-bright2 hover:saturate-200"
              >
                <img
                  src="/logo.png"
                  alt="Shinobi Infinity War - Reviving the legendary Six Paths 2026"
                  className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(255,122,24,0.55)]"
                />
              </a>
            </Reveal>
          </div>

          {/* Hộp tải — nằm sát đáy, cách bottom theo pb-20 của section */}
          <Reveal variant="up" delay={150} className="w-full">
            <DownloadBox />
          </Reveal>
        </div>
      </section>

      <FeatureSection />
      <NewsSection />
      <CharacterSystem />
      <Footer />
    </main>
  );
}
