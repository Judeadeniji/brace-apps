/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,mjs,ejs,ts,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('autoprefixer')
    ],
}