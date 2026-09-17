/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          900: '#070b14',
          800: '#0d1527',
          700: '#14203d',
          600: '#1c2d54',
          500: '#263e73',
          accent: '#00f0ff',
          alert: '#ff3366',
          warning: '#ffb703',
          success: '#00f59b'
        }
      }
    },
  },
  plugins: [],
}
