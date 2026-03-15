import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#ff6f91",
        cream: "#fff7f5",
        rose: "#ffcad8",
        ink: "#261520",
        berry: "#b03052",
      },
      boxShadow: {
        card: "0 22px 50px rgba(176, 48, 82, 0.16)",
        glow: "0 0 0 1px rgba(255, 255, 255, 0.5), 0 16px 36px rgba(255, 111, 145, 0.22)",
      },
      fontFamily: {
        display: ["ui-rounded", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-soft":
          "radial-gradient(circle at top, rgba(255, 255, 255, 0.95), rgba(255, 247, 245, 0.8) 40%, rgba(255, 202, 216, 0.6) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
