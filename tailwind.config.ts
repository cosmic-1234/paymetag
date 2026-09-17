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
        background: "#F8FAFC",
        surface: {
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
          400: "#CBD5E1",
          DEFAULT: "#FFFFFF",
        },
        razorpay: {
          navy: "#0C2340",
          deep: "#07162C",
          blue: "#0B72E7",
          sky: "#0284C7",
          light: "#F0F7FF",
          border: "#E2E8F0",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#EF4444",
        },
        blade: {
          surface: "#1A1F2E",
          surfaceLight: "#FFFFFF",
          blue: "#3B82F6",
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
        card: "0 4px 20px -2px rgba(11, 114, 231, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        glow: "0 0 25px -5px rgba(11, 114, 231, 0.35)",
        "blue-sm": "0 2px 8px 0 rgba(11, 114, 231, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
