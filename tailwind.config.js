/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "1cs": "0 5px 30px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
