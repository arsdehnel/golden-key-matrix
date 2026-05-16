import type { Session } from "@/session/durable-object";
import type { OsnRedirectMode } from "@/types";

interface AppContext {
	session: Session;
	redirectMode: OsnRedirectMode;
}

declare module "rwsdk/worker" {
	interface DefaultAppContext extends AppContext {}
}
