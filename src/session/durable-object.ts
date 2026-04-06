import { DurableObject } from 'cloudflare:workers';
import { MAX_SESSION_DURATION } from 'rwsdk/auth';

type SessionError = 'Invalid session' | 'Session expired';

export interface Session {
	sessionId?: string;
	userId?: string | null;
	createdAt: number;
	lastAccessedAt: number;
}

export class SessionDurableObject extends DurableObject {
	private session: Session | undefined = undefined;

	constructor(state: DurableObjectState, env: Cloudflare.Env) {
		super(state, env);
		this.session = undefined;
	}

	// Extracted for testability
	protected now(): number {
		return Date.now();
	}

	async saveSession({ userId = null }: { userId?: string | null }): Promise<Session> {
		const now = this.now();
		const session: Session = {
			userId,
			createdAt: now,
			lastAccessedAt: now,
		};

		await this.ctx.storage.put<Session>('session', session);
		this.session = session;
		return session;
	}

	async getSession(): Promise<{ value: Session } | { error: SessionError }> {
		if (this.session) {
			// Sliding-window expiration: update lastAccessedAt on each access
			this.session.lastAccessedAt = this.now();
			await this.ctx.storage.put<Session>('session', this.session);
			return { value: this.session };
		}

		const session = await this.ctx.storage.get<Session>('session');

		if (!session) {
			return { error: 'Invalid session' };
		}

		if (session.lastAccessedAt + MAX_SESSION_DURATION < this.now()) {
			await this.revokeSession();
			return { error: 'Session expired' };
		}

		// Update lastAccessedAt on read
		session.lastAccessedAt = this.now();
		await this.ctx.storage.put<Session>('session', session);
		this.session = session;
		return { value: session };
	}

	async revokeSession(): Promise<void> {
		await this.ctx.storage.delete('session');
		this.session = undefined;
	}
}
