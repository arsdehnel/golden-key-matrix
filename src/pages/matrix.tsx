import GkmQuadrant from "@/components/gkm-quadrant";
import StandardLayout from "@/layouts/standard";

export default async function Pages__Matrix(): Promise<React.JSX.Element> {
	return (
		<StandardLayout siteSection="matrix" pageTitle="Matrix Review">
			<p>
				Each quadrant below is a self-assessment, sort of a snapshot of where your Design and Development practices
				currently sit for that key. Right now this page is static: print it, pull it up in a retro, or work through it as
				a team. The longer-term goal is to make it interactive with saved state and progress tracking. That part isn't
				built yet.
			</p>
			<div className="matrix-key">
				<h3>Key 1: Open Mindset</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Creates trust in others, but also in yourself</p>
						<ul>
							<li>Receptive to new ideas, experiences, and perspectives</li>
							<li>Fuels adaptability & flexibility</li>
							<li>Embraces challenges as opportunities</li>
							<li>Respect for others</li>
							<li>Curious & asks questions</li>
							<li>Receives questions as ideas not criticism</li>
						</ul>
						<p>Sets yourself up to learn</p>
					</div>
					<div className="matrix-key-quadrant">
						<GkmQuadrant
							yAxisTitle="Development"
							xAxisTitle="Design"
							yAxisInfinityLabel="Expert"
							xAxisInfinityLabel="Expert"
							sharedAxisZeroLabel="Basic"
						/>
					</div>
				</div>
			</div>
			<div className="matrix-key">
				<h3>Key 2: Integrated Workflows</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Ideas to get on the same wavelength!</p>
						<ul>
							<li>Prototype run throughs</li>
							<li>UX Intention Discussions</li>
							<li>Dev Build Explanations</li>
							<li>Cross-team paired programming</li>
						</ul>
						<p>Iteration, back-and-forth, and near-constant collaboration</p>
					</div>
					<div className="matrix-key-quadrant">
						<GkmQuadrant
							yAxisTitle="Development"
							xAxisTitle="Design"
							yAxisInfinityLabel="Expert"
							xAxisInfinityLabel="Expert"
							sharedAxisZeroLabel="Basic"
						/>
					</div>
				</div>
			</div>
			<div className="matrix-key">
				<h3>Key 3: Rich Ecosystem</h3>
				<div className="matrix-key-contents-container">
					<div className="matrix-key-contents">
						<p>Starting can be the hardest part</p>
						<ul>
							<li>Prioritize what's needed first</li>
							<li>Find the medium(s) that makes the most sense for your teams</li>
							<li>Consider timing/cadence</li>
							<li>Try, try again…</li>
							<li>Be accountable</li>
							<li>Set up Ownership</li>
						</ul>
						<p>Continue the effort…</p>
					</div>
					<div className="matrix-key-quadrant">
						<GkmQuadrant
							yAxisTitle="Development"
							xAxisTitle="Design"
							yAxisInfinityLabel="Expert"
							xAxisInfinityLabel="Expert"
							sharedAxisZeroLabel="Basic"
						/>
					</div>
				</div>
			</div>
			<p>
				Return to this regularly (per sprint, quarterly, whatever fits your team's rhythm). The cadence matters less than
				the consistency. And <strong>be honest</strong>: inflated ratings don't help anyone, and the whole point is to
				surface where real growth can happen.
			</p>
		</StandardLayout>
	);
}
