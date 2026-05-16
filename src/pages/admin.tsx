import type { RequestInfo } from "rwsdk/worker";
import Admin from "@/components/views/admin";
import StandardLayout from "@/layouts/standard";

export default async function Pages__Admin({ ctx }: RequestInfo): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="osn" redirectMode={ctx.redirectMode}>
			<Admin initialRedirectMode={ctx.redirectMode} />
		</StandardLayout>
	);
}
