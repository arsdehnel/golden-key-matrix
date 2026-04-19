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
		return Response.redirect(new URL(REDIRECT_TARGET, request.url).toString(), 302);
	}
};

export default osnRedirect;
