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
        brand: {
          orange: "#FF7900", // Orange Money vibe
          yellow: "#FFCC00", // MTN MoMo vibe
          green: "#00853F",  // Guinea-Bissau Flag Green
          red: "#E21836",    // Guinea-Bissau Flag Red
          dark: "#1A1A1A",
          gray: "#F4F6F8"
        }
      },
    },
  },
  plugins: [],
};
export default config;
