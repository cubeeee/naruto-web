// Thanh social/info dọc cố định bên phải — theo cấu trúc gốc toithuong.com
export default function SocialNav() {
  const hv =
    "transition-all duration-300 hover:-translate-x-1 hover:scale-105 hover:saturate-150";

  return (
    <div className="group/social fixed right-0 top-0 z-[100] flex h-[716px] w-[55px] flex-col items-center justify-start bg-gradient-to-b from-white/15 to-transparent pt-[100px] max-lg:absolute max-lg:z-40">
      {/* Follow xoay dọc */}
      <div className="my-8 rotate-90 text-sm font-medium text-ninja-gold/80 transition-all duration-300 group-hover/social:font-bold group-hover/social:text-ninja-orange">
        Follow
      </div>
      <div className="mb-6 h-8 w-px bg-ninja-gold/30 transition-colors duration-300 group-hover/social:bg-ninja-orange/70" />

      <a
        className="mb-4"
        title="Facebook"
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/Nhangiatoithuong"
      >
        <img src="/social/icon-fanpage.webp" alt="facebook" width={35} height={35} className={hv} />
      </a>
      <a
        className="mb-4"
        title="Facebook Group"
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/groups/nhangiatoithuong"
      >
        <img src="/social/icon-group.webp" alt="facebook group" width={35} height={35} className={hv} />
      </a>
      <span className="mb-4" title="Youtube (coming soon)">
        <img
          src="/social/icon-youtube.webp"
          alt="youtube"
          width={35}
          height={35}
          className="opacity-60 grayscale"
        />
      </span>
      <span className="mb-4" title="Tiktok (coming soon)">
        <img
          src="/social/icon-tiktok.webp"
          alt="tiktok"
          width={35}
          height={35}
          className="opacity-60 grayscale"
        />
      </span>

      <div className="my-6 h-px w-8 bg-ninja-gold/30 transition-colors duration-300 group-hover/social:bg-ninja-orange/70" />

      <button className="mb-4" title="Support" type="button">
        <img src="/social/icon-support.webp" alt="support" width={35} height={35} className={hv} />
      </button>

      <div className="relative mb-4">
        <img src="/social/flag.webp" alt="Language" width={35} height={35} className={hv} />
        <span className="absolute bottom-[-2px] right-[-2px] flex size-3 items-center justify-center rounded-md bg-white text-[8px]">
          🇬🇧
        </span>
      </div>
    </div>
  );
}
