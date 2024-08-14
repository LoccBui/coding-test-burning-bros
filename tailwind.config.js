/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    colors: {
      ...colors,
      primary: '#409EFF'
    },
    extend: {}
  },
  plugins: []
}
