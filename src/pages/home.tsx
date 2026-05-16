import type { RequestInfo } from "rwsdk/worker";
import StandardLayout from "@/layouts/standard";

export default async function Pages__Home({ ctx }: RequestInfo): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="home" redirectMode={ctx.redirectMode}>
			<p>
				The Golden Key Matrix started as a brainstorming idea for a talk about UX/Design and Architecture working together
				to build amazing products. The public introduction of the concepts is happening at Open Source North 2026 in St
				Paul, Minnesota under the title <u>The Golden Key to Building Badass Products</u>.
			</p>
		</StandardLayout>
	);
}
