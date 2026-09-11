/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#D4AF37",
          green: "#0F5132",
          dark: "#121826",
          light: "#F8FAFC",
          accent: "#B8860B"
        }
      }
    },
  },
  plugins: [],
}
