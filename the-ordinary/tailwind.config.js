/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mjs,ejs,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        "sf-pro": ["SF-Pro"],
        arial: ["Arial"]
      },
      colors: {
        accent: '#000000',
        background: '#f6f6f6',
        basic: '#ffffff',
      },
    },
  },
  plugins: [require("autoprefixer")],
};
