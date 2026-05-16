/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        health: {
          dark: '#0f172a',
          light: '#f8fafc',
          primary: '#0ea5e9', // Light blue
          secondary: '#14b8a6', // Teal
          accent: '#3b82f6', // Bright blue
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          card: 'rgba(255, 255, 255, 0.8)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'glass-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
