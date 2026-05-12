"use server";
import { env } from "cloudflare:workers";
import { getRequestInfo } from "rwsdk/worker";

const PRESENTER_CODE = "osn-2026-badass";

export async function hostCodeValidation(
	code: string,
	sessionId: string,
): Promise<{ success: boolean; message: string; sessionId?: string }> {
	if (code !== PRESENTER_CODE) {
		return { success: false, message: "Invalid code" };
	}
	const { ctx } = getRequestInfo();
	if (!ctx.session) {
		return { success: false, message: "No session established" };
	}
	await env.FEATURE_FLAGS.put("osn_host_session_id", sessionId);
	return { success: true, message: "Poll started", sessionId: ctx.session?.sessionId };
}
