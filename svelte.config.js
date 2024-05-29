import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// Paths configuration (public directory is handled automatically)
		paths: {
			base: '',
			assets: ''
		}
	}
};

export default config;