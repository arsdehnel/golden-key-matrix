import type { RequestInfo } from "rwsdk/worker";
import StandardLayout from "@/layouts/standard";

export default async function Pages__OSN__Index({ ctx }: RequestInfo): Promise<React.JSX.Element> {
	return (
		<StandardLayout pageTitle="Golden Keys Matrix @ OSN 2026" siteSection="osn" redirectMode={ctx.redirectMode}>
			<ul>
				<li>
					<a href="/osn/welcome">Welcome Slide / Poll</a>
				</li>
				<li>
					<a href="/osn/thank-you">Thank You Slide / Leavebehinds</a>
				</li>
			</ul>
		</StandardLayout>
	);
}
