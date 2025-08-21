/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'keyin-navy-blue': '#1f2a44',
      'keyin-dark-blue': '#1e2943',
      'keyin-blue': '#1d4ed8',
      'keyin-bright-blue': '#385e9d',
      'keyin-gray': '#98a2b3',
      'keyin-light-gray': '#e5e7eb',
      'keyin-select-grey': '#f9f9f9',
      'keyin-green': '#00b388',
      'keyin-red': '#992e3c',
      'keyin-white': '#ffffff',
      'keyin-black': '#231f20',
      'keyin-button': '#019b77',
      'keyin-yellow': '#FFD700',
      'keyin-gray-hover': '#999a9d',
      'keyin-green-hover': '#019b77',
      'keyin-hnl-green': '#9da93c',
      'keyin-hnl-blue': '#00869A'
    },
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        barlowSemi: ['Barlow Semi Condensed', 'sans-serif']
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#00b388',
          secondary: '#98a2b3'
        },
        dark: {
          primary: '#00b388',
          secondary: '#98a2b3'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
}