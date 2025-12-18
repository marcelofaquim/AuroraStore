/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          purple: "#6E44FF",
          blue: "#3A86FF",
          cyan: "#00D1FF",
          gold: "#F6C144"
        }
      },
      backgroundImage: {
        "aurora-gradient": "linear-gradient(90deg, #6E44FF 0%, #3A86FF 50%, #00D1FF 100%)"
      }
    }
  },
    
  plugins: [],
}

