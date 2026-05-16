"use server";
import { env } from "cloudflare:workers";

const ADMIN_CODE = "osn-2026-admin";
const OSN_REDIRECT_KEY = "osn_redirect_mode";

export async function setOsnRedirect(
	code: string,
	mode: "PRE_OSN" | "OSN" | "POST_OSN",
): Promise<{ success: boolean; message: string; mode?: "PRE_OSN" | "OSN" | "POST_OSN" }> {
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

	await env.FEATURE_FLAGS.put(OSN_REDIRECT_KEY, mode);
	return { success: true, message: `Redirect set to ${mode} mode`, mode };
}
