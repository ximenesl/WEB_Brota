/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arimo', 'sans-serif'],
      },
      colors: {
        'primary': '#00A63E',
        'brota-black': '#030213',
        'dark-text': '#0A0A0A',
        'secondary-text': '#4A5565',
        'tertiary-text': '#6A7282',
        'light-text': '#717182',
        'input-background': '#F3F3F5',
        'border-color': 'rgba(0, 0, 0, 0.1)',
        'border-light': '#E5E7EB',
        'tab-background': '#ECECF0',
        'status-disponivel': '#00A63E',
        'status-esgotado': '#D90000',
        'status-estoque-baixo': '#F0B100',
      }
    },
  },
  plugins: [],
}
