module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#181622',
        secondary: '#13111c',
      },
    },
  },
  plugins: [],
}
