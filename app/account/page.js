import AccountForm from "@/components/AccountForm";

export const metadata = {
  title: "Login / Register - Nhan Gia Toi Thuong",
  description:
    "Log in or register a Nhan Gia Toi Thuong account using your game account.",
};

export default function AccountPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16">
      {/* Ảnh nền trận chiến (mờ) - thay bằng ảnh của bạn trong /public nếu muốn */}
      <div
        className="absolute inset-0 z-0 scale-110 bg-cover bg-center blur-[2px]"
        style={{ backgroundImage: "url(/bg1-1.png)" }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(10,8,5,.35),rgba(10,8,5,.82))]" />

      {/* Về trang chủ */}
      <a
        href="/"
        className="absolute left-4 top-4 z-20 rounded-md border border-ninja-gold/40 bg-black/50 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-ninja-gold backdrop-blur transition hover:bg-ninja-gold hover:text-black"
      >
        ← Home
      </a>

      <div className="relative z-10 w-full">
        <AccountForm />
      </div>
    </main>
  );
}
