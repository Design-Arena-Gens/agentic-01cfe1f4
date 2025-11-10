import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef8f4',
          100: '#fce9dc',
          200: '#f6d1b1',
          300: '#f2b178',
          400: '#ec8d42',
          500: '#e9781d',
          600: '#d16017',
          700: '#aa4714',
          800: '#803613',
          900: '#642d11'
        }
      },
      boxShadow: {
        card: '0 20px 40px -22px rgba(233, 120, 29, 0.35)',
      }
    }
  },
  plugins: []
};

export default config;
