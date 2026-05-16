/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0f',
          light: '#1a1a24',
          accent: '#00f0ff',
          primary: '#7000ff',
          secondary: '#ff003c',
          success: '#00ff66',
          warning: '#ffcc00',
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(to right, #0a0a0f, #1a1a24)',
        'glow-gradient': 'radial-gradient(circle, rgba(112,0,255,0.2) 0%, rgba(10,10,15,0) 70%)',
      }
    },
  },
  plugins: [],
}
