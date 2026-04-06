import { env } from 'cloudflare:workers';
import { defineDurableSession } from 'rwsdk/auth';

export const sessions = defineDurableSession({
	// biome-ignore lint/style/noNonNullAssertion: binding always present in Workers runtime
	sessionDurableObject: env.SESSION_DO!,
	secretKey: env.SESSION_SECRET_KEY,
});
