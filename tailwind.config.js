const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        DEFAULT: '4px',
        'large': '15px',
      },
      colors: {
        'my-purple': '#9D7CFF',
        'my-purple-light': '#B59CFF',
        'my-purple-dark': '#8063D3',
        'my-light-grey': '#E1E1E1',
        'my-pink': '#ECA8F7',
        'my-pink-dark': '#DE9AE8',
        'my-pink-light': '#F5BAFF'
      }
    },
  },
  plugins: [],
})
