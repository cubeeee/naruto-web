/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ninja: {
          bg: "#0a0805",
          panel: "#15100a",
          gold: "#f5c542",
          orange: "#ff7a18",
          ember: "#ff4d2d",
          blood: "#b71c1c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255,122,24,0.55)",
        "glow-gold": "0 0 28px rgba(245,197,66,0.55)",
      },
      keyframes: {
        bright: {
          "0%,100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.35) saturate(1.4)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        // Hiệu ứng gốc của toithuong.com
        upSaturate: {
          "0%,100%": { filter: "saturate(1) brightness(1)" },
          "50%": { filter: "saturate(1.5) brightness(1.1)" },
        },
        upSaturateY: {
          "0%,100%": {
            filter: "saturate(1) brightness(1)",
            transform: "translateZ(0)",
          },
          "50%": {
            filter: "saturate(1.5) brightness(1.1)",
            transform: "translate3d(0,5px,0)",
          },
        },
        // bright2 gốc: sáng + giật/nảy (scale + rotate) khi hover
        bright2: {
          "0%": { filter: "brightness(1) saturate(1)", transform: "scale(1)" },
          "30%": {
            filter: "brightness(1.5) saturate(1.3)",
            transform: "scale(1.05)",
          },
          "60%": {
            filter:
              "brightness(1.8) saturate(1.5) drop-shadow(0 0 8px rgba(255,255,255,.9))",
            transform: "scale(.98)",
          },
          "75%": {
            filter:
              "brightness(2) saturate(1.6) drop-shadow(0 0 15px rgba(255,255,255,.8))",
            transform: "scale(1.02) rotate(1deg)",
          },
          "85%": {
            filter:
              "brightness(1.7) saturate(1.4) drop-shadow(0 0 12px rgba(255,255,255,.7))",
            transform: "scale(.99) rotate(-.5deg)",
          },
          "100%": {
            filter: "brightness(1) saturate(1)",
            transform: "scale(1) rotate(0deg)",
          },
        },
      },
      animation: {
        bright: "bright 1.4s ease-in-out infinite",
        floaty: "floaty 3.5s ease-in-out infinite",
        "ken-burns": "ken-burns 8s ease-out infinite alternate",
        "spin-slow": "spin-slow 14s linear infinite",
        upSaturate: "upSaturate 2s ease-in-out infinite",
        upSaturateFast: "upSaturate 0.5s ease-in-out infinite",
        upSaturateY: "upSaturateY 2s ease-in-out infinite",
        bright2: "bright2 0.5s cubic-bezier(.4,0,.2,1)",
      },
    },
  },
  plugins: [],
};
