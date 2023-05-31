/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        animation: "pop 250ms cubic-bezier(0.18, 0.67, 0.6, 1.22)",
      },
      keyframes: {
        wiggle: {
          "0%": {
            transform: `translate3d(0px, 0px, 0) scale(1)`,
          },
          "100%": {
            transform: `translate3d(0px, 0px, scale(1))`,
            // "box-shadow": "var(--box-shadow)",
          },
        },
      },
    },
  },
  plugins: [],
};
