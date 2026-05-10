import { env } from "cloudflare:workers";
import OsnAdmin from "@/components/views/osn-admin";
import StandardLayout from "@/layouts/standard";

const OSN_REDIRECT_KEY = "osn_redirect_active";

export default async function Pages__OSN__Admin() {
	let osnRedirectMode: string | null = (await env.FEATURE_FLAGS?.get(OSN_REDIRECT_KEY)) ?? null;
	if (osnRedirectMode !== "PRE_OSN" && osnRedirectMode !== "OSN" && osnRedirectMode !== "POST_OSN") {
		// If the value in KV is invalid, treat it as null (no redirect)
		console.warn(`Invalid OSN redirect mode in KV: ${osnRedirectMode}`);
		osnRedirectMode = null;
	}
	return (
		<StandardLayout siteSection="osn">
			<OsnAdmin initialRedirectMode={osnRedirectMode} />
		</StandardLayout>
	);
}
