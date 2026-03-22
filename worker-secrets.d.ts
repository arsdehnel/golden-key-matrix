// Secrets are not included in the auto-generated worker-configuration.d.ts.
// Add types for secrets here so they appear on the Env interface without
// being wiped out by `pnpm generate` (`wrangler types`).
//
// Set values via: wrangler secret put <SECRET> --env <environment>
declare namespace Cloudflare {
	interface Env {
		SESSION_SECRET_KEY?: string;
	}
}
