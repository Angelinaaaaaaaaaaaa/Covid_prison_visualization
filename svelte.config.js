import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
		}),
		prerender: {
			// Pre-render all routes by default
			entries: ['*']
		}
	},
	preprocess: preprocess()
};

export default config;
