import { env } from "cloudflare:workers";
import type { RouteMiddleware } from "rwsdk/router";
import type { OsnRedirectMode } from "@/types";

const REDIRECT_TARGET = "/osn/welcome";
const OSN_REDIRECT_KEY = "osn_redirect_mode";

// Exported for unit testing — no framework dependencies
// export function shouldOsnRedirect(redirectMode: string | null, pathname: string): boolean {
// 	return redirectMode === "OSN" && !pathname.startsWith("/osn");
// }

async function getOsnRedirectMode(): Promise<OsnRedirectMode> {
	const redirectMode = await env.FEATURE_FLAGS?.get(OSN_REDIRECT_KEY);
	if (redirectMode === "PRE_OSN" || redirectMode === "OSN" || redirectMode === "POST_OSN") {
		return redirectMode;
	}
	console.warn(`Invalid OSN redirect mode in KV: ${redirectMode}, defaulting to PRE_OSN`);
	return "PRE_OSN";
}

const osnRedirect: RouteMiddleware = async ({ request, ctx }) => {
	// Never redirect WebSocket upgrade requests — SyncedState connects on a non-/osn path
	// and returning a 302 to an upgrade request kills the connection
	if (request.headers.get("upgrade")?.toLowerCase() === "websocket") return;
	const redirectMode: OsnRedirectMode = await getOsnRedirectMode();
	const { pathname } = new URL(request.url);

	ctx.redirectMode = redirectMode;

	if (pathname === "/admin") {
		// Don't redirect the admin page, even if we're in OSN mode, so that admins can change the redirect mode without needing to access KV directly
		return;
	}

	if (pathname.startsWith("/dev")) {
		// Don't redirect dev pages, to make development easier
		return;
	}

	// Pre-OSN we just want the homepage
	if (redirectMode === "PRE_OSN") {
		if (pathname !== "/intro") {
			const redirectUrl = new URL("/intro", request.url);
			return Response.redirect(redirectUrl.toString(), 302);
		}
	}

	// During OSN we want all traffic to hit the OSN welcome page except for paths under /osn, which are needed for the OSN app to function. This ensures that users see the welcome page regardless of how they access the site, but can still use the OSN app if they go to an /osn URL directly.
	if (redirectMode === "OSN") {
		if (!pathname.startsWith("/osn")) {
			const redirectUrl = new URL(REDIRECT_TARGET, request.url);
			// request.url is normalized to port 80 in wrangler dev; the Host header preserves the real port
			const host = request.headers.get("host");
			if (host) redirectUrl.host = host;
			return Response.redirect(redirectUrl.toString(), 302);
		}
	}

	if (redirectMode === "POST_OSN" && pathname !== "/thank-you") {
		const redirectUrl = new URL("/thank-you", request.url);
		return Response.redirect(redirectUrl.toString(), 302);
	}
};

export default osnRedirect;
