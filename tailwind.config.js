/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {"sans": ["Montserrat", "sans-serif"]},
      colors: {
        "green-primary": "#10B981",
        "green-dark": "#059669",
        "green-light": "#34D399",
      }
    },
  },
  plugins: [],
}
