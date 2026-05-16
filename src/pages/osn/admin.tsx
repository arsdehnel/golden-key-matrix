import type { RequestInfo } from "rwsdk/worker";
import OsnAdmin from "@/components/views/osn-admin";
import StandardLayout from "@/layouts/standard";

export default async function Pages__OSN__Admin({ ctx }: RequestInfo): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="osn" redirectMode={ctx.redirectMode}>
			<OsnAdmin initialRedirectMode={ctx.redirectMode} />
		</StandardLayout>
	);
}
