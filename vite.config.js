import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Define chunks here
					'vendor': ['svelte']
				}
			}
		},
		chunkSizeWarningLimit: 1000 // Adjust this value as needed
	}
});
