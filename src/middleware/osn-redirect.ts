import { env } from "cloudflare:workers";
import type { RouteMiddleware } from "rwsdk/router";

const REDIRECT_TARGET = "/osn/welcome";
const OSN_REDIRECT_KEY = "osn_redirect_active";

// Exported for unit testing — no framework dependencies
export function shouldOsnRedirect(flagValue: string | null, pathname: string): boolean {
	return flagValue === "true" && !pathname.startsWith("/osn");
}

const osnRedirect: RouteMiddleware = async ({ request }) => {
	const flagValue = (await env.FEATURE_FLAGS?.get(OSN_REDIRECT_KEY)) ?? null;
	const { pathname } = new URL(request.url);
	if (shouldOsnRedirect(flagValue, pathname)) {
		const redirectUrl = new URL(REDIRECT_TARGET, request.url);
		// request.url is normalized to port 80 in wrangler dev; the Host header preserves the real port
		const host = request.headers.get("host");
		if (host) redirectUrl.host = host;
		return Response.redirect(redirectUrl.toString(), 302);
	}
};

export default osnRedirect;
