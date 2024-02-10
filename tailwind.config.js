/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#fff1f1",
					100: "#ffe0e0",
					200: "#ffc7c7",
					300: "#ffa0a0",
					400: "#ff6969",
					500: "#fa3939",
					600: "#de1717",
					700: "#c31212",
					800: "#a11313",
					900: "#851717",
					950: "#490606",
				},
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
