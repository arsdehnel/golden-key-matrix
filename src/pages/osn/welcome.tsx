import { env } from "cloudflare:workers";
import type { RequestInfo } from "rwsdk/worker";
import OsnWelcomeClient from "@/components/osn-welcome-client";
import StandardLayout from "@/layouts/standard";

export default async function Pages__OSN__Welcome({ request, ctx }: RequestInfo) {
	const pollUrl = new URL("/osn/welcome", request.url).href;
	const initialHostSessionId = await env.FEATURE_FLAGS.get("osn_host_session_id");
	return (
		<StandardLayout siteSection="osn" redirectMode={ctx.redirectMode}>
			<OsnWelcomeClient pollUrl={pollUrl} sessionId={ctx.session.sessionId} initialHostSessionId={initialHostSessionId} />
		</StandardLayout>
	);
}
