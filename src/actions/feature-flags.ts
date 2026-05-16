"use server";
import { env } from "cloudflare:workers";
import type { OsnRedirectMode } from "@/types";

const ADMIN_CODE = "osn-2026-admin";
const OSN_REDIRECT_KEY = "osn_redirect_mode";

export async function setRedirectModeAction(
	code: string,
	mode: OsnRedirectMode,
): Promise<{ success: boolean; message: string; mode?: OsnRedirectMode }> {
	if (!env.FEATURE_FLAGS) {
		return { success: false, message: "Feature flags not configured" };
	}

	if (code !== ADMIN_CODE) {
		return { success: false, message: "Invalid admin code" };
	}

	const currentMode = await env.FEATURE_FLAGS.get(OSN_REDIRECT_KEY);
	if (mode === currentMode) {
		return { success: false, message: `Redirect already in ${mode} mode` };
	}

	await env.FEATURE_FLAGS.put(OSN_REDIRECT_KEY, mode, {
		expirationTtl: 60 * 60 * 3, // 3 hours
	});

	return { success: true, message: `Redirect set to ${mode} mode`, mode };
}

export async function clearHostSession(code: string): Promise<{ success: boolean; message: string }> {
	if (!env.FEATURE_FLAGS) {
		return { success: false, message: "Feature flags not configured" };
	}

	if (code !== ADMIN_CODE) {
		return { success: false, message: "Invalid admin code" };
	}

	await env.FEATURE_FLAGS.delete("osn_host_session_id");

	return { success: true, message: "Host session cleared" };
}
