module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#fff8f6',
        surface: '#fff8f6',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#fff1ed',
        'surface-container-high': '#ffe2da',
        'surface-container-highest': '#ffdbd1',
        'primary': '#406900',
        'primary-container': '#85cd1e',
        'primary-fixed': '#acf84b',
        'secondary': '#b5260a',
        'secondary-container': '#fc5939',
        'tertiary': '#006590',
        'tertiary-container': '#63c3ff',
        'outline-variant': '#c1cab1',
        'on-surface': '#2b1610',
        'on-surface-variant': '#424936',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#580900'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(43,22,16,0.08)'
      },
      borderRadius: {
        xl: '2rem'
      }
    }
  },
  plugins: []
};
