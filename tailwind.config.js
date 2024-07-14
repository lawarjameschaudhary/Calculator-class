/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custonColor : '#F7F8FB',
        texts: '#858585',
        aalu: '#E5E5E5',
        paratha: '#60BEFF',
        char: '#109DFF',
        bag: '#38B9FF',
      },
      height :{
        thulo : '85%',
      },
    },
  },
  plugins: [],
}