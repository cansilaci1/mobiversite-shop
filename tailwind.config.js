/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#F27A1A", dark: "#C76315" },
        ink: "#111827",
        muted: "#6B7280",
      },
      boxShadow: { card: "0 6px 18px rgba(17,24,39,0.08)" },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
