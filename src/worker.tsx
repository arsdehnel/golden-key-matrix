import { except, render, route } from "rwsdk/router";
import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { defineApp, type RequestInfo } from "rwsdk/worker";

import { Document } from "@/document";
import headerMiddleware from "@/middleware/headers";
import sessionMiddleware from "@/middleware/session";
import wwwRedirect from "@/middleware/www-redirect";
import { SessionDurableObject } from "@/session/durable-object";
import Pages__Home from "./pages/home";
import Pages__Keys from "./pages/keys";
import Pages__IntegratedWorkflow from "./pages/keys/integrated-workflow";
import Pages__OpenMindset from "./pages/keys/open-mindset";
import Pages__RichEcosystem from "./pages/keys/rich-ecosystem";
import Pages__Matrix from "./pages/matrix";
import Pages__OSN2026 from "./pages/osn-2026";
import Pages__Outcomes from "./pages/outcomes";
import { handlePageError } from "./worker-error";

export default defineApp([
	wwwRedirect,
	headerMiddleware,
	sessionMiddleware,
	...syncedStateRoutes(e => e.SYNCED_STATE_DO),
	render(Document, [
		except<RequestInfo>(handlePageError),
		route("/", Pages__Home),
		route("/keys", Pages__Keys),
		route("/osn-2026", Pages__OSN2026),
		route("/keys/rich-ecosystem", Pages__RichEcosystem),
		route("/keys/integrated-workflow", Pages__IntegratedWorkflow),
		route("/keys/open-mindset", Pages__OpenMindset),
		route("/matrix", Pages__Matrix),
		route("/outcomes", Pages__Outcomes),
		route("*", Pages__OSN2026),
	]),
]);

// Required top-level named exports for wrangler Durable Object bindings
export { SessionDurableObject, SyncedStateServer };
