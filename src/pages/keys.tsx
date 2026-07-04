import StandardLayout from "@/layouts/standard";

export default async function Pages__keys(): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="keys">
			<p>keys</p>
			<ul>
				<li>
					<a href="/keys/open-mindset">Open Mindset</a>
				</li>
				<li>
					<a href="/keys/integrated-workflow">Integrated Workflow</a>
				</li>
				<li>
					<a href="/keys/rich-ecosystem">Rich Ecosystem</a>
				</li>
			</ul>
		</StandardLayout>
	);
}
