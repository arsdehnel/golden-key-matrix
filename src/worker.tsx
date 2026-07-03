import { except, prefix, render, route } from "rwsdk/router";
import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { defineApp, type RequestInfo } from "rwsdk/worker";

import { Document } from "@/document";
import headerMiddleware from "@/middleware/headers";
import sessionMiddleware from "@/middleware/session";
import wwwRedirect from "@/middleware/www-redirect";
import { SessionDurableObject } from "@/session/durable-object";
import DevRoutes from "./pages/dev/routes";
import Pages__ThankYou from "./pages/thank-you";
import { handlePageError } from "./worker-error";

export default defineApp([
	wwwRedirect,
	headerMiddleware,
	sessionMiddleware,
	...syncedStateRoutes(e => e.SYNCED_STATE_DO),
	render(Document, [
		except<RequestInfo>(handlePageError),
		route("/", Pages__ThankYou),
		prefix("/dev", DevRoutes),
		route("*", Pages__ThankYou),
	]),
]);

// Required top-level named exports for wrangler Durable Object bindings
export { SessionDurableObject, SyncedStateServer };
