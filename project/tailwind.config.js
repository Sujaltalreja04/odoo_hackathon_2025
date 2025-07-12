/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a5b4fc',
          DEFAULT: '#6366f1',
          dark: '#312e81',
        },
        accent: {
          light: '#f472b6',
          DEFAULT: '#ec4899',
          dark: '#9d174d',
        },
        glass: 'rgba(255,255,255,0.08)',
        glassDark: 'rgba(30,41,59,0.7)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        glow: '0 0 16px 2px #6366f1',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-in': 'fadein 1s ease-in',
      },
    },
  },
  plugins: [],
};
