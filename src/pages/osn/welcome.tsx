import type { RequestInfo } from "rwsdk/worker";
import OsnWelcomeClient from "@/components/osn-welcome-client";
import StandardLayout from "@/layouts/standard";

export default function Pages__OSN__Welcome({ request, ctx }: RequestInfo) {
	const pollUrl = new URL("/osn/welcome", request.url).href;
	return (
		<StandardLayout pageTitle="Welcome" siteSection="osn">
			<OsnWelcomeClient pollUrl={pollUrl} sessionId={ctx.session.sessionId} />
		</StandardLayout>
	);
}
