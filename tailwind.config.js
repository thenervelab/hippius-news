module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/**/*.js",
    './**/*.html',
    './**/**/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#3366FF',
        'primary-40': '#1f51be',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui'], // Geist as primary
        digi: ['DigitalNumbers', 'monospace'], // your custom digital font
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('scroll-active', '&.scroll-active');
    },
  ],
};
