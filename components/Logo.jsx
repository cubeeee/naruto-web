// Logo header — dùng ảnh app-icon.jpg
export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="Nhan Gia Toi Thuong"
        className="mt-3 h-[72px] w-auto object-contain drop-shadow-[0_0_10px_rgba(255,122,24,0.75)] md:mt-6 md:h-[92px]"
      />
    </div>
  );
}
