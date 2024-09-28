/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#000000",
        secondary:"#0E2014",
        tertiary:"#51BD6D",
        quaternary:"#597F15"
      }
    },
  },
  plugins: [],
}