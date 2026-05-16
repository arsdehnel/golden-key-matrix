import { prefix, render, route } from "rwsdk/router";
import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/document";
import headerMiddleware from "@/middleware/headers";
import osnRedirect from "@/middleware/osn-redirect";
import sessionMiddleware from "@/middleware/session";
import wwwRedirect from "@/middleware/www-redirect";
import Pages__Home from "@/pages/home";
import { SessionDurableObject } from "@/session/durable-object";
import Pages__Admin from "./pages/admin";
import DevRoutes from "./pages/dev/routes";
import Pages__Intro from "./pages/intro";
import Pages__Matrix from "./pages/matrix";
import osnRoutes from "./pages/osn/routes";

export default defineApp([
	wwwRedirect,
	headerMiddleware,
	osnRedirect,
	sessionMiddleware,
	...syncedStateRoutes(e => e.SYNCED_STATE_DO),
	render(Document, [
		route("/", Pages__Home),
		route("/admin", Pages__Admin),
		route("/intro", Pages__Intro),
		prefix("/osn", osnRoutes),
		route("/matrix", Pages__Matrix),
		prefix("/dev", DevRoutes),
	]),
]);

// Required top-level named exports for wrangler Durable Object bindings
export { SessionDurableObject, SyncedStateServer };
