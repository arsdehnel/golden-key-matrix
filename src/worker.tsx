import { env } from "cloudflare:workers";
import { defineDurableSession } from "rwsdk/auth";
import { render, route } from "rwsdk/router";
import { SyncedStateServer, syncedStateRoutes } from "rwsdk/use-synced-state/worker";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/document";
import { setCommonHeaders } from "@/middleware/headers";
import { Home } from "@/pages/home";
import { SessionDurableObject } from "@/session";

export type AppContext = {
	session: { userId: string | null } | null;
};

export const sessionStore = defineDurableSession({
	// biome-ignore lint/style/noNonNullAssertion: binding always present in Workers runtime
	sessionDurableObject: env.SESSION_DO!,
});

export default defineApp([
	setCommonHeaders(),
	({ ctx }) => {
		ctx;
	},
	// biome-ignore lint/style/noNonNullAssertion: binding always present in Workers runtime
	...syncedStateRoutes((e) => e.SYNCED_STATE_DO!),
	render(Document, [route("/", Home)]),
]);

// Required top-level named exports for wrangler Durable Object bindings
export { SessionDurableObject, SyncedStateServer };
