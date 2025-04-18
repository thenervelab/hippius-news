module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/**/*.js",
    './**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#3366FF',
        'primary-40': '#1f51be',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('scroll-active', '&.scroll-active');
    },
  ],
};
