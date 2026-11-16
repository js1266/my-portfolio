/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#FBC548", dark: "#E9AE22", soft: "#FBEBC8", ink: "#7A5200" },
        ink: "#161616",
        muted: "#555B63",
        surface: "#F4F4F4",
      },
      fontFamily: {
        display: ["Rajdhani", "system-ui", "sans-serif"],
        body: ["Rubik", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp .8s ease-out both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
