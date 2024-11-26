/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: 'auto',       // Each column adjusts to content
      },
      gridTemplateRows: {
        auto: 'auto',       // Each column adjusts to content
      },
    },
  },
  plugins: [],
}

