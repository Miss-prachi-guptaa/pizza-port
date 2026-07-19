/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        secondary: "#FACC15",
        background: "#0F172A",
        surface: "#1E293B",
        gray: "#94A3B8",
        success: "#22C55E",
        danger: "#EF4444",
      },
    },
  },
  plugins: [],
};
