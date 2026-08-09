/** @type {import('tailwindcss').Config} */

// Single monochrome ramp — every named palette maps onto it so no
// stray colour can sneak back in through a legacy utility class.
const ink = {
  50: "#f7f7f7",
  100: "#ededed",
  200: "#e4e4e6",
  300: "#c9c9cd",
  400: "#8e8e93",
  500: "#55555a",
  600: "#3d3d42",
  700: "#2a2a2e",
  800: "#17171a",
  900: "#101012",
  950: "#0a0a0a",
};

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        ink,
        accent: ink,
        electric: ink,
        dark: ink,
        "green-primary": ink[950],
        "green-dark": ink[950],
        "green-light": ink[500],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.2,0,0.2,1) forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "marquee-scroll": "marquee-scroll 38s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        card: "0 6px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 24px 60px rgba(0, 0, 0, 0.12)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.2, 0, 0.2, 1)",
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
