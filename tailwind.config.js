/** @type {import('tailwindcss').Config} */
export default {
  // These paths are just examples, customize them to match your project structure
  content: [
    "./src/**/**/*.{html,js,jsx,ts,tsx,css,scss}",
    "./src/components/**/*.{html,js,jsx,ts,tsx,css,scss}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        Incons: ["Inconsolata", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Lora: ["Lora", "sans-serif"],
      },
      colors: {
        "Black-1": "#050505",
        "Black-2": "#1f1f1f",
        "Black-3": "#2d2d2d",
        "Black-4": "#3a3a3a",
        "Gray-1": "#757575",
        "Gray-2": "#e9e9e9",
        "Gray-3": "#f4f4f4",
        "Gray-4": "#b0b0b0",
        "Purple-1": "#a445ed",
        "Purple-2": "#8f19e8",
        "Orange-1": "#ff5252",
        "Brown-1": "#A1824A",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1440px",
      },
    },
  },

  plugins: [],
};
