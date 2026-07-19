import StandardLayout from "@/layouts/standard";

export default async function Pages__keys(): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="keys">
			<h2>Keys</h2>
			<h3>
				🔑 Key 1: <a href="/keys/open-mindset">Open Mindset</a>
			</h3>
			<p>
				The only key entirely under your individual control. Come to every day, meeting, project, and conversation with an
				open mind and it will lay a great foundation for everything else.
			</p>
			<h3>
				🔑 Key 2: <a href="/keys/integrated-workflow">Integrated Workflow</a>
			</h3>
			<p>
				Working with other teams can be messy but it is critical to building good products. Creating a seamless and
				efficient workflow that works for all teams is critical.
			</p>
			<h3>
				🔑 Key 3: <a href="/keys/rich-ecosystem">Rich Ecosystem</a>
			</h3>
			<p>
				Building a community and making something teams can be proud of can get lost in the prioritization and urgency of
				"business as usual." Building a rich ecosystem for the product, teams, stakeholders, and individual contributors
				can take things from good iterations to great long-term vision.
			</p>
		</StandardLayout>
	);
}
