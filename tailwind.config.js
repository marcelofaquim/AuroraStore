/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", 
    "./src//components/**/*.{js,ts,jsx,tsx}", 
    "./src/app/**/*.{js,ts,jsx,tsx}",
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

