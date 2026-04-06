import StandardLayout from "@/layouts/standard";
import type { RequestInfo } from "rwsdk/worker";
import OsnWelcomeClient from "@/components/osn-welcome-client";

export default function Pages__OSN__Welcome({ request, ctx }: RequestInfo) {
	const pollUrll = new URL("/osn/welcome", request.url).href;
	return (
		<StandardLayout pageTitle="Thank You">
			<OsnWelcomeClient pollUrl={pollUrll} sessionId={ctx.session?.sessionId} />
		</StandardLayout>
	);
}
