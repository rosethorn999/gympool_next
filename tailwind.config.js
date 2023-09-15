/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				pattensBlue: 'var(--pattensBlue)',
				summerSky: 'var(--summerSky)',
				codGrey: 'var(--codGrey)',
				blueCharcoal: 'var(--blueCharcoal)',

				grassGreen: 'var(--grassGreen)',
				mayaBlue: 'var(--mayaBlue)',
				dodgerBlue: 'var(--dodgerBlue)',
				dodgerBlueWith25Opacity: 'var(--dodgerBlueWith25Opacity)',
				electricBlue: 'var(--electricBlue)',
				white: 'var(--white)',
				whiteSmoke: 'var(--whiteSmoke)',
				whisper: 'var(--whisper)',
				charcoal: 'var(--charcoal)',
				nightRider: 'var(--nightRider)',
				black: 'var(--black)',
				persianRed: 'var(--persianRed)',
				bloodred: 'var(--bloodred)',
				gympoolBlue: 'var(--gympoolBlue)',
				bloodredWith25Opacity: 'var(--bloodredWith25Opacity)',
				pink: 'var(--pink)',
				sunflower: 'var(--sunflower)',
				chestnut: 'var(--chestnut)',
				dodgerBlue: 'var(--dodgerBlue)',
				pattensBlue: 'var(--pattensBlue)',
				navyBlue: 'var(--navyBlue)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
