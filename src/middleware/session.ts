import { env } from "cloudflare:workers";
import type { DefaultAppContext, RequestInfo } from "rwsdk/worker";

const COOKIE_NAME = "GOLDEN_KEYS_MATRIX_SESSION";

function getSssionIdFromCookie(cookies: string): string | undefined {
	const cookieArray = cookies.split(";").map(cookie => cookie.trim());
	for (const cookie of cookieArray) {
		if (cookie.startsWith(`${COOKIE_NAME}=`)) {
			return cookie.substring(`${COOKIE_NAME}=`.length);
		}
	}
	return undefined;
}

export default async function sessionMiddleware(requestInfo: RequestInfo<DefaultAppContext>) {
	const { ctx, request, response } = requestInfo;

	const useSecureCookie = env.GOLDEN_KEYS_MATRIX_ENV !== "development";
	const existingSessionId = getSssionIdFromCookie(request.headers.get("Cookie") || "");
	if (existingSessionId) {
		ctx.session = {
			sessionId: existingSessionId,
			createdAt: Date.now(),
			lastAccessedAt: Date.now(),
		};
	}
	if (!existingSessionId) {
		const newSessionId = crypto.randomUUID();
		response.headers.set("Set-Cookie", `${COOKIE_NAME}=${newSessionId}; Path=/; ${useSecureCookie ? "Secure; " : ""}`);
		ctx.session = {
			sessionId: newSessionId,
			createdAt: Date.now(),
			lastAccessedAt: Date.now(),
		};
	}
}
