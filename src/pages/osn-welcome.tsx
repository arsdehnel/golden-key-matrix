import type { RequestInfo } from "rwsdk/worker";
import OsnWelcomeClient from "@/components/osn-welcome-client";

export default function PageOsnWelcome({ request, ctx }: RequestInfo) {
	return <OsnWelcomeClient requestUrl={request.url} sessionId={ctx.session?.sessionId} />;
}
