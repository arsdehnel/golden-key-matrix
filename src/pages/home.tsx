import StandardLayout from "@/layouts/standard";

export default async function Pages__Home(): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="home">
			<p>
				Building great products isn't really a mystery. Most teams know what good looks like: they've read the books, run
				the retrospectives, talked about collaboration in the all-hands. And yet the gap between design and development
				keeps showing up in the same familiar ways: misaligned priorities, late-stage surprises, work that gets built and
				then rebuilt.
			</p>
			<p>
				The Golden Key Matrix is our attempt to name what keeps getting missed. The best technical architecture in the
				world can't compensate for a broken design-development relationship and the best UX vision can't survive poor
				implementation decisions. Alignment between those two disciplines isn't a soft skill problem. It's a structural
				one.
			</p>
			<p>
				We've organized that idea into three keys:{" "}
				<strong>
					<a href="/keys/open-mindset">Open Mindset</a>
				</strong>
				,
				<strong>
					<a href="/keys/integrated-workflow">Integrated Workflow</a>
				</strong>
				, and{" "}
				<strong>
					<a href="/keys/rich-ecosystem">Rich Ecosystem</a>
				</strong>
				. Each one is connected to outcomes that matter to both the people building the product and the people paying for
				it. The <a href="/matrix">Matrix</a> ties it together as a lightweight self-assessment: a place to gauge where
				things stand and what to work on next.
			</p>
			<p>
				These ideas grew out of a talk Adam and Dorothy gave at Open Source North 2026. What you'll find here is the
				living version of that, the thinking outside the slides. We'd love to hear how it resonates (or doesn't) with what
				you've seen in your own work.
			</p>
		</StandardLayout>
	);
}
