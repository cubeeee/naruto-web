import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-ninja-gold/15 bg-[linear-gradient(180deg,#0a0805,#000)] pt-12">
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ninja-gold/55">
              Nhẫn Giả Tối Thượng — Tái hiện Lục Đạo huyền thoại 2026. Game nhập
              vai chiến thuật lấy cảm hứng nhẫn giả, sưu tầm tướng SSS và chinh
              phục Tam Giới.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ninja-gold">
              Liên kết
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ninja-gold/55">
              {["Trang chủ", "Tài khoản", "Fanpage", "Group FB", "Điều khoản"].map((x) => (
                <li key={x}>
                  <a href="#" className="transition hover:text-ninja-orange">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ninja-gold">
              Hỗ trợ
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ninja-gold/55">
              <li>Hotline: 1900 xxxx</li>
              <li>Email: cskh@nhangia.example</li>
              <li>Giờ làm việc: 8h - 22h</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/5 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-ninja-gold/40">
            © 2026 Nhẫn Giả Tối Thượng. Bản clone giao diện cho mục đích học tập.
          </p>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ninja-ember font-display text-sm font-extrabold text-ninja-ember">
              18+
            </span>
            <span className="text-xs text-ninja-gold/40">
              Chơi quá 180 phút mỗi ngày sẽ ảnh hưởng xấu đến sức khỏe.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
