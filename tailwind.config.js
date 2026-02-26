/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aurora-purple': '#6B21A8', 
        'aurora-blue': '#2563EB', 
        'aurora-gold': '#F59E0B',
      }
    },
  },
   plugins: [],
}

