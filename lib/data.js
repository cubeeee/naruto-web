// Dữ liệu mẫu cho landing page. Thay nội dung / ảnh thật trong /public sau.

export const NAV_LINKS = [
  { label: "Trang chủ", href: "#home" },
  { label: "Tài khoản", href: "#account" },
  { label: "Fanpage", href: "#" },
  { label: "Group FB", href: "#" },
];

export const DOWNLOADS = [
  { label: "Download IOS", platform: "iOS", active: true, icon: "" },
  { label: "Download Android", platform: "Android", active: true, icon: "🤖" },
  { label: "Download APK", platform: "APK", active: true, icon: "📦" },
  { label: "Download PC", platform: "PC", active: false, icon: "💻" },
  { label: "Download H5", platform: "H5", active: false, icon: "🌐" },
];

// 7 slide như swiper gốc của toithuong.com
export const SLIDES = [
  { id: 1, title: "Tái Hiện Lục Đạo Huyền Thoại", tint: "from-orange-600/70 to-red-900/80" },
  { id: 2, title: "8 Tướng SSS Cực Mạnh", tint: "from-amber-500/70 to-orange-900/80" },
  { id: 3, title: "Đấu Pháp Tam Giới", tint: "from-rose-600/70 to-purple-900/80" },
  { id: 4, title: "Thức Tỉnh Nhẫn Thuật", tint: "from-sky-600/70 to-indigo-900/80" },
  { id: 5, title: "Tiên Đạo Hội Đối Kháng", tint: "from-emerald-600/70 to-teal-900/80" },
  { id: 6, title: "Cổ Mộng Phó Bản", tint: "from-fuchsia-600/70 to-violet-900/80" },
  { id: 7, title: "Nhận Ngay VIP6 Miễn Phí", tint: "from-yellow-500/70 to-amber-900/80" },
];

export const TABS = ["Tất cả", "Tính năng", "Tin tức", "Hướng Dẫn"];

// Dữ liệu mẫu tin tức. `img` dùng ảnh có sẵn trong /public (1.jpg..6.jpg)
// làm mockup thumbnail. `hot` = gắn nhãn HOT.
export const POSTS = [
  {
    id: "p1",
    cat: "Tính năng",
    tag: "TÍNH NĂNG",
    title: "LINH VĂN - Khắc Ấn Sức Mạnh Cổ Đại",
    excerpt:
      "Hệ thống Linh Văn cho phép khắc ấn lên tướng, tăng chỉ số toàn diện và mở khóa kỹ năng bị động độc nhất.",
    date: "2026-05-15",
    img: "/1.jpg",
    hot: true,
  },
  {
    id: "p2",
    cat: "Tính năng",
    tag: "TÍNH NĂNG",
    title: "THỨC TỈNH - Giải Phóng Lục Đạo",
    excerpt:
      "Đưa nhân vật chính bước vào trạng thái Lục Đạo, lột xác ngoại hình và bùng nổ sát thương tối thượng.",
    date: "2026-05-14",
    img: "/2.jpg",
    hot: true,
  },
  {
    id: "p3",
    cat: "Tính năng",
    tag: "TÍNH NĂNG",
    title: "VIP VÀ ĐẶC QUYỀN - Quyền Lực Nhẫn Giả",
    excerpt:
      "Giới thiệu tính năng VIP của game Nhẫn Giả Tối Thượng cùng hàng loạt đặc quyền độc tôn cho người chơi.",
    date: "2026-05-13",
    img: "/3.jpg",
  },
  {
    id: "p4",
    cat: "Tin tức",
    tag: "TIN TỨC",
    title: "SIÊU PHẨM Nhẫn Giả Tối Thượng SẮP RA MẮT tháng 1!",
    excerpt:
      "Nhẫn Giả Tối Thượng khởi hành tháng 1 - Cuốn Phật Tổ trao, mở khai Tam Giới cho toàn thể ninja.",
    date: "2026-05-12",
    img: "/4.jpg",
    hot: true,
  },
  {
    id: "p5",
    cat: "Tin tức",
    tag: "TIN TỨC",
    title: "Sự Kiện Đăng Nhập 7 Ngày Nhận 2 Tướng SSS",
    excerpt:
      "Đăng nhập liên tục 7 ngày để rinh ngay 2 tướng SSS cùng kho tài nguyên khủng cho tân thủ.",
    date: "2026-05-11",
    img: "/5.jpg",
  },
  {
    id: "p6",
    cat: "Tin tức",
    tag: "TIN TỨC",
    title: "Bảo Trì Định Kỳ & Cập Nhật Phiên Bản 2.0",
    excerpt:
      "Lịch bảo trì máy chủ và chi tiết nội dung cập nhật lớn phiên bản 2.0 sắp tới.",
    date: "2026-05-10",
    img: "/6.jpg",
  },
  {
    id: "p7",
    cat: "Hướng Dẫn",
    tag: "HƯỚNG DẪN",
    title: "Quy Trình Tiếp Nhận & Giải Quyết Khiếu Nại",
    excerpt:
      "Hướng dẫn chi tiết quy trình tiếp nhận và xử lý khiếu nại để bảo vệ quyền lợi người chơi.",
    date: "2026-05-09",
    img: "/1.jpg",
  },
  {
    id: "p8",
    cat: "Hướng Dẫn",
    tag: "HƯỚNG DẪN",
    title: "Hướng Dẫn Nạp Thẻ & Nhận Giftcode Tân Thủ",
    excerpt:
      "Các bước nạp thẻ an toàn và cách kích hoạt giftcode tân thủ chỉ trong vài giây.",
    date: "2026-05-08",
    img: "/2.jpg",
  },
  {
    id: "p9",
    cat: "Hướng Dẫn",
    tag: "HƯỚNG DẪN",
    title: "Cách Liên Kết Tài Khoản & Chơi Ngay",
    excerpt:
      "Liên kết tài khoản chỉ với vài thao tác để bảo vệ nhân vật và nhận quà liên kết.",
    date: "2026-05-07",
    img: "/3.jpg",
  },
];

// Slide cho coverflow "Tính Năng" (giống hình 2).
// Thêm ảnh thật: đặt file vào /public/features/ rồi điền `img`.
export const FEATURE_SLIDES = [
  { id: 1, sub: "Đăng nhập nhận quà", title: "FREE VIP", img: "/1.jpg", tint: "from-amber-600 to-orange-900" },
  { id: 2, sub: "Đấu trường Ninja", title: "PVP ĐỈNH CAO", img: "/2.jpg", tint: "from-rose-700 to-purple-950" },
  { id: 3, sub: "Admin đồng hành", title: "HỖ TRỢ NHIỆT TÌNH", img: "/3.jpg", tint: "from-yellow-500 to-amber-800" },
  { id: 4, sub: "Cày hết mình", title: "VIP LÊN ĐỈNH", img: "/4.jpg", tint: "from-orange-600 to-red-900" },
  { id: 5, sub: "Đăng nhập mỗi ngày", title: "QUÀ TÂN THỦ", img: "/5.jpg", tint: "from-emerald-600 to-teal-900" },
  { id: 6, sub: "Sự kiện hot", title: "ĐUA TOP NHẬN THƯỞNG", img: "/6.jpg", tint: "from-fuchsia-600 to-violet-950" },
];

// Hệ thống nhẫn giả — ảnh thật tải từ huyenthoailangla.vn (scripts/download-char-assets.mjs)
const CHAR_BASE = "/assets/frontend/home/v1/images/char";
export const CHARACTERS = [
  {
    id: 1,
    name: "Uzumaki Naruto",
    element: "Phong",
    avatar: `${CHAR_BASE}/avata/Uzumaki-Naruto.png`,
    art: `${CHAR_BASE}/art/Uzumaki-Naruto.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Naruto/Phong.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Naruto/icon-skill.png`,
    desc: "[Nhẫn Thuật] Tấn công 1 kẻ địch, gây sát thương hệ [Phong], chắc chắn gây [Đẩy Lui] và có 30% tỷ lệ gây [Phong Huyệt] (không thể thi triển Bí Kỹ 1 lượt), bản thân hồi 100 Chakra.",
  },
  {
    id: 2,
    name: "Uchiha Sasuke",
    element: "Lôi",
    avatar: `${CHAR_BASE}/avata/Uchiha-Sasuke-2.png`,
    art: `${CHAR_BASE}/art/Uchiha-Sasuke.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Uchiha-Sasuke/Loi.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Uchiha-Sasuke/icon-skill.png`,
    desc: "Bí Kỹ đã thức tỉnh. [Nhẫn Thuật] Tấn công 1 hàng dọc địch, gây sát thương hệ [Lôi], chắc chắn gây cho mục tiêu [Gục Ngã], kèm 35% Tỷ lệ Bạo và 30% Cường độ Bạo.",
  },
  {
    id: 3,
    name: "Haruno Sakura",
    element: "Sơn",
    avatar: `${CHAR_BASE}/avata/Sakura.png`,
    art: `${CHAR_BASE}/art/Haruno-Sakura.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Haruno-Sakura/Son.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Haruno-Sakura/icon-skill.png`,
    desc: "Tiến hành trị thương cho toàn bộ phe ta, tăng cho 1 đồng đội hàng đầu ngẫu nhiên 400 Chakra.",
  },
  {
    id: 4,
    name: "Hatake Kakashi",
    element: "Lôi",
    avatar: `${CHAR_BASE}/avata/Hatake-Kakashi-1.png`,
    art: `${CHAR_BASE}/art/Hatake-Kakashi.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Hatake-Kakashi/Loi.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Hatake-Kakashi/icon-skill.png`,
    desc: "[Thể Thuật/Nhẫn Thuật] Tấn công 1 hàng dọc địch, gây sát thương hệ [Lôi], nếu gây Đánh Bại thì thi triển kỹ năng Bí Kỹ lần nữa, hệ số sát thương bằng 70%.",
  },
  {
    id: 5,
    name: "Gaara",
    element: "Sơn",
    avatar: `${CHAR_BASE}/avata/Gaara.png`,
    art: `${CHAR_BASE}/art/Gaara.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Gaara/Son.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Gaara/icon-skill.png`,
    desc: "Bí Kỹ thức tỉnh. Hồi ít HP cho bản thân, tăng Khiên HP cho hàng trước phe ta bằng Thủ bản thân x3.5. Xóa toàn bộ trạng thái xấu.",
  },
  {
    id: 6,
    name: "Jiraiya",
    element: "Hỏa",
    avatar: `${CHAR_BASE}/avata/Jiraiya.png`,
    art: `${CHAR_BASE}/art/Jiraiya.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Jiraiya/hoa.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Jiraiya/icon-skill.png`,
    desc: "[Nhẫn Thuật] Gây sát thương 1 hàng ngang địch, [Đẩy Lui] mục tiêu chính, hấp thu Thủ của mỗi mục tiêu; nếu phe ta có từ 2 Ninja nữ, nhận thêm 25% Miễn sát thương.",
  },
  {
    id: 7,
    name: "Namikaze Minato",
    element: "Phong",
    avatar: `${CHAR_BASE}/avata/Namikaze-Minato.png`,
    art: `${CHAR_BASE}/art/Namikaze-Minato.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Namikaze-Minato/Phong.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Namikaze-Minato/icon-skill.png`,
    desc: "[Nhẫn Thuật] Tấn công 1 kẻ địch, gây sát thương hệ [Phong], chắc chắn gây [Gục Ngã], kẻ địch xung quanh gánh thêm 35% sát thương, xóa hiệu quả buff của mục tiêu.",
  },
  {
    id: 8,
    name: "Orochimaru",
    element: "Phong",
    avatar: `${CHAR_BASE}/avata/Orochimaru.png`,
    art: `${CHAR_BASE}/art/Orochimaru.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Orochimaru/Phong.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Orochimaru/icon-skill.png`,
    desc: "[Thể Thuật/Nhẫn Thuật] Tấn công cả đội địch, kẻ địch càng ít sát thương càng cao, gây Hất Tung mục tiêu chính, 30% tỷ lệ giảm 300 Chakra mỗi địch.",
  },
  {
    id: 9,
    name: "Pain",
    element: "Lôi",
    avatar: `${CHAR_BASE}/avata/Pain.png`,
    art: `${CHAR_BASE}/art/Pain.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Pain/Loi.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Pain/icon-skill.png`,
    desc: "[Nhẫn Thuật] Tấn công 1 kẻ địch, bản thân tăng 15% Sát Thương & Kháng Nhẫn Thuật, [Áp Chế] mục tiêu; sau khi đồng đội tung Bí Kỹ sẽ truy kích, tối đa 2 lần/lượt.",
  },
  {
    id: 10,
    name: "Tsunade",
    element: "Sơn",
    avatar: `${CHAR_BASE}/avata/Tsunade.png`,
    art: `${CHAR_BASE}/art/Tsunade.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Tsunade/Son.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Tsunade/icon-skill.png`,
    desc: "[Thể Thuật] Tấn công 1 kẻ địch, giải trừ hiệu quả xấu cho Ninja nữ phe ta, chuyển hóa 15% sát thương thành HP cho toàn đội, chắc chắn gây [Hất Tung].",
  },
];

export const FEATURE_CARDS = [
  { name: "Linh Văn", icon: "📜", desc: "Khắc ấn tăng chỉ số" },
  { name: "Đấu Pháp Tam Giới", icon: "⚔️", desc: "PvP đối kháng" },
  { name: "Thức Tỉnh", icon: "🌀", desc: "Giải phóng Lục Đạo" },
  { name: "Tiên Đạo Hội", icon: "🏯", desc: "Hoạt động bang hội" },
  { name: "Bí Tích Tam Tiên", icon: "🔮", desc: "Phó bản bí ẩn" },
  { name: "Long Châu", icon: "🐉", desc: "Triệu hồi thần thú" },
];
