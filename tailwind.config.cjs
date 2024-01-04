// @ts-check

// 1. Import the Skeleton plugin
const { skeleton } = require('@skeletonlabs/tw-plugin');
const daisyui = require('daisyui');
const themes = require('daisyui/src/theming/themes.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		require('path').join(require.resolve(
				'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},


	},
	plugins: [
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: { preset: [ 'skeleton', 'crimson' ] }
		}),

		require('daisyui'),
		],
	daisyui:
		{
			themes: [
				{
					defaultTheme: {
						"primary": "#b55660",
						"secondary": "#dc9098",
						"accent": "#e06A77",
						"neutral": "#831843",
						"base-100": "#fbf8f9",
						"info": "#006bff",
						"success": "#00a064",
						"warning": "#ffc700",
						"error": "#be123c"
					},
				}
		]
	}
}
						