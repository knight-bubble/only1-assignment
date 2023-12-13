import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    ".backface-visible": {
      "backface-visibility": "visible",
    },
    ".backface-hidden": {
      "backface-visibility": "hidden",
    },
  });
});

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("daisyui"), require("tailwind-scrollbar")({ nocompatible: true }), backfaceVisibility],
  daisyui: {
    themes: false,
    styled: true,
    utils: true,
  },
};
export default config;
