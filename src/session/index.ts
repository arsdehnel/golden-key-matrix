import { DurableObject } from "cloudflare:workers";
import type { DurableObjectMethods } from "rwsdk/auth";

export interface Session {
	userId: string | null;
	createdAt: number;
}

export type SessionInput = Pick<Session, "userId">;

export class SessionDurableObject
	extends DurableObject
	implements DurableObjectMethods<Session, SessionInput>
{
	async saveSession(data: SessionInput): Promise<Session> {
		const session: Session = {
			userId: data.userId ?? null,
			createdAt: Date.now(),
		};
		await this.ctx.storage.put<Session>("session", session);
		return session;
	}

	async getSession(): Promise<{ value: Session } | { error: string }> {
		const session = await this.ctx.storage.get<Session>("session");
		if (!session) {
			return { error: "Session not found" };
		}
		return { value: session };
	}

	async revokeSession(): Promise<void> {
		await this.ctx.storage.delete("session");
	}
}
