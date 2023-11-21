/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'Roboto': ['Roboto', 'sans-serif']
  },
    extend: {
      boxShadow: {
        'custom': '5px 5px 0px 1px black', // Customize your box shadow here
      },
    },
  },
  plugins: [],
}

