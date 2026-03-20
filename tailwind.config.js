/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#190e27',
        surface: {
            DEFAULT: '#190e27',
            low: '#211630',
            high: '#30253f',
            highest: '#3b304a',
        },
        primary: {
            DEFAULT: '#d8b9ff',
            container: '#ae72ff',
        },
        secondary: {
            DEFAULT: '#d3fbff',
            container: '#00eefc',
        },
        tertiary: '#ffb2ba',
        outline: {
            DEFAULT: '#978da0',
            variant: '#4c4355',
        },
        txt: {
            DEFAULT: '#eedcff',
            muted: '#cec2d7',
        }
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
