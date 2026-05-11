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
        institutional: {
          blue: "#0A2240",
          gold: "#D4AF37",
          light: "#F3F4F6",
          dark: "#111827"
        }
      }
    },
  },
  plugins: [],
};
export default config;