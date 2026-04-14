import type { Session } from "@/session/durable-object";

interface AppContext {
	session: Session;
}

declare module "rwsdk/worker" {
	interface DefaultAppContext extends AppContext {}
}
