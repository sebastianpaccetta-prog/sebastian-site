import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        accent: {
          DEFAULT: "#73b844",
          hover: "#5fa233",
          soft: "#f1f8ea",
          ring: "#73b84433",
        },
        // Neutrals
        ink: {
          900: "#0f1115",
          700: "#2a2f38",
          500: "#5b6270",
          300: "#aab0bb",
        },
        bg: {
          DEFAULT: "#ffffff",
          alt: "#f7f7f5",
          line: "#ececec",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-instrument)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "Menlo"],
      },
      letterSpacing: {
        tightish: "-0.015em",
        tighter2: "-0.035em",
      },
      maxWidth: {
        prose2: "62ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,17,21,0.04), 0 8px 24px rgba(15,17,21,0.06)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
