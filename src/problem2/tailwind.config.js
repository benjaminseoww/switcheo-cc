/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'button-light-blue': '#CDE9FF',
        'switcheo-blue': '#1A3B4D',
        'hover-button-blue': '#BBD9F3'
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}

