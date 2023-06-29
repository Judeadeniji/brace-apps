/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mjs,ejs,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        black: {
          0: "#000000",
          100: "#0d0d0d",
          200: "#1a1a1a",
          300: "#262626",
          400: "#333333",
          500: "#404040",
          600: "#4d4d4d",
          700: "#595959",
          800: "#666666",
          900: "#737373",
          950: "#8c8c8c",
          975: "#b3b3b3",
          990: "#d9d9d9",
          1000: "#f2f2f2",
        },
      },
    },
  },
  plugins: [require("autoprefixer")],
};
