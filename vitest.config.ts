import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: [
			// cloudflare:workers is not resolvable outside of the CF runtime.
			// Tests that import from files using it must also vi.mock() it to
			// provide actual values; this stub just prevents the resolver error.
			{ find: "cloudflare:workers", replacement: path.resolve(__dirname, "src/__mocks__/cloudflare-workers.ts") },
		],
	},
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
		environment: "jsdom",
		passWithNoTests: true,
	},
});
