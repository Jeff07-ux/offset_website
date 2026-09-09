import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        offset: {
          canvas: '#ffffff',
          'canvas-warm': '#fcfbf8',
          ink: '#090909',
          charcoal: '#323232',
          muted: '#747474',
          line: '#c8c8c8',
          'line-dark': '#8a8a8a',
          cyan: '#17b8c2',
          teal: '#008f98',
          cobalt: '#052dc8',
          coral: '#e35d43',
          amber: '#f0ad37',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        script: ['Caveat', 'cursive', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.32em',
        button: '0.22em',
        nav: '0.10em',
        'tight-display': '-0.035em',
      },
    },
  },
  plugins: [],
};

export default config;
