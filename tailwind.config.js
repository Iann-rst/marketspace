module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        title: 'Karla_700Bold',
        body: 'Karla_400Regular',
      },
      colors: {
        gray: {
          100: '#F7F7F8',
          200: '#EDECEE',
          300: '#D9D8DA',
          400: '#9F9BA1',
          500: '#5F5B62',
          600: '#3E3A40',
          700: '#1A181B',
        },
        red: {
          400: '#EE7979',
        },
        blue: {
          400: '#647AC7',
          700: '#364D9D',
        },
      },
    },
  },
  plugins: [],
}
