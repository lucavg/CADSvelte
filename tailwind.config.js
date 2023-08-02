/** @type {import('tailwindcss').Config} */
export default {
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#8cadff',
					secondary: '#000066',
					accent: '#757f9c',
					neutral: '#fff',
					'base-100': '#1d232a',
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272'
				}
			}
		]
	},
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')]
};
