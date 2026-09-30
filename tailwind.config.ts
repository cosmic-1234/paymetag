import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#F4F7F8",
        surface: {
          50: "#FFFFFF",
          100: "#F4F7F8",
          200: "#EBF1F2",
          300: "#DBE6E5",
          400: "#B8CDC9",
          DEFAULT: "#FFFFFF",
        },
        deshboard: {
          navy: "#001535",
          deep: "#000E24",
          teal: "#336765",
          pine: "#234947",
          tealLight: "#EEF5F4",
          tealHover: "#285250",
          border: "#E2EBEA",
          slate: "#F4F7F8",
        },
        razorpay: {
          navy: "#001535",
          deep: "#000E24",
          blue: "#336765",
          sky: "#3B7E7B",
          light: "#EEF5F4",
          border: "#D8E6E4",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#EF4444",
        },
        blade: {
          surface: "#0A162B",
          surfaceLight: "#FFFFFF",
          blue: "#336765",
          gold: "#F59E0B",
          red: "#EF4444",
          green: "#22C55E",
        },
      },
      fontFamily: {
        sans: ["var(--font-mulish)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "blade-dark": "0px 2px 8px rgba(0,0,0,0.32), 0px 0px 1px rgba(0,0,0,0.24)",
        "blade-dark-hover": "0px 8px 24px rgba(0,0,0,0.48), 0px 0px 1px rgba(0,0,0,0.24)",
        "blade-light": "0px 2px 8px rgba(0,0,0,0.06), 0px 0px 1px rgba(0,0,0,0.04)",
        "blade-light-hover": "0px 8px 24px rgba(0,0,0,0.12), 0px 0px 1px rgba(0,0,0,0.06)",
        card: "0 4px 20px -2px rgba(51, 103, 101, 0.08), 0 2px 6px -1px rgba(0, 21, 53, 0.04)",
        glow: "0 0 25px -5px rgba(51, 103, 101, 0.35)",
        "blue-sm": "0 2px 8px 0 rgba(51, 103, 101, 0.25)",
        "teal-glow": "0 0 20px 0 rgba(51, 103, 101, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
