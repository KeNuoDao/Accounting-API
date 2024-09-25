/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A202C', // dark theme for background
        secondary: '#4A5568', // lighter gray for UI elements
        accent: '#3182CE', // blue accent for buttons
        positive: '#48BB78', // green for positive transactions
        negative: '#F56565', // red for negative transactions
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        128: '32rem', // Custom spacing
      },
    },
  },
  plugins: [],
};
