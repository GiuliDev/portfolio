import {defineConfig} from "vite"

export default defineConfig({
	build: {
	  rollupOptions: {
		output: {
		  entryFileNames: 'index.js', // Stellt sicher, dass der Name gleich bleibt
		}
	  }
	}
  });