/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        shu: {
          red: '#C0392B',
          gold: '#D4A017',
          ink: '#1A1A2E',
          paper: '#F5E6C8',
          brown: '#8B4513',
        }
      },
      fontFamily: {
        song: ['Georgia', 'STSong', 'SimSun', 'serif'],
      }
    }
  },
  plugins: []
}
