import type { RequestInfo } from "rwsdk/worker";

import { QrPollClient } from "@/components/dev/QrPollClient";
import { sessions } from "@/session/store";
import type { AppContext } from "@/worker";

export const QrPoll = async ({
	request,
	response,
}: RequestInfo<Record<string, never>, AppContext>) => {
	const session = await sessions.load(request);

	if (!session) {
		await sessions.save(response.headers, { userId: null });
	}

	const sessionId = getSessionId(request, response.headers);
	const pollUrl = `${new URL(request.url).origin}/dev/qr-poll`;

	return <QrPollClient sessionId={sessionId} pollUrl={pollUrl} />;
};

function getSessionId(request: Request, responseHeaders: Headers): string | null {
	// Existing session: read from request cookie
	const cookieHeader = request.headers.get("Cookie") ?? "";
	for (const cookie of cookieHeader.split(";")) {
		const trimmed = cookie.trim();
		if (trimmed.startsWith("session_id=")) {
			return trimmed.slice("session_id=".length);
		}
	}

	// New session: read from the Set-Cookie header we just wrote
	const setCookie = responseHeaders.get("Set-Cookie") ?? "";
	const match = setCookie.match(/(?:^|,\s*)session_id=([^;,]+)/);
	return match?.[1] ?? null;
}
