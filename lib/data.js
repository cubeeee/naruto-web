// Sample data for the landing page. Replace content / real images in /public later.

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Account", href: "/account" },
  { label: "Fanpage", href: "https://www.facebook.com/ShinobiInfinityWar", external: true },
  { label: "FB Group", href: "https://www.facebook.com/ShinobiInfinityWar", external: true },
];

export const DOWNLOADS = [
  { label: "Download IOS", platform: "iOS", active: true, icon: "" },
  { label: "Download Android", platform: "Android", active: true, icon: "🤖" },
  { label: "Download APK", platform: "APK", active: true, icon: "📦" },
  { label: "Download PC", platform: "PC", active: false, icon: "💻" },
  { label: "Download H5", platform: "H5", active: false, icon: "🌐" },
];

// 7 slides like the original toithuong.com swiper
export const SLIDES = [
  { id: 1, title: "Reviving The Legendary Six Paths", tint: "from-orange-600/70 to-red-900/80" },
  { id: 2, title: "8 Mighty SSS Heroes", tint: "from-amber-500/70 to-orange-900/80" },
  { id: 3, title: "Three Realms Battle", tint: "from-rose-600/70 to-purple-900/80" },
  { id: 4, title: "Ninjutsu Awakening", tint: "from-sky-600/70 to-indigo-900/80" },
  { id: 5, title: "Sage Path Showdown", tint: "from-emerald-600/70 to-teal-900/80" },
  { id: 6, title: "Ancient Dream Dungeon", tint: "from-fuchsia-600/70 to-violet-900/80" },
  { id: 7, title: "Get Free VIP6 Now", tint: "from-yellow-500/70 to-amber-900/80" },
];

export const TABS = ["All", "Features", "News", "Guides"];

// Sample news data. `img` uses images already in /public (1.jpg..6.jpg)
// as mockup thumbnails. `hot` = HOT label.
export const POSTS = [
  {
    id: "p1",
    cat: "Features",
    tag: "FEATURE",
    title: "RUNES - Engraving Ancient Power",
    excerpt:
      "The Rune system lets you engrave seals onto heroes, boosting all stats and unlocking unique passive skills.",
    date: "2026-05-15",
    img: "/1.png",
    hot: true,
  },
  {
    id: "p2",
    cat: "Features",
    tag: "FEATURE",
    title: "AWAKENING - Unleash The Six Paths",
    excerpt:
      "Bring your main character into the Six Paths state, transforming their appearance and unleashing supreme damage.",
    date: "2026-05-14",
    img: "/2.png",
    hot: true,
  },
  {
    id: "p4",
    cat: "News",
    tag: "NEWS",
    title: "BLOCKBUSTER Shinobi Infinity War LAUNCHES this January!",
    excerpt:
      "Shinobi Infinity War launches in January - the sacred scroll opens the Three Realms for every ninja.",
    date: "2026-05-12",
    img: "/4.png",
    hot: true,
  },
  {
    id: "p5",
    cat: "News",
    tag: "NEWS",
    title: "7-Day Login Event: Get 2 SSS Heroes",
    excerpt:
      "Log in for 7 days in a row to grab 2 SSS heroes plus a huge resource pack for newcomers.",
    date: "2026-05-11",
    img: "/5.png",
  },
  {
    id: "p6",
    cat: "News",
    tag: "NEWS",
    title: "Scheduled Maintenance & Version 2.0 Update",
    excerpt:
      "Server maintenance schedule and details of the major version 2.0 content update coming soon.",
    date: "2026-05-10",
    img: "/6.png",
  },
  {
    id: "p7",
    cat: "Guides",
    tag: "GUIDE",
    title: "Complaint Reception & Resolution Process",
    excerpt:
      "Detailed guide to the complaint reception and handling process to protect players' rights.",
    date: "2026-05-09",
    img: "/1.png",
  },
  {
    id: "p8",
    cat: "Guides",
    tag: "GUIDE",
    title: "How To Top Up & Claim Newcomer Giftcodes",
    excerpt:
      "Safe top-up steps and how to activate newcomer giftcodes in just a few seconds.",
    date: "2026-05-08",
    img: "/2.png",
  },
];

// Slides for the "Features" coverflow (like image 2).
// Add real images: put files in /public/features/ then fill `img`.
export const FEATURE_SLIDES = [
  { id: 1, sub: "Log in for rewards", title: "FREE VIP", img: "/1.png", tint: "from-amber-600 to-orange-900" },
  { id: 2, sub: "Ninja Arena", title: "TOP-TIER PVP", img: "/2.png", tint: "from-rose-700 to-purple-950" },
  { id: 4, sub: "Grind hard", title: "VIP TO THE TOP", img: "/4.png", tint: "from-orange-600 to-red-900" },
  { id: 5, sub: "Log in daily", title: "NEWCOMER GIFTS", img: "/5.png", tint: "from-emerald-600 to-teal-900" },
  { id: 6, sub: "Hot events", title: "RANK FOR REWARDS", img: "/6.png", tint: "from-fuchsia-600 to-violet-950" },
];

// Ninja roster — real images downloaded from huyenthoailangla.vn (scripts/download-char-assets.mjs)
const CHAR_BASE = "/assets/frontend/home/v1/images/char";
export const CHARACTERS = [
  {
    id: 1,
    name: "Uzumaki Naruto",
    element: "Wind",
    avatar: `${CHAR_BASE}/avata/Uzumaki-Naruto.png`,
    art: `${CHAR_BASE}/art/Uzumaki-Naruto.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Naruto/Phong.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Naruto/icon-skill.png`,
    desc: "[Ninjutsu] Attacks 1 enemy, dealing [Wind] damage, guaranteed to inflict [Knockback] and a 30% chance to inflict [Seal] (cannot cast Ultimate for 1 turn); restores 100 Chakra to self.",
  },
  {
    id: 2,
    name: "Uchiha Sasuke",
    element: "Lightning",
    avatar: `${CHAR_BASE}/avata/Uchiha-Sasuke-2.png`,
    art: `${CHAR_BASE}/art/Uchiha-Sasuke.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Uchiha-Sasuke/Loi.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Uchiha-Sasuke/icon-skill.png`,
    desc: "Ultimate awakened. [Ninjutsu] Attacks 1 enemy column, dealing [Lightning] damage, guaranteed to inflict [Knockdown], with +35% Crit Rate and +30% Crit Damage.",
  },
  {
    id: 3,
    name: "Haruno Sakura",
    element: "Earth",
    avatar: `${CHAR_BASE}/avata/Sakura.png`,
    art: `${CHAR_BASE}/art/Haruno-Sakura.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Haruno-Sakura/Son.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Haruno-Sakura/icon-skill.png`,
    desc: "Heals the entire allied team and grants 400 Chakra to a random front-line ally.",
  },
  {
    id: 4,
    name: "Hatake Kakashi",
    element: "Lightning",
    avatar: `${CHAR_BASE}/avata/Hatake-Kakashi-1.png`,
    art: `${CHAR_BASE}/art/Hatake-Kakashi.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Hatake-Kakashi/Loi.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Hatake-Kakashi/icon-skill.png`,
    desc: "[Taijutsu/Ninjutsu] Attacks 1 enemy column, dealing [Lightning] damage; if it defeats a target, casts the Ultimate again at 70% damage.",
  },
  {
    id: 5,
    name: "Gaara",
    element: "Earth",
    avatar: `${CHAR_BASE}/avata/Gaara.png`,
    art: `${CHAR_BASE}/art/Gaara.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Gaara/Son.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Gaara/icon-skill.png`,
    desc: "Ultimate awakened. Restores a little HP to self and grants an HP Shield to the allied front row equal to 3.5x own Defense. Removes all debuffs.",
  },
  {
    id: 6,
    name: "Jiraiya",
    element: "Fire",
    avatar: `${CHAR_BASE}/avata/Jiraiya.png`,
    art: `${CHAR_BASE}/art/Jiraiya.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Jiraiya/hoa.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Jiraiya/icon-skill.png`,
    desc: "[Ninjutsu] Deals damage to 1 enemy row, [Knockback] on the main target, absorbing each target's Defense; if the team has 2+ female Ninja, gains an extra 25% Damage Reduction.",
  },
  {
    id: 7,
    name: "Namikaze Minato",
    element: "Wind",
    avatar: `${CHAR_BASE}/avata/Namikaze-Minato.png`,
    art: `${CHAR_BASE}/art/Namikaze-Minato.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Namikaze-Minato/Phong.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Namikaze-Minato/icon-skill.png`,
    desc: "[Ninjutsu] Attacks 1 enemy, dealing [Wind] damage, guaranteed to inflict [Knockdown]; nearby enemies take an extra 35% damage, and removes the target's buffs.",
  },
  {
    id: 8,
    name: "Orochimaru",
    element: "Wind",
    avatar: `${CHAR_BASE}/avata/Orochimaru.png`,
    art: `${CHAR_BASE}/art/Orochimaru.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Orochimaru/Phong.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Orochimaru/icon-skill.png`,
    desc: "[Taijutsu/Ninjutsu] Attacks the whole enemy team; the fewer enemies, the higher the damage. [Launch] the main target, with a 30% chance to drain 300 Chakra from each enemy.",
  },
  {
    id: 9,
    name: "Pain",
    element: "Lightning",
    avatar: `${CHAR_BASE}/avata/Pain.png`,
    art: `${CHAR_BASE}/art/Pain.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Pain/Loi.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Pain/icon-skill.png`,
    desc: "[Ninjutsu] Attacks 1 enemy, gains +15% Damage & Ninjutsu Resistance, [Suppress] the target; follows up after an ally casts an Ultimate, up to 2 times per turn.",
  },
  {
    id: 10,
    name: "Tsunade",
    element: "Earth",
    avatar: `${CHAR_BASE}/avata/Tsunade.png`,
    art: `${CHAR_BASE}/art/Tsunade.png`,
    elemIcon: `${CHAR_BASE}/skillbottom/Tsunade/Son.png`,
    skillIcon: `${CHAR_BASE}/skillbottom/Tsunade/icon-skill.png`,
    desc: "[Taijutsu] Attacks 1 enemy, cleanses debuffs from allied female Ninja, converts 15% of damage into HP for the whole team, guaranteed to inflict [Launch].",
  },
];

export const FEATURE_CARDS = [
  { name: "Runes", icon: "📜", desc: "Engrave to boost stats" },
  { name: "Three Realms Battle", icon: "⚔️", desc: "PvP combat" },
  { name: "Awakening", icon: "🌀", desc: "Unleash the Six Paths" },
  { name: "Sage Guild", icon: "🏯", desc: "Guild activities" },
  { name: "Three Sages' Relic", icon: "🔮", desc: "Mystery dungeon" },
  { name: "Dragon Ball", icon: "🐉", desc: "Summon the beast" },
];
