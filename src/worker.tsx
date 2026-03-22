import { prefix, render, route } from "rwsdk/router";
import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/document";
import headerMiddleware from "@/middleware/headers";
import { QrPoll } from "@/pages/dev/qr-poll";
import { Home } from "@/pages/home";
import { SessionDurableObject } from "@/session/durable-object";

export type AppContext = {
	session: { userId: string | null } | null;
};

export default defineApp([
	headerMiddleware,
	({ ctx }) => {
		ctx;
	},
	// biome-ignore lint/style/noNonNullAssertion: binding always present in Workers runtime
	...syncedStateRoutes((e) => e.SYNCED_STATE_DO!),
	render(Document, [route("/", Home), ...prefix("/dev", [route("/qr-poll", QrPoll)])]),
]);

// Required top-level named exports for wrangler Durable Object bindings
export { SessionDurableObject, SyncedStateServer };
