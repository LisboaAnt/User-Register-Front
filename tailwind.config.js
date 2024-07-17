/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'pcolor': {
        200: '#363467',
        500: '#2b2952',
      },
    },
    },
  },
  plugins: [],
}

