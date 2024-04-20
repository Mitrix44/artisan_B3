const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            50: '#fbf4fa',
            100: '#f9eaf7',
            200: '#f5d5ef',
            300: '#edb4e1',
            400: '#e185cb',
            500: '#d460b5',
            600: '#c44a9e',
            700: '#a6307e',
            800: '#8a2a68',
            900: '#742759',
            950: '#451232',
            foreground: '#ffffff',
            DEFAULT: '#d460b5'
          }
        }
      },
      dark: {
        colors: {
          primary: {
            50: '#eefff0',
            100: '#d6ffde',
            200: '#b1ffc0',
            300: '#74ff90',
            400: '#18f744',
            500: '#06e131',
            600: '#00bc24',
            700: '#029320',
            800: '#08731f',
            900: '#095e1d',
            950: '#00350c',
            foreground: '#ffffff',
            DEFAULT: '#06e131'
          }
        }
      }
    }
  })]
}
