import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1327",
          800: "#161C36",
          700: "#1E2545",
        },
        paper: "#EDEFF3",
        settle: {
          DEFAULT: "#34D2A0",
          dim: "#1F8A6C",
        },
        pending: "#F2A93B",
        alert: "#E8604C",
        line: "#2A3155",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        perf: "radial-gradient(circle, #0E1327 1.5px, transparent 1.5px)",
      },
      backgroundSize: {
        perf: "10px 10px",
      },
    },
  },
  plugins: [],
};
export default config;
