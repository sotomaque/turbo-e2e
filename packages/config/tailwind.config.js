module.exports = {
  content: [
    '../../packages/ui/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif', 'Playfair Display', 'Georgia'],
      },
      colors: {
        ebbeige: {
          50: '#F9F7F3',
          100: '#F4F0E8',
          200: '#E3D8C5',
        },
        ebgold: {
          50: '#F7F5EF',
          500: '#A08252',
        },
        ebgreen: {
          50: '#F4F9F7',
          100: '#DAEDE4',
          400: '#60A186',
          500: '#47856E',
          600: '#3A715D',
          700: '#2F5648',
        },
        ebsuccess: {
          50: '#EFFFF9',
        },
        ebgray: {
          50: '#F7F7F7',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#818181',
          500: '#666666',
          800: '#383838',
          900: '#313131',
        },
        eberror: {
          50: '#FEF2F2',
          800: '#991B1B',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss'),
  ],
};
