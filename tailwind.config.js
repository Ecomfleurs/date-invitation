/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        bg: '#0D0F1A',
        card: '#161828',
        border: '#2a2d45',
        muted: '#8b8fa8',
        inputbg: '#1e2035',
        romantic: '#FF6B6B',
        friend: '#A8E063',
        wa: '#25D366',
      },
      boxShadow: {
        romantic: '0 4px 24px rgba(255,107,107,0.35)',
        friend: '0 4px 24px rgba(168,224,99,0.35)',
        wa: '0 4px 24px rgba(37,211,102,0.4)',
      },
    },
  },
  plugins: [],
}
