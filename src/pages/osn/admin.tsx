import { env } from "cloudflare:workers";
import OsnAdmin from "@/components/views/osn-admin";
import StandardLayout from "@/layouts/standard";

const OSN_REDIRECT_KEY = "osn_redirect_active";

export default async function Pages__OSN__Admin() {
	const flagValue = (await env.FEATURE_FLAGS?.get(OSN_REDIRECT_KEY)) ?? null;
	return (
		<StandardLayout siteSection="osn">
			<OsnAdmin initialActive={flagValue === "true"} />
		</StandardLayout>
	);
}
