import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "./src/assets"),
			components: path.resolve(__dirname, "./src/components"),
			pages: path.resolve(__dirname, "./src/pages"),
			hooks: path.resolve(__dirname, "./src/hooks"),
			services: path.resolve(__dirname, "./src/services"),
			routes: path.resolve(__dirname, "./src/routes"),
			store: path.resolve(__dirname, "./src/store"),
			container: path.resolve(__dirname, "./src/container"),
			utils: `${path.resolve(__dirname, "./src/utils")}`,
		},
	},
});
