module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
  	extend: {},
  	// container: (theme) => ({
  	// 	center: true,
  	// 	padding: {
  	// 		default: '3rem',
  	// 	},
  	// }),
  },
  
  variants: {
    extend: {},
  },
  
  plugins: [],
}
